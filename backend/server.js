import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.get('/api', (req, res) =>
  res.status(200).send('WELCOME TO LITLLE PAWS API')
);

if (process.env.NODE_ENV === 'production') {
  console.log('ping');
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Little Paws API');
  });
}

app.listen(PORT, console.log(`Server running on port 5000`));
