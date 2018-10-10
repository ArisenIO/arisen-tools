import { decorate, observable, action } from 'mobx'
import ApiAgent from '../ApiAgent'
import Swal from 'sweetalert2'

export class CommonStore {
  isLoading = true
  _initilizedArkId = false
  _initilizedRsn = false
  coinMarketCap = null

  setLoading = isLoading => {
    this.isLoading = isLoading
  }

  initArkId = isInit => {
    this._initilizedArkId = isInit
  }

  initRsn = isInit => {
    this._initilizedRsn = isInit
  }

  getCoinMarketCap = async () => {
    try {
      let result = await ApiAgent.getCoinMarketCap()

      if (result) {
        this.coinMarketCap = result.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  arkidNeededAlert = () => {
    Swal({
      type: 'error',
      title: 'Oops...',
      text: 'You need to login with ArkId wallet!',
      footer: '<a href="https://arkid.io/">Do you need ArkId?</a>'
    })
  }
}

decorate(CommonStore, {
  isLoading: observable,
  _initilizedArkId: observable,
  _initilizedRsn: observable,
  coinMarketCap: observable,
  ramMarketCap: observable,
  setLoading: action,
  initArkId: action,
  initRsn: action,
  getCoinMarketCap: action,
  arkidNeededAlert: action
})

export default new CommonStore()
