let appPromise: Promise<typeof import("../src/app")["default"]> | null = null;

const getApp = async () => {
  appPromise ??= import("../src/app").then((module) => module.default);
  return appPromise;
};

export default async function handler(req: any, res: any) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("Serverless app initialization failed:", error);

    const message = error instanceof Error
      ? error.message
      : "Unknown server initialization error";

    return res.status(500).json({
      success: false,
      message: `Server failed to initialize: ${message}`,
    });
  }
}
