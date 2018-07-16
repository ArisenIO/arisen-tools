import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'

@inject('accountStore', 'commonStore')
@observer
class LoginView extends Component {
  constructor(props) {
    super(props)
    let { accountStore, commonStore } = this.props
    this.accountStore = accountStore
    this.commonStore = commonStore
  }

  loginClick = async () => {
    this.commonStore.setLoading(true)

    try {
      await this.accountStore.login()
    } catch (e) {
      // todo - error handle
      // 423 Locked
      console.log(e)
    } finally {
      this.commonStore.setLoading(false)
    }
  }

  logoutClick = () => {
    this.accountStore.logout()
  }

  render() {
    return (
      <Fragment>
        <a href="#!">
          {!this.accountStore.isLogin ? (
            <span>
              <FormattedMessage id="Login" />
            </span>
          ) : (
            <span>
              {this.accountStore.account.name}@{this.accountStore.account.authority}
            </span>
          )}
          <i className="ti-angle-down" />
        </a>

        <ul className="show-notification profile-notification">
          {!this.accountStore.isLogin ? (
            <li>
              <a href="#!" onClick={this.loginClick}>
                <i className="ti-settings" /> <FormattedMessage id="Login" />
              </a>
            </li>
          ) : (
            <div>
              <li>
                <a href="user-profile.html">
                  <i className="ti-user" /> Profile
                </a>
              </li>
              <li>
                <a href="email-inbox.html">
                  <i className="ti-email" /> My Messages
                </a>
              </li>
              <li>
                <a href="auth-lock-screen.html">
                  <i className="ti-lock" /> Lock Screen
                </a>
              </li>
              <li>
                <a href="#!" onClick={this.logoutClick}>
                  <i className="ti-layout-sidebar-left" /> <FormattedMessage id="Logout" />
                </a>
              </li>
            </div>
          )}
        </ul>
      </Fragment>
    )
  }
}

export default LoginView
