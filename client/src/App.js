import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

// Components
import {
  AdminDashboard,
  AdminOrder,
  AdminProduct,
  AdminUser,
  Login,
  Register,
  Navbar,
  Landing,
  Footer,
  OrderPage,
  Payment,
  Category,
  ProductPage,
  Products,
  UserPage,
  PrivateRoute
} from './components';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Switch>
                {/* Admin Routes */}
                <PrivateRoute
                  exact
                  path='/admin/dashboard'
                  component={AdminDashboard}
                />
                <PrivateRoute
                  exact
                  path='/admin/order'
                  component={AdminOrder}
                />
                <PrivateRoute
                  exact
                  path='/admin/product'
                  component={AdminProduct}
                />
                <PrivateRoute exact path='/admin/user' component={AdminUser} />
                {/* Order Routes */}
                <PrivateRoute
                  exact
                  path='/checkout/order'
                  component={OrderPage}
                />
                {/* Payment Routes*/}
                <PrivateRoute
                  exact
                  path='/checkout/order/payment'
                  component={Payment}
                />
                {/* User Routes */}
                <PrivateRoute exact path='/user/profile' component={UserPage} />
              </Switch>
              {/* Product Routes */}
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/category' component={Category} />
              <Route exact path='/products/:id' component={ProductPage} />
              {/* Auth Routes */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
