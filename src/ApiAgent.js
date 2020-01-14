import axios from 'axios'

class ApiAgent {
  getCoinMarketCap = async () => {
    let market = await axios.get('https://api.coinmarketcap.com/v2/ticker/1765/')
    return market
  }

  getMarketCapPrice = async () => {
    let price = await axios.get('https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/get_arisen_price')
    if(price) {
      return price;
    } else {
      return 0
    }
  }

  getRamMarketCap = async (ts, limit) => {
    return await axios.get(
      `https://eos.feexplorer.io/json/EOSramPrice.php?toTs=${ts}&limit=${limit}&res=1/`,
      {
        mode: 'no-cors'
      }
    )
  }
}

export default new ApiAgent()
