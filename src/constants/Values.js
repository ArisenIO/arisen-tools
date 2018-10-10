export const ACCOUNT_NAME_PATTERN = /([a-z1-5]){12,}/
export const SEED_RAM_BYTES = 8192
export const SEED_RAM_RSN = 1
export const SEED_CPU = 0.1
export const SEED_NET = 0.1

export const actionPerPage = 1000

const protocol = 'https'
const host = 'greatchain.arisennodes.io'
const port = 443
const chainId = 'fffa80dc4492fedaa90cbc4ee6f5520568826dfb31ed9c8c161224349f6b82f5'

// export const protocol = 'http';
// export const host = '127.0.0.1';
// export const port = 8888;
// export const chainId = "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f";

export const requiredFields = {
  accounts: [
    {
      blockchain: 'rsn',
      host: host,
      port: port,
      chainId: chainId
    }
  ]
}

export const NETWORK = {
  blockchain: 'rsn',
  protocol: protocol,
  host: host,
  port: port,
  chainId: chainId
}

export const CONFIG = {
  broadcast: true,
  sign: true,
  chainId: chainId
}

export const supportLanguage = ['ko-KR', 'en-US']

export function removeDuplicates(arr, prop) {
  var obj = {}
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i]
  }
  var newArr = []
  for (var key in obj) newArr.push(obj[key])
  return newArr
}
