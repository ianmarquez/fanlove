import cors from 'cors';
import express from 'express';
import UserRoute from './routes/UserRoute';
import DBConnection from './helper/DBConnection';
import bodyParser from 'body-parser';

const app = express();

const dbConn: DBConnection = DBConnection.getInstance();

app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.use('/user', UserRoute);