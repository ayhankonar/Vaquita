import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import Provider from './hooks/context'

ReactDOM.render(
    <Provider>
      <Router />
    </Provider>
    ,
    document.getElementById('root')
  );
  

serviceWorker.unregister();
