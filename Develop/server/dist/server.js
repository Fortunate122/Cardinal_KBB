const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// ✅ Enable CORS for frontend at localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// ✅ Parse JSON bodies
app.use(express.json());
// ✅ Serve static files (for production builds)
app.use(express.static('../client/dist'));
// ✅ Register all routes
app.use(routes);
// ✅ Start server after DB sync
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
