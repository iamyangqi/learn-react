import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./Containers/App";
import {Switch, BrowserRouter} from "react-router-dom";
import './i18n';
import './index.less';
require('../mock/index');

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
