import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import Layout from './pages/layout';
import News from './pages/news';

function App() {
  return (
    <Layout>
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            component={News}
          />
        </Switch>
      </Router>
    </Layout>
  );
}
export default App;
