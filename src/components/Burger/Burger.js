import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  //convert the object into an array of burgeringredient !! Super important
  let transformedIngredient = Object.keys(props.ingredient)
    .map(igKey => {
      return [...Array(props.ingredient[igKey])].map((_,i) =>{
        return <BurgerIngredient type={igKey} key={igKey + i}/>
      });
    })
    //to flatten the array
    .reduce((arr,el) => {
      return  arr.concat(el);
    },[]);
  if(transformedIngredient.length === 0){
    transformedIngredient = <p>Please add some ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
