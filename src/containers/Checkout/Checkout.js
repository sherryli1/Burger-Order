import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component{

  checkoutCanceled = () => {
    this.props.history.goBack();
  }
  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    // console.log(this.state.ingredient);
    let summary = <Redirect to='/' />
    if(this.props.ings){
      const redirectAfterPurchase = this.props.purchased ? <Redirect to='/' /> : null;
      summary = (
        <div>
            {redirectAfterPurchase}
            <CheckoutSummary
            ingredient={this.props.ings}
            checkoutCanceled={this.checkoutCanceled}
            checkoutContinued={this.checkoutContinued}/>
            <Route path={this.props.match.path + '/contact-data'}
              component={ContactData}/>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredient,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);
