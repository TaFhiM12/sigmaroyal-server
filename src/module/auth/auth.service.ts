import jwt from "jsonwebtoken";

interface LoginPayload {
  email: string;
  password: string;
}

const getAdminCredentials = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are not configured on server");
  }

  return {
    email,
    password,
  };
};

const getJwtSecret = () => process.env.JWT_SECRET || "sigma-royal-jwt-secret";
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || "12h";

const login = async ({ email, password }: LoginPayload) => {
  const admin = getAdminCredentials();

  if (email !== admin.email || password !== admin.password) {
    throw new Error("Invalid admin credentials");
  }

  const expiresIn = getJwtExpiresIn() as NonNullable<jwt.SignOptions["expiresIn"]>;

  const token = jwt.sign(
    { role: "admin", email: admin.email },
    getJwtSecret(),
    { expiresIn }
  );

  return {
    token,
    user: {
      email: admin.email,
      role: "admin",
      name: "Admin User",
    },
  };
};

const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as { email: string; role: string };
};

export const authService = {
  login,
  verifyToken,
};
