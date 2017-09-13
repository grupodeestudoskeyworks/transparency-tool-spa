import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

class AuthenticatedRoute extends Component {
  render() {
    const { session: { token }, component: RouteComponent, ...rest } = this.props;
    return (
      <Route {...rest}
        render={routeProps => (
          token ? (
            <RouteComponent {...routeProps}/>
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}/>
          )
        )}/>
    );
  }
}

AuthenticatedRoute.defaultProps = {
  session: {
    token: ''
  }
};

AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  session: PropTypes.shape({
    token: PropTypes.string
  })
};

const select = state => ({
  session: state.session
});

export default connect(select)(AuthenticatedRoute);
