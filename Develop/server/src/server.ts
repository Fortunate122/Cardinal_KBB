const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import sequelize from './config/connection'; // ✅ updated import

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.static('../client/dist'));
app.use(routes);

// ✅ Async wrapper to await DB auth before syncing
(async () => {
  try {
    await sequelize.authenticate(); // ✅ added
    await sequelize.sync({ force: forceDatabaseRefresh });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
