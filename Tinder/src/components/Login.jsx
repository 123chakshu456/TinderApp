import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [signUpPage, setSignUpPage] = useState(false);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpSwitch = () => {
    setSignUpPage((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstname, lastname, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center mb-60">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">{signUpPage ? "Sign Up" : "Login"}</legend>


        {signUpPage && <>
        <label className="label">Firstname</label>
        <input
          type="text"
          className="input"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter firstname"
        />
        <label className="label">Lastname</label>
        <input
          type="text"
          className="input"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
          placeholder="Enter lastname"
        /></>}

        <label className="label">Email: {email}</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <p className="text-red-500">{error}</p>

        <button className="btn btn-neutral mt-4" onClick={signUpPage ? handleSignUp : handleLogin}>
          {signUpPage ? "Sign Up" : "Login"}
        </button>
        <div className="m-auto text-xl cursor-pointer" onClick={handleSignUpSwitch}>{signUpPage ? "Already a User - Login here" : "New User? Sign Up here"}</div>
      </fieldset>
    </div>
  );
};

export default Login;
