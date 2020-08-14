import {BrowserRouter, Route, Switch} from "react-router-dom";
import {withRouter} from 'react-router';
import * as React from 'react';
import Login from "../Login";
import Home from "../Home";
import ScopeContext from "./context";

const App = withRouter((props) => {
    const [state, dispatch] = React.useReducer(reducer, {});

    function reducer(state, action) {
        switch (action.type) {
            case 'setLoginInfo': {
                return Object.assign({}, state, {loginInfo: action.loginInfo})
            }
            default: throw new Error('scope reducer action error');
        }
    }

    React.useEffect(() => {
        if (localStorage.getItem('loginSession')) {
            dispatch({
                type:'setLoginInfo',
                loginInfo: {
                    username: 'admin'
                }
            });
        } else {
            props.history.replace('/login');
        }
    }, []);

    return (
        <ScopeContext.Provider value={{
            state,
            dispatch
        }}>
            <Switch>
                <Route path={'/login'} component={Login}></Route>
                <Route path={'/'} component={Home}></Route>
            </Switch>
        </ScopeContext.Provider>
    );
}
)
export default App;
