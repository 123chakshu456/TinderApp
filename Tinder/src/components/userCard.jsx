const UserCard = ({ user }) => {
    const {firstname, lastname, imageUrl, age, gender, about} = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={imageUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstname + "" + lastname}</h2>
          { age && gender && <p>{age + "," + gender}</p>}
          <p>{about}</p>
          <div className="$$card-actions flex justify-end my-4">
            <button className="btn btn-primary mr-2">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default UserCard;
