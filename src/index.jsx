import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./Containers/App";
import './index.less';
import {Switch, BrowserRouter} from "react-router-dom";
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
