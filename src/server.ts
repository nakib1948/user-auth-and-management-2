import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
const port = 5000;

async function server() {
  try {
    await mongoose.connect(config.database_url_local as string);
    app.listen(port, () => {
      console.log(config.port);
    });
  } catch (error) {
    console.log(error);
  }
}

server().catch((err) => console.log(err));
