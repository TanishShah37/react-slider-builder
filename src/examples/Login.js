'use strict';

import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.getStore().username,
      password: props.getStore().password
    };

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  isValidated() {
    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().username != userInput.username || this.props.getStore().password != userInput.password) { // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }

        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    return isDataValid;
  }

  validationCheck() {
    this.isValidated();
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
    return  {
      usernameVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.username) || data.username === 'shaadi', 
      passwordVal: (data.password != '' && data.password.length > 5) || data.password === '123',
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      usernameValMsg: val.usernameVal ? '' : 'A valid username is required',
      passwordValMsg: val.passwordVal ? '' : 'A valid password is required',
    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
  }

  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    if (typeof this.state.usernameVal == 'undefined' || this.state.usernameVal) {
        notValidClasses.usernameCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.usernameCls = 'has-error col-md-8';
       notValidClasses.usernameValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.passwordVal == 'undefined' || this.state.passwordVal) {
        notValidClasses.passwordCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.passwordCls = 'has-error col-md-8';
       notValidClasses.passwordValGrpCls = 'val-err-tooltip';
    }


    return (
      <div className="step step3">
        <div>
            <div className="row">
                <div className="six">
                    <label className="u-left-width">Username</label>
                    <input className="u-full-border-width" placeholder="shaadi"
                        type="username"
                        ref="username"
                        autoComplete="off"
                        required
                        defaultValue={this.state.username}
                        onBlur={this.validationCheck}
                        autoFocus/>
                    <div className={notValidClasses.usernameValGrpCls}>{this.state.usernameValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <label className="u-left-width">Password</label>
                    <input className="u-full-border-width" placeholder="123"
                        type="text"
                        ref="password"
                        autoComplete="off"
                        required 
                        onBlur={this.validationCheck} 
                        defaultValue={this.state.password}/>
                    <div className={notValidClasses.passwordValGrpCls}>{this.state.passwordValMsg}</div>                        
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <hr className="footerline"></hr>
                </div>
            </div>            
        </div>
      </div>      
    )
  }
}
