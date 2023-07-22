import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserData, selectCurrentData } from "./authSlice";
import { useSelector } from "react-redux";
import { useUpdateMutation } from "../user/updateApiSlice";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import "../../sass/user.scss";

const Welcome = () => {
  const user = useSelector(selectCurrentData);

  const errRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [update] = useUpdateMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName]);

  const welcome = user
    ? ` ${user.firstName}  ${user.lastName} !`
    : "Error /User/UserData";

  const [isActive, setActive] = useState("false");

  const ToggleClass = (e) => {
    setActive(!isActive);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newUserData = await update({
        firstName,
        lastName,
      }).unwrap();
      dispatch(updateUserData({ ...newUserData, firstName, lastName }));
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
      }
      errRef.current.focus();
    }
    console.log("click");
  };

  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);

  const content = (
    <div className={isActive ? "container close" : "container open"}>
      <Navbar />
      <div className={isActive ? "header close" : "header open"}>
        <h1>Welcome Back ! </h1>
        <div>
          <div className={isActive ? "active" : "inactive"}>
            <h1>{welcome}</h1>
            <button
              className={isActive ? "button close" : "button open"}
              onClick={ToggleClass}
            >
              Edit Name
            </button>
          </div>
          <div className={isActive ? "inactive" : "active"}>
            <form onSubmit={handleUpdate}>
              <input
                placeholder={user.firstName}
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameInput}
                required
              />
              <input
                type="text"
                placeholder={user.lastName}
                id="lastName"
                value={lastName}
                onChange={handleLastNameInput}
                required
              />
              <button
                className={isActive ? "button close" : "button open"}
                onClick={ToggleClass}
                type="submit"
              >
                {" "}
                Save
              </button>
              <button
                className={isActive ? "button close" : "button open"}
                onClick={ToggleClass}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
      <main>
        <section className="transaction">
          <div className="info">
            <p>Argent Bank Checking (x8349)</p>
            <h2>$2,082.79</h2>
            <p>Available Balance</p>
          </div>
          <button className={isActive ? "button close" : "button open"}>
            View Transaction
          </button>
        </section>
        <section className="transaction">
          <div className="info">
            <p>Argent Bank Checking (x6712)</p>
            <h2>$10,928.42</h2>
            <p>Available Balance</p>
          </div>
          <button className={isActive ? "button close" : "button open"}>
            View Transaction
          </button>
        </section>
        <section className="transaction">
          <div className="info">
            <p>Argent Bank Checking (x8349)</p>
            <h2>$184.30</h2>
            <p>Current Balance</p>
          </div>
          <button className={isActive ? "button close" : "button open"}>
            View Transaction
          </button>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );

  return content;
};
export default Welcome;
