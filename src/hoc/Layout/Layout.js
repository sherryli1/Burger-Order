//A wrapper to wrap the core elements in the screen
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Aux from'../Aux/Aux';
import classes from'./Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
  state = {
    showSideDrawer : false
  }
  toggleSideDrawerHandler = () => {
    //correct way to change state based on current state
    this.setState( (prevState) => {
      return {showSideDrawer : !prevState.showSideDrawer};
    });
  }
  closeSideDrawerHandler = () => {
    this.setState({showSideDrawer: false});
  }
  render () {
    return(
      <Aux>
      <Toolbar
        isAuth={this.props.isAuthiticated}
        toggleDrawerClicked={this.toggleSideDrawerHandler}/>
      <SideDrawer
        isAuth={this.props.isAuthiticated}
        open={this.state.showSideDrawer}
        clicked={this.closeSideDrawerHandler}/>
      <main className = {classes.Content}>
        {this.props.children}
      </main>
      </Aux>
    );
  }
 }

const mapStateToProps = state => {
  return{
      isAuthiticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
