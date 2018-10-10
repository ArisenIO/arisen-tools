import * as Values from './constants/Values'
import Rsn from 'arisenjsv1'

const singleton = Symbol()
const singletonRsnAgent = Symbol()

class RsnAgent {
  constructor(rsnAgent) {
    if (rsnAgent !== singletonRsnAgent) {
      throw new Error('Cannot construct singleton')
    }

    this.arkid = null
    this._initialized = false
    this.identity = null
    this.loginAccount = null

    let endPoint = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

    this.rsn = Rsn({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId
    })
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new RsnAgent(singletonRsnAgent)
    }

    return this[singleton]
  }

  get loginaccount() {
    return this.loginAccount
  }

  initArkId = arkid => {
    this.arkid = arkid
    this._initialized = true
  }

  initRsnAgent = id => {
    if (id) {
      this.arkid.useIdentity(id)
      console.log('Possible identity', this.arkid.identity)
      const loginAccount = this.arkid.identity.accounts.find(
        acc => acc.blockchain === Values.NETWORK.blockchain
      )

      this.loginAccount = loginAccount
      this.identity = id

      this.rsn = this.arkid.rsn(Values.NETWORK, Rsn, Values.CONFIG)

      return this.loginAccount
    }
  }

  createTransaction = async cb => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.transaction(cb)
  }

  createTransactionWithContract = async (contract, cb) => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.transaction(contract, cb)
  }

  getInfo = () => {
    if (!this.rsn) {
      return
    }

    return this.rsn.getInfo({})
  }

  getContract = async contractName => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.contract(contractName)
  }

  getProducers = async query => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.getProducers(query)
  }

  getTableRows = async query => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.getTableRows(query)
  }

  voteProducer = async (account, producers = [], proxy = '') => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.voteproducer(account, proxy, producers)
  }

  getCurrencyStats = async query => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.getCurrencyStats(query)
  }

  getCurrencyBalance = async query => {
    if (!this.rsn) {
      return
    }

    let balance = await this.rsn.getCurrencyBalance(query)

    return balance
  }

  getAccountInfo = async () => {
    if (!this.rsn) {
      return
    }

    let account = await this.rsn.getAccount({
      account_name: this.loginAccount.name
    })

    return account
  }

  getAccount = async accountName => {
    if (!this.rsn) {
      return
    }

    let account = await this.rsn.getAccount({ account_name: accountName })

    return account
  }

  getTransaction = async transactionId => {
    if (!this.rsn) {
      return
    }

    let transaction = await this.rsn.getTransaction({ id: transactionId })

    return transaction
  }

  getKeyAccounts = async publicKey => {
    if (!this.rsn) {
      return
    }

    let accounts = await this.rsn.getKeyAccounts({ public_key: publicKey })

    return accounts
  }

  regproxy = async accountName => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.regproxy({
      proxy: accountName,
      isproxy: 1
    })
  }

  unregproxy = async accountName => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.regproxy({
      proxy: accountName,
      isproxy: 0
    })
  }

  refund = async owner => {
    if (!this.rsn) {
      return
    }

    return await this.rsn.refund({
      owner
    })
  }

  getActions = async (account_name, pos, offset) => {
    if (!this.rsn) {
      return
    }

    let actions = await this.rsn.getActions({
      account_name,
      pos,
      offset
    })

    return actions
  }

  getBlock = async blockNum => {
    if (!this.rsn) {
      return
    }

    let block = await this.rsn.getBlock(blockNum)

    return block
  }

  loginWithPrivateKey = privKey => {
    let endPoint = Values.NETWORK.protocol + '://' + Values.NETWORK.host + ':' + Values.NETWORK.port

    this.rsn = Rsn({
      httpEndpoint: endPoint,
      chainId: Values.NETWORK.chainId,
      keyProvider: privKey
    })

    this._initialized = true

    // todo - get account info
    return { name: 'test', authority: 'active' }
  }

  loginWithArkId = async () => {
    if (!this.arkid) {
      return
    }

    let id = await this.arkid.getIdentity(Values.requiredFields)

    return this.initRsnAgent(id)
  }

  logout = async () => {
    if (!this.arkid) {
      return
    }

    let res = await this.arkid.forgetIdentity()

    this._initialized = false
    this.identity = null
    this.loginAccount = null
    this.rsn = null

    console.log('logout : ' + res)
  }
}

export default RsnAgent.instance
