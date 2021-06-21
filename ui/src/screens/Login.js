import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "reactstrap";
import { loginAction, stateResetAction } from "../redux/actions/userActions";
import { Link, Redirect } from "react-router-dom";
import { Center } from "../components";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, auth } = useSelector((state) => state.user);

  useEffect(() => {
    return () => dispatch(stateResetAction());
  }, []);

  return auth._id ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Center>
        <div className="container">
          <div className="my-2">
            <Input
              placeholder="Email"
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Input
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Button
              onClick={() => dispatch(loginAction({ email, password }))}
              disabled={loading}
            >
              {loading ? <ClipLoader /> : "Login"}
            </Button>
          </div>
          <Link to="/forget-password">Forget Password</Link>
        </div>
      </Center>
    </div>
  );
};

export default Login;
