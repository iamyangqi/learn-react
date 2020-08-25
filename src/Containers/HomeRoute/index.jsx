import {Route, Switch, withRouter} from "react-router";
import * as React from 'react';
import UserManagement from "../../pages/UserManagement";

const HomeRoute = withRouter(() => {
    return (
        <Switch>
            <Route path={'/user-management'} exact={true} component={UserManagement} />
        </Switch>
    )
});

export default HomeRoute;
