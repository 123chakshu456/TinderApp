import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [showToast, setShowToast] = useState(false);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    seterror("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstname,
          lastname,
          age,
          gender,
          about,
          imageUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      seterror(err?.response?.data || err.message || "Failed to save profile.");
    }
  };

  return (
    <div className="flex justify-center items-center mb-150 mx-150">
      <div className="flex-1 justify-center items-center mb-60">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">Firstname</label>
          <input
            type="text"
            className="input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Firstname"
          />

          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Lastname"
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
          />
          <label className="label">About</label>
          <input
            type="text"
            className="input"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About"
          />
          <label className="label">ImageUrl</label>
          <input
            type="text"
            className="input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="ImageUrl"
          />
          {error && <p className="text-red-500">Error: {error}</p>}
          <button className="btn btn-primary mt-5" onClick={saveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>

      <UserCard user={{ firstname, lastname, age, gender, about, imageUrl }} />
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="toast toast-end">
            <div className="alert alert-success shadow-lg">
              <div>
                <span>Profile saved successfully.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
