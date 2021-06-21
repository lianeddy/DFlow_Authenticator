import "./App.css";
import React, { useEffect } from "react";
import {
  Landing,
  Login,
  Register,
  Profile,
  Activate,
  ForgetPassword,
  ResetPassword,
} from "./screens";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { keepLogged } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(keepLogged());
    }
  }, []);
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/activate" component={Activate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/reset-password" component={ResetPassword} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
