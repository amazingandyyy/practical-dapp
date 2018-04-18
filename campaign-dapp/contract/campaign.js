import web3 from './web3';
import campaign from './build/Campaign.json';

const instance = (address) => new web3.eth.Contract(
  JSON.parse(campaign.interface),
  address
)

export default instance;