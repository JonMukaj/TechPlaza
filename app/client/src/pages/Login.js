import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { loginEndpoint } from "../api/userCalls";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  console.log(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginEndpoint(email, password);
      auth.login(response.data);
      navigate(-1);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                onSubmit={handleLogin}
                className="d-flex flex-column gap-15"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
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
                      Credentials are incorrect !
                    </Alert>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
