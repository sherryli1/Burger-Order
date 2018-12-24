import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {
  let styleCob = [classes.SideDrawer, classes.Close];
  if(props.open){
    styleCob = [classes.SideDrawer, classes.Open];
  }
  return(
    <Aux>
      <Backdrop show={props.open} closed={props.clicked}/>
      <div className={styleCob.join(' ')}>
        <div className={classes.Logo }>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );

};

export default sideDrawer;
