'use strict';

import React, { Component, PropTypes } from 'react';
import StepZilla from '../main'
import Login from './Login'
import Slides from './Slides'
import Final from './Final'

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      username: '',      
      password: '',
      slideNumber:'',
      savedToCloud: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {
    const steps =
    [
      {name: 'Login',     component: <Login getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Select Slides',     component: <Slides getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Thank you!', component: <Final getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
    ]

    return (
      <div className='example'>
        <div className="mainlogo"></div>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            // preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            // hocValidationAppliedTo={[]}
             />
        </div>
      </div>
    )
  }
}
