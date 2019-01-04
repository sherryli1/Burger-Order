import React,{ Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: false
      }
    },
    formIsValid: false,
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
  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredient);
    this.setState({loading: true});
    const formData = {};
    for(let element in this.state.orderForm){
      formData[element] = this.state.orderForm[element].value;
    }
    const order = {
      ingredient: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onPurchaseStart(order,this.props.token);
  }

  inputChangeHandler = (event,identifier) =>{
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedFormElement ={
      ...this.state.orderForm[identifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[identifier] = updatedFormElement;
    let formValid = true;
    for(let key in updatedForm){
      formValid = updatedForm[key].valid && formValid;
    }
    this.setState({orderForm: updatedForm, formIsValid: formValid});
  }

  render(){
    const formElements = [];
    for(let key in this.state.orderForm){
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    };
    let form = (
      <form onSubmit={(event) => this.orderHandler(event)}>
        {formElements.map(element => (
            <Input
            key = {element.id}
            elementType = {element.config.elementType}
            elementConfig = {element.config.elementConfig}
            value = {element.config.value}
            invalid ={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => this.inputChangeHandler(event,element.id)}/>
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if(this.props.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseStart: (orderData,token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
