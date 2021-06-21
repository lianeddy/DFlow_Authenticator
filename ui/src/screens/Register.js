import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "reactstrap";
import { registerAction, stateResetAction } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import { Center } from "../components";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, redirect } = useSelector((state) => state.user);

  useEffect(() => {
    return () => dispatch(stateResetAction());
  }, []);

  return redirect ? (
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
              //   value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Input
              placeholder="Password"
              type="password"
              id="password"
              //   value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-2">
            <Button
              onClick={() => dispatch(registerAction({ email, password }))}
              disabled={loading}
            >
              {loading ? <ClipLoader /> : "Register"}
            </Button>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default Register;
