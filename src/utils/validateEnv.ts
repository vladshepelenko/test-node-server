import {
  cleanEnv, port, str,
} from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_CONNECT: str(),
    PORT: port(),
    BASE_URL: str(),
  });
}

export default validateEnv;
