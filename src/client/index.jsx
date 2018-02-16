import React from 'react';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import Reboot from 'material-ui/Reboot';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { window, document, configuration } from '@alphaeadev/js-services';
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
configuration.setConfiguration({ apiBaseUri: process.env.PROXY_SERVER });

const AppContainer = () => (
  <Router>
    <Provider store={store}>
      <div>
        <Reboot />
        <App />
      </div>
    </Provider>
  </Router>
);
render(<AppContainer />, document.getElementById('react-root'));
