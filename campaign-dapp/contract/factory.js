import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x3619dfb246eDD4af4aec15DD1150A7fa05F13361'
)

export default instance;