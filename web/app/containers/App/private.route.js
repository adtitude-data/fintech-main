import React from "react";
import { Route , Redirect , withRouter  } from "react-router-dom";
import PropTypes from 'prop-types';
import auth from './auth';


class PrivateRoute extends React.Component {
  state = {
    haveAcces: false,
    loaded: false,
  }

  componentDidMount() {
    this.checkAcces();
  }

  checkAcces = async () => {
    const { userRole, history } = this.props;
    let { haveAcces } = this.state;

    var data = await auth.isAuthenticated();
    if(data.pass){
      haveAcces = (data.role == userRole) ? true : false ; // true || false
      this.setState({
        haveAcces,
        loaded: true,
      });
    }else{
      history.push('/');
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, haveAcces } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return haveAcces ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          );
        }}
      />
    );
  }
}

export default withRouter(PrivateRoute);

PrivateRoute.propTypes = {
  userRole: PropTypes.string.isRequired,
};


/* export const AdminPrivateRoute = ({component : Component , ...rest }) => {

  var checkToken = await auth.isAuthenticated();
  return (
    <Route
       {...rest}
       render={props => {
         if(checkToken){
            return <Component {...props} />
         }else{
          return (
            <Redirect
              to={{
                pathname : "/",
                state : {
                  from : props.location
                }
              }}
            />
          )
         }
       }}
    />
  );
}; */
