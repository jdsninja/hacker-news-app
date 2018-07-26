import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './containers/layout'
import Players from './containers/players'
import Plans from './containers/plans'
import Reports from './containers/reports'
import Activities from './containers/activities'

const App = () => (
  <Router>
    <Layout>
      <Route exact path="/players" component={Players} />
      <Route exact path="/plans" component={Plans} />
      <Route exact path="/reports" component={Reports} />
      <Route exact path="/activities" component={Activities} />
    </Layout>
  </Router>
)

export default App;