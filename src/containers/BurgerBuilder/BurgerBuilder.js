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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    constructor (props) {
      super(props);
      this.state = {
        purchasing: false,
        loading: false,
        error: null
      };
    }

    componentDidMount () {
      // axios.get('https://react-burger-e8241.firebaseio.com/ingredient.json')
      //   .then(response => {
      //     this.setState({ingredient: response.data});
      //   })
      //   .catch(error => {
      //     this.setState({error: error});
      //   })
    }

    updatePurchaseState (ingredient) {
      const sum = Object.keys(ingredient)
        .map(igKey => {
          return ingredient[igKey];
        })
        .reduce((sum,el) => {
          return sum + el;
        },0);
        console.log(sum)
        return sum > 0;
    }

    //Because the use of 'this' here so we have to use arrow function
    orderHandler = () => {
      this.setState({purchasing: true});
    }

    orderCancelHandler = () => {
      this.setState({purchasing: false});
    }
    orderContinueHandler = () => {
      // alert('You Continue!');
      const queryParams = [];
      for(let i in this.props.ings){
        queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]));
      }
      queryParams.push('totalPrice=' + this.props.price);
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
      });

    }

    render () {
      const disabledInfo = {
        ...this.props.ings
      };
      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
      }
      let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />;
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

      if(this.state.loading){
        orderSummary = <Spinner />
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
    ings: state.ingredient,
    price: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:igName}),
    onIngredientRemoved: (igName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:igName})
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
