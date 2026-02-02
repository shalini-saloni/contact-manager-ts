import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.routes';
import ContactRoute from './routes/contact.routes';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new AuthRoute(),
    new ContactRoute(),
  ],
  Number(process.env.PORT) || 3000
);

app.listen();