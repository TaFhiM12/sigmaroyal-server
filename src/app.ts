import express, { Application, Request, Response} from 'express';
import { projectRoutes } from './module/project/project.route';
import cors from 'cors';

const app: Application = express();
app.use(cors(
    {
        origin: 'https://sigmaroyal-client.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/projects', projectRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Sigma Royal API is running');
});

export default app;