import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateUserData } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentData } from "../features/auth/authSlice";
import { useUpdateMutation } from "../features/user/updateApiSlice";

const UserHeader = () => {
  const errRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [update] = useUpdateMutation();
  const user = useSelector(selectCurrentData);

  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName]);

  const welcome = user
    ? ` ${user.firstName}  ${user.lastName}!`
    : "Error /User/UserData";

  const [isActive, setActive] = useState("false");

  const ToggleClass = (e) => {
    setActive(!isActive);
  };

  const container = document.getElementsByClassName("container");

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
    <div>
      <div className={isActive ? "active" : "inactive"}>
        <h1>{welcome}</h1>
        <button onClick={ToggleClass}>Edit Name</button>
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
          <button type="submit">Save</button>
          <button onClick={ToggleClass}>Cancel</button>
        </form>
      </div>
    </div>
  );

  return content;
};

export default UserHeader;
