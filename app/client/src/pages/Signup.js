import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { signupEndpoint } from "../api/userCalls";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    } else if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      );
      return;
    } else if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signupEndpoint(email, password, verifyPassword);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" className="d-flex flex-column gap-15">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  name="verify-password"
                  placeholder="Verify password"
                  className="form-control"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" onClick={handleSubmit}>
                      Sign Up
                    </button>
                    <div>
                      {loading ? (
                        <div>
                          <CircularProgress
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "45%",
                              marginTop: "10px",
                            }}
                          />
                        </div>
                      ) : null}
                      {error ? (
                        <Alert
                          severity="error"
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          {error}
                        </Alert>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
