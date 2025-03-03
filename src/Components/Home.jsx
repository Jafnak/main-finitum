import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className="p-20 flex justify-center gap-6"
        style={{
          backgroundColor: "#FFF8E7", // Cream background
        }}
      >
        {/* Study Group Card */}
        <div className="card bg-white text-black w-96 shadow-sm ">
          <figure>
            <img src="stud.png" alt="Study Group" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Study Group</h2>
            <p>
              Join Finitum's study groups to connect, collaborate, and achieve
              your learning goals in real-time!
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Join Now</button>
            </div>
          </div>
        </div>
        {/* Gaming Card */}
        <div className="card bg-white text-black w-96 shadow-sm">
          <figure>
            <img src="game.png" alt="Gaming" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Gaming</h2>
            <p>
              Level up your fun with Finitum's gaming groups—connect, compete,
              and conquer in real time!
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Join Now</button>
            </div>
          </div>
        </div>
        {/* Health and Fitness Card */}
        <div className="card bg-white text-black w-96 shadow-sm">
          <figure>
            <img src="fit.png" alt="Health and Fitness" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Health and Fitness</h2>
            <p>
              Crush your fitness goals with Finitum's health groups—stay
              motivated, share tips, and thrive together!
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
