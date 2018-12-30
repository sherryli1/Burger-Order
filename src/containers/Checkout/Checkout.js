import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
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
    return (
      <div>
          <CheckoutSummary
          ingredient={this.props.ings}
          checkoutCanceled={this.checkoutCanceled}
          checkoutContinued={this.checkoutContinued}/>
          <Route path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredient
  }
}

export default connect(mapStateToProps)(Checkout);
