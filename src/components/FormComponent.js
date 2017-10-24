import React, { Component } from 'react';
import moment from 'moment';

import './FormComponent.css';

class Form extends Component {

  constructor(props) {
    super(props);
    this.emptyFormData = {
      email: '',
      name: '',
      subscriptionType: 'Новости',
    }
    this.validators = {
      email: {
        msg: 'Необходимо ввести валидный E-Mail',
        validate: (v) => /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v)
      },
      name: {
        msg: 'Поле имя может содержать только английские буквы, максимум 60 символов.',
        validate: (v) => v.length<=60 && /^[a-zA-Z]+$/.test(v)
      }
    }
    this.state = {
      form: {...this.emptyFormData},
      // Store in this.state.formErrors an object, containing keys from this.validators
      formErrors: Object.keys(this.validators).reduce((a,key) => { a[key] = false; return a; }, {}),
    }
  }


  clearForm = () => {
    this.setState({form: {...this.emptyFormData}});
  }

  submitHandler = (evt) => {
    evt.preventDefault();

    // Validate fields described in this.validators and store results to this.state.formErrors
    const formErrors = Object.keys(this.validators).reduce((a,key) => {
      a[key] = !this.validators[key].validate(this.state.form[key]);
      a.cnt += a[key];
      return a;
    }, {cnt: 0});
    this.setState( prevState => ({ formErrors }));

    // No validation errors
    if (formErrors.cnt<1) {

      // Check for duplicates
      if (this.props.items.filter( e => e.email===this.state.form.email ).length > 0) {
        this.props.setDuplicate();
      } else {
        // remove isDuplicate if was previously set
        if (this.props.isDuplicate) this.props.unsetDuplicate();

        // save form fields to redux store
        this.props.addSubscription({
          email: this.state.form.email,
          name: this.state.form.name,
          dateTime: moment().format(`DD.MM.YYYY HH:mm:ss`),
          subscriptionType: this.state.form.subscriptionType,
        });

        this.clearForm();
      }
    }
  }

  clearHandler = (evt) => {
    evt.preventDefault();
    this.clearForm();
  }

  changeHandler = (fld) => (evt) => {
    const value = evt.target.value;
    // handle value change for any attached field
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [fld]: value,
      }
    }));
  }


  render() {
    return (
      <div className="form">
        {
          this.props.isDuplicate
          ? <div className="form-row">
              <span className="error">Такой пользователь уже существует</span>
            </div>
          : null
        }
        <div className="form-row">
          <label>E-Mail:</label>
          <input type="email" value={this.state.form.email} onChange={this.changeHandler(`email`)}/>
          {this.state.formErrors.email?<span className="error">{this.validators.email.msg}</span>:null}
        </div>

        <div className="form-row">
          <label>Имя:</label>
          <input type="text" value={this.state.form.name} onChange={this.changeHandler(`name`)}/>
          {this.state.formErrors.name?<span className="error">{this.validators.name.msg}</span>:null}
        </div>

        <div className="form-row" >
          <label>Тип подписки:</label>
          <select value={this.state.form.subscriptionType} onChange={this.changeHandler(`subscriptionType`)}>
            <option>Новости</option>
            <option>Записи</option>
            <option>Видео</option>
          </select>
        </div>

        <div className="form-row buttons">
          <button className="add" onClick={this.submitHandler}>Добавить</button>
          <button className="clear" onClick={this.clearHandler}>Сбросить</button>
        </div>

      </div>
    );
  }
}

export default Form;
