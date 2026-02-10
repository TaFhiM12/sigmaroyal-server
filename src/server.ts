import app from "./app";
import dotenv from 'dotenv';

dotenv.config();


const StartServer = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Failed to start server:', error);
    }
}

StartServer();