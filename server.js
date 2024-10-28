import express from 'express';
import cors from 'cors';
import { sequelize } from './config/dbConn.js';
import userRoute from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoute);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });