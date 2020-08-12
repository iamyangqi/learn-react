import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import './index.less';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={'/'} component={Home}></Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
