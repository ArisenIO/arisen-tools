import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ko from 'react-intl/locale-data/ko'
import locale from './locale/locale'
import { Provider } from 'mobx-react'
import accountStore from './stores/accountStore'
import commonStore from './stores/commonStore'
import arisenStore from './stores/arisenStore'
import explorerStore from './stores/explorerStore'
import initLocale, { getUserLocale } from 'react-intl-locale'
import RsnAgent from './RsnAgent'
import * as Utils from './utils/Utils'
import * as Values from './constants/Values'

// param : defulat locale, allow locale array
initLocale('en-US', Values.supportLanguage.slice())
addLocaleData([...en, ...ko])

const lang = Utils.getJsonFromUrl().lang

console.log(lang)

let i18nLang

if (lang) {
  i18nLang = lang.split('-')[0]
  localStorage.setItem('locale', lang)
} else {
  const savedLocale = localStorage.getItem('locale')

  if (savedLocale) {
    i18nLang = savedLocale.split('-')[0]
  } else {
    const userLocale = getUserLocale()
    i18nLang = userLocale.split('-')[0]
  }
}

const stores = {
  accountStore,
  commonStore,
  arisenStore,
  explorerStore
}

document.addEventListener('arkidLoaded', async arkidExtension => {
  console.log('arkidloaded')

  if (window.arkid) {
    RsnAgent.initArkId(window.arkid)
    commonStore.initArkId(true)

    if (window.arkid.identity) {
      RsnAgent.initRsnAgent(window.arkid.identity)
      commonStore.initRsn(true)
      await accountStore.loadAccountInfo()
    }
  }

  commonStore.setLoading(false)
})

setTimeout(() => {
  if (!commonStore._initilizedArkId) {
    commonStore.setLoading(false)
    commonStore.initRsn(true)
  }
}, 1000)

ReactDOM.render(
  <Provider {...stores}>
    <IntlProvider key={i18nLang} locale={i18nLang} messages={locale[i18nLang]}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)
