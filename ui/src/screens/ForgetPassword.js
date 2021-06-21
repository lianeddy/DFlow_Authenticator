import React, { useState } from "react";
import { Center } from "../components";
import { Input, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { forgotPasswordAction } from "../redux/actions";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.user);
  return (
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
            <Button
              onClick={() => dispatch(forgotPasswordAction(email))}
              disabled={loading}
            >
              {loading ? <ClipLoader /> : "Send"}
            </Button>
          </div>
        </div>
      </Center>
    </div>
  );
};

export default ForgetPassword;
