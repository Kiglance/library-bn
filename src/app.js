import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import db from './database/models';
import routes from './routes/index';

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', routes);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Library app API.' });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  db.sequelize.authenticate();
  console.log(`Server up and running on http://localhost:${port}`);
});

export default server;
