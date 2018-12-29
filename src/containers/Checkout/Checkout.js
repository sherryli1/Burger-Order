import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
  state={
    ingredient: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    },
    totalPrice: 0
  }
  componentWillMount() {
      console.log(this.props);
      //Get ingredient via query params
      const query = new URLSearchParams(this.props.location.search);
      // console.log(query);
      const ingredient = {};
      for(let param of query.entries()){
        //['salad', '1']
        if(param[0] === 'totalPrice'){
          this.setState({totalPrice: +param[1]});
        }else{
          ingredient[param[0]] = +param[1];
        }

      this.setState({ingredient: ingredient});
    }
  }

  checkoutCanceled = () => {
    this.props.history.goBack();
  }
  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    // console.log(this.state.ingredient);
    return (
      <div>
        <CheckoutSummary
          ingredient={this.state.ingredient}
          checkoutCanceled={this.checkoutCanceled}
          checkoutContinued={this.checkoutContinued}/>
          <Route path={this.props.match.path + '/contact-data'}
            render={(props) => (<ContactData ingredient={this.state.ingredient} totalPrice={this.state.totalPrice} {...props}/>)}/>
      </div>
    );
  }
}

export default Checkout;
