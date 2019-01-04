import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {(! props.isAuthiticated)
      ? <NavigationItem link='/auth' >Sign In</NavigationItem>
      : <NavigationItem link='/logout' >Sign Out</NavigationItem>
    }
    <NavigationItem link='/' exact>Burger Builder</NavigationItem>
    {(props.isAuthiticated) ? <NavigationItem link='/orders' >Orders</NavigationItem> : null}
  </ul>
);

export default navigationItems;
