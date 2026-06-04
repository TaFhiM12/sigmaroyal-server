import express, { Application, Request, Response} from 'express';
import { projectRoutes } from './module/project/project.route';
import cors from 'cors';
import { employeeRoutes } from './module/employee/employee.route';
import { certificationRouter } from './module/certification/certification.router';
import { clientRouter } from './module/client/client.router';
import { authRoutes } from './module/auth/auth.route';
import { hytorcRoutes } from './module/hytorc/hytorc.route';
import { qhsePolicyRoutes } from './module/qhse-policy/qhse-policy.route';

const app: Application = express();
app.use(cors(
    {
        origin: ['https://sigmaroyal-client.vercel.app', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/certifications', certificationRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hytorc', hytorcRoutes);
app.use('/api/v1/qhse-policy', qhsePolicyRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Sigma Royal API is running');
});

export default app;