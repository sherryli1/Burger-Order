import React,{ Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignIn: true

  }
  checkValidity(value, rule){
    let isValid = true;
    if(!rule){
      return true;
    }
    if(rule.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rule.minLength){
      isValid = value.length >= rule.minLength && isValid;
    }
    if(rule.maxLength){
      isValid = value.length <= rule.maxLength && isValid;
    }
    if (rule.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rule.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
      }

    return isValid;
  }

  switchSignUpHandler = () => {
    this.setState(prevState => {
      return {isSignIn : !prevState.isSignIn}
    })
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControl = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControl});
  }
  submitHandler =  (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
  }
  componentDidMount (){
    if(!this.props.burgerBuilding && this.props.redirectPath !== '/'){
      this.props.onRouteHome();
    }
  }
  render () {
    const formElements = [];
    for(let key in this.state.controls){
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    };
    let form = formElements.map(element => (
      <Input
        key = {element.id}
        elementType = {element.config.elementType}
        elementConfig = {element.config.elementConfig}
        value = {element.config.value}
        invalid ={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangeHandler(event,element.id)}/>

    ));
    if(this.props.loading){
      form = <Spinner />
    }
    let errorMessage = null;
    if(this.props.error){
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }
    let authRedirect = null;
    if(this.props.isAuthiticated){
      authRedirect = <Redirect to={this.props.redirectPath}/>
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={ this.submitHandler}>
          {form}
          <Button btnType='Success'>{this.state.isSignIn ? 'Sign In' : 'Sign Up'}</Button>
        </form>
        <Button
          clicked={this.switchSignUpHandler}
          btnType='Danger'>Switch To {this.state.isSignIn ? 'Sign Up' : 'Sign In'}</Button>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return{
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthiticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
    redirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (email, password,isSignIn) => dispatch(actions.auth(email, password, isSignIn)),
    onRouteHome: () => dispatch(actions.setAuthRedirect('/'))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
