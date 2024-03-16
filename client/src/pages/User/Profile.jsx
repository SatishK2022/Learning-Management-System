import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../components";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);

  return (
    <Container className="min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col gap-2 rounded-lg p-5 w-full sm:w-1/2 lg:w-1/3 shadow-[0_0_10px_black]">
        <img
          src={userData?.avatar?.secure_url}
          alt="Profile Photo"
          className="w-28 rounded-full ring-2 ring-orange-500 mx-auto"
        />
        <h3 className="font-semibold text-center text-xl capitalize">
          {userData?.fullName}
        </h3>
        <div className="grid grid-cols-2">
          <p className="font-semibold text-orange-500">Email</p>{" "}
          <p> {userData?.email}</p>
          <p className="font-semibold text-orange-500">Role</p>{" "}
          <p>{userData?.role}</p>
          <p className="font-semibold text-orange-500">Subscription</p>{" "}
          <p>
            {userData?.subscription?.status === "active"
              ? "Active"
              : "Inactive"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            to="/changepassword"
            className="w-1/2 uppercase mt-4 bg-blue-500 hover:bg-blue-600 rounded-md text-center py-2 text-white font-semibold transition-all duration-200 ease-in"
          >
            <button>Change Password</button>
          </Link>
          <Link
            to="/user/edit-profile"
            className="w-1/2 uppercase mt-4 bg-green-500 hover:bg-green-600 rounded-md text-center py-2 text-white font-semibold transition-all duration-200 ease-in"
          >
            <button>Edit Profile</button>
          </Link>
        </div>
        {userData?.subscription?.status === "active" && (
          <button className="w-full btn btn-error text-base text-white rounded-md font-semibold px-8">
            Cancel Subscription
          </button>
        )}
      </div>
    </Container>
  );
};

export default Profile;
