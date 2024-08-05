import express from 'express';
import { config } from 'dotenv';
config();
import mongoose from 'mongoose';
import { contatoRouter } from './src/routes/contatoRota.js';
import { usuarioRouter } from './src/routes/usuarioRota.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});

app.use(contatoRouter);
app.use(usuarioRouter);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port http://localhost:3000');
});
