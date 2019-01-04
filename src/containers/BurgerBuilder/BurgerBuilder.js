import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{
    constructor (props) {
      super(props);
      this.state = {
        purchasing: false
      };
    }

    componentDidMount () {

      this.props.onInitIngredients();
    }

    updatePurchaseState (ingredient) {
      const sum = Object.keys(ingredient)
        .map(igKey => {
          return ingredient[igKey];
        })
        .reduce((sum,el) => {
          return sum + el;
        },0);
        return sum > 0;
    }

    //Because the use of 'this' here so we have to use arrow function
    orderHandler = () => {
      if(this.props.isAuthiticated){
        this.setState({purchasing: true});
      }else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
      }

    }

    orderCancelHandler = () => {
      this.setState({purchasing: false});
    }
    orderContinueHandler = () => {
      // alert('You Continue!');
      this.props.onInitPurchase();
      this.props.history.push('/checkout');

    }

    render () {
      const disabledInfo = {
        ...this.props.ings
      };
      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
      }
      let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />;
      let orderSummary = null;
      if(this.props.ings){
        burger = (
          <Aux>
            <Burger ingredient= {this.props.ings}/>
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              ordered={this.orderHandler}
              isAuth={this.props.isAuthiticated}
              purchasable={this.updatePurchaseState(this.props.ings)}
              price={this.props.price}/>

          </Aux>
        );
        orderSummary = <OrderSummary
          price={this.props.price}
          ingredient= {this.props.ings}
          orderCancel={this.orderCancelHandler}
          orderContinue={this.orderContinueHandler} />;
      }

      return (
          <Aux>
            <Modal show={this.state.purchasing} modalclosed={this.orderCancelHandler}>
              {orderSummary}
            </Modal>
              {burger}
          </Aux>
      );
    }

}
const mapStateToProps =  state => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthiticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
