import React, { Component, Fragment } from 'react'
import RsnConstitutionView from '../components/constitution/RsnConstitutionView'

class Constitution extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="page-body">
            <div className="row">
              <RsnConstitutionView />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Constitution
