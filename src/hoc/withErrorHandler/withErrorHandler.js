import React,{ Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//This is a higher order reusable component which can handle error easily
//Use axios here to handle error globally
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      state = {
        error: null
      }
      //THis will be called before child elements being rendered
      componentWillMount () {
        //To clear error every time sending a new request;
        this.reqInterceptor = axios.interceptors.request.use(req => {
           this.setState({error: null});
           return req;
         });
        this.resInterceptor = axios.interceptors.response.use(res => res,error => {
           this.setState({error: error});
         });
      }
      //Remove old interceptors
      componentWillUnmount () {
        // console.log('Unmount',this.reqInterceptor,this.resInterceptor);
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
      }

      errorComfirmHandler = () => {
        this.setState({error: null});
      }
      render () {
        return (
          <Aux>
            <Modal
              show={this.state.error}
              modalclosed={this.errorComfirmHandler}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        );
    }
  }
}

export default withErrorHandler;
