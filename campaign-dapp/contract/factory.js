import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import { address } from './config';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
)