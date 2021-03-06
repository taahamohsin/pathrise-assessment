import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../stylesheets/application';

import Sources from '../components/sources/Sources.jsx';
import SourceDrillDown from '../components/source-drilldown/SourceDrillDown.jsx';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/sources/:sourceId" exact>
        <SourceDrillDown />
      </Route>
      <Route path="/" exact>
        <Sources />
      </Route>
    </Switch>
  </BrowserRouter>
);

render(<Router />, document.getElementById('root'));

