import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials, setUserData } from "./authSlice";
import { setToken } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useUserMutation } from "../user/userApiSlice";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [user] = useUserMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      const token = userData.body.token;
      const userFetched = await user({ token }).unwrap();

      dispatch(setToken({ ...userFetched, token }));
      dispatch(setUserData({ ...userFetched }));

      navigate("/welcome");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleRmbrInput = (e) => setChecked(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="form_container">
      <Navbar />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-label="text"
      ></p>

      <main>
        <div className="container">
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePwdInput}
              required
            />

            <label htmlFor="persist">
              <input
                type="checkbox"
                name="form__checkbox"
                id="persist"
                onChange={handleRmbrInput}
              />
              Remember me
            </label>

            <button type="submit">SignIn</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );

  return content;
};

export default Login;
