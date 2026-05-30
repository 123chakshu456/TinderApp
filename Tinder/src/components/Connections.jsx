import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="flex flex-col justify-center text-center my-10">
      <div>
        <h1 className="text-bold text-5xl">Connections</h1>
        {connections.map((connection) => {
          const { _id, firstname, lastname, imageUrl, age, gender, about } =
            connection;

          return (
            <div key={_id} className="flex  m-4 p-4 rounded-lg bg-base-200">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                  src={imageUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstname + " " + lastname}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
