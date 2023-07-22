import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../sass/form.scss";

import { useDispatch } from "react-redux";
import { setUserData } from "../auth/authSlice";
import { useRegisterMutation } from "./registerSlice";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function Register() {
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, password, firstName, lastName]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userData = await register({
        email,
        password,
        firstName,
        lastName,
      }).unwrap();
      dispatch(
        setUserData({ ...userData, email, password, firstName, lastName })
      );
      console.log(setUserData());

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);

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
          <form action="" onSubmit={handleRegistration} id="sign-up-form">
            <h1>Sign Up</h1>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailInput}
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
            <label htmlFor="firstname">FirstName:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameInput}
              required
            />
            <label htmlFor="lastName">LastName:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameInput}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );

  return content;
}

export default Register;
