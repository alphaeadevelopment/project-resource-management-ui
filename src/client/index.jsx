import React from 'react';
import { render } from 'react-dom';
// import fetch from 'fetch-everywhere';
import { createStore, applyMiddleware, compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { window, document } from '@alphaeadev/js-services';
import reducer from './reducers';
import App from './containers/App';

const middleware = [thunk];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

const AppContainer = () => (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
render(<AppContainer />, document.getElementById('react-root'));
