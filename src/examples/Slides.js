'use strict';

import React, { Component, PropTypes } from 'react';

export default class Slides extends Component {

constructor(props) {
    super(props);

    this.state = {
      slideNumber: props.getStore().slideNumber,
      // skipValidationExecution : true
    };

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }
 
  componentDidMount() {}

  componentWillUnmount() {};
  
  isValidated() {
    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().slideNumber != userInput.slideNumber) {
          this.props.updateStore({
            ...userInput,
            savedToCloud: false 
          });  
        }

        isDataValid = true;
    }
    else {
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
    slideNumberVal: (data.slideNumber != '' && data.slideNumber <= 20)
    }
  }



  _validationErrors(val) {
    const errMsgs = {
      slideNumberVal: val.slideNumberVal ? '' :' Please select number of slides to displayed'
    }
    return errMsgs;
  }
  _grabUserInput() {
    return {
      slideNumber: this.refs.slideNumber.value,
    };
  }
  
  render() {

    let notValidClasses = {};

    if (typeof this.state.slideNumberVal == 'undefined' || this.state.slideNumberVal) {
        notValidClasses.slideNumberCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.slideNumberCls = 'has-error col-md-8';
       notValidClasses.slideNumberValGrpCls = 'val-err-tooltip';
    }
    var select = '';
    for (var i=1; i<=20;i++) {
      select += '<option val=' + i + '>' + i + '</option>';
      }
    $('.selectpicker').html(select);
  
    return (
        <div className="step step4">
            <div className="row">
                <div className="six">
                    <label className="u-center-width">Select Slides</label>
                    <select className="u-full-width selectpicker"
                            type="number"
                            ref="slideNumber"
                            required
                            defaultValue={"Select Number of Slides"}
                            // onBlur={this.validationCheck}
                            >
                    </select>
                    <div className={notValidClasses.slideNumberGrpCls}>{this.state.slideNumberValMsg}</div>
                </div>
            </div>
            <div className="row">
                <div className="six">
                    <hr></hr>
                </div>
            </div>
        </div>
    )
  }
}

