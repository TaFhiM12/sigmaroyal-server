import express, { Application, Request, Response} from 'express';
import { projectRoutes } from './module/project/project.route.js';
import cors from 'cors';
import { employeeRoutes } from './module/employee/employee.route.js';
import { certificationRouter } from './module/certification/certification.router.js';
import { clientRouter } from './module/client/client.router.js';
import { authRoutes } from './module/auth/auth.route.js';
import { hytorcRoutes } from './module/hytorc/hytorc.route.js';
import { qhsePolicyRoutes } from './module/qhse-policy/qhse-policy.route.js';
import { contactRoutes } from './module/contact/contact.route.js';
import { pageContentRoutes } from './module/page-content/page-content.route.js';
import { statisticsRoutes } from './module/statistics/statistics.route.js';

const app: Application = express();

const configuredOrigins = process.env.CORS_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = configuredOrigins?.length
  ? configuredOrigins
  : ['https://sigmaroyal-client.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/certifications', certificationRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hytorc', hytorcRoutes);
app.use('/api/v1/qhse-policy', qhsePolicyRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/page-content', pageContentRoutes);
app.use('/api/v1/stats', statisticsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Sigma Royal API is running',
  });
});

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Healthy',
    uptime: process.uptime(),
  });
});

export default app;
