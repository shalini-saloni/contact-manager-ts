import 'dotenv/config';
import App from './app';
import ContactController from './controllers/contact.controller';
import AuthController from './controllers/auth.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new AuthController(),
    new ContactController(),
  ],
  Number(process.env.PORT) || 3000
);

app.listen();