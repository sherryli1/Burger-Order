//A wrapper to wrap the core elements in the screen
import React,{ Component } from 'react';
import Aux from'../../hoc/Aux';
import classes from'./Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
      <Toolbar toggleDrawerClicked={this.toggleSideDrawerHandler}/>
      <SideDrawer open={this.state.showSideDrawer} clicked={this.closeSideDrawerHandler}/>
      <main className = {classes.Content}>
        {this.props.children}
      </main>
      </Aux>
    );
  }
 }

export default Layout;
