import 'dotenv/config';
import validateEnv from './utils/validateEnv';
 
import App from './app';
import CampaignController from './components/campaign/campaign.controller';

validateEnv();

const app = new App(
  [
    new CampaignController(),
  ],
);
 
app.listen();