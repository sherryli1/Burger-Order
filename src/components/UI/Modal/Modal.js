import React,{ Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
  // PureComponent will run more checks than we want, so not using it here
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show;
  }
  //Use this to check whether updated is neede so that we can improve our performance
  componentWillUpdate(){
    console.log('[Modal] will update');
  }
  render(){
    return (
      <Aux>
        <Backdrop show={this.props.show} closed={this.props.modalclosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
