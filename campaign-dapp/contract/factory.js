import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';
import config from './config';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  config.address
)

export default instance;