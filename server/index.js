import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send('Api is running...');
});

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
});