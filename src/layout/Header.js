import React, { Component } from 'react'
import '../styles/layout/Header.scss'
// import LoginView from '../components/LoginView'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LocaleSelectView from '../components/LocaleSelectView'
import logo from '../assets/images/logo.png'
class Header extends Component {
  render() {
    return (
      <nav className="navbar header-navbar pcoded-header">
        {/**DELETE IF NOT NEED IN FUTURE */}
        {/* <div style={{textAlign: 'center'}}>
          <span style={{color: 'white'}}>
            IMPORTANT: This blockchain explorer is for exploring Arisen`s test network. Arisen`s main network officially launches April 16th, 2020. Follow the countdown to click <a href="https://arisen.network" target='blank' style={{color: 'hotpink'}}>here</a>
          </span>
        </div> */}
        <div className="navbar-wrapper">
          <div className="navbar-logo">
            {/* <a className="mobile-menu" id="mobile-collapse" href="#!">
              <i className="ti-menu" />
            </a> */}
            <header>
              <Link to="/">
                <h5>
                  <img className="logo-arisen" alt='log-arisen' src= {logo}/>
                  <FormattedMessage id="LIVE" />
                </h5>
              </Link>
            </header>
          </div>
          <div className="navbar-container container-fluid">
            <ul className="nav-left">
              <li>
                <div className="sidebar_toggle">
                  <a href=" ">
                    <i className="ti-menu" />
                  </a>
                </div>
              </li>
            </ul>
            <ul className="nav-right">
              <li className="user-profile header-notification">
                <LocaleSelectView />
              </li>
              {/* <li className="user-profile header-notification">
                <LoginView />
              </li> */}

              <li>
                <a
                  href="https://github.com/arisenio/arisen-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
