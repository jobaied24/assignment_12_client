import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUserEdit,
} from "react-icons/fa";
import UpdateProfileModal from "./UpdateProfileModal";
import Loading from "../../../Loading";

const Profile = () => {
  const { user,loading} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userFromdb = {},refetch,isLoading} = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const creationDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };


  if(loading || isLoading){
    return <Loading></Loading>
  }

  console.log(user?.photoURL)

  return (
    <div className="bg-base-100 p-6">

      {/* Page Heading */}
      <h2 className="text-3xl font-bold text-secondary mb-6">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="rounded-3xl shadow-xl border border-gray-100 p-10 mt-10">

        <div className="flex items-center">

          {/* Left */}
          <div className="w-1/4 flex flex-col items-center">

            <div className="relative">
            {
              user && 
              <img
                src={user?.photoURL} 
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-[5px] border-primary shadow-lg"
              />

            }

              <span className="badge badge-primary absolute left-1/2 -translate-x-1/2 -bottom-3 px-5 py-3 capitalize shadow">
                {userFromdb.role}
              </span>

            </div>

          </div>

          {/* Divider */}
          <div className="divider divider-horizontal h-44"></div>

          {/* Middle */}
          <div className="flex-1 px-10">

            <h2 className="text-4xl font-bold text-secondary">
              {user?.displayName}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-gray-500">

              <FaEnvelope className="text-primary" />

              <p className="text-lg">
                {user?.email}
              </p>

            </div>

          </div>

          {/* Right */}
          <div className="w-80 space-y-5">

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">

              <div className="flex items-center gap-4">

                <FaPhoneAlt className="text-success text-xl" />

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <h3 className="font-semibold text-gray-700">
                    {userFromdb.phone || "Not Added"}
                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">

              <div className="flex items-center gap-4">

                <FaCalendarAlt className="text-success text-xl" />

                <div>

                  <p className="text-sm text-gray-500">
                    Member Since
                  </p>

                  <h3 className="font-semibold text-gray-700">
                    {creationDate(userFromdb.created_at)}
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="flex justify-end mt-10">
             <UpdateProfileModal  user={user} userFromdb={userFromdb} refetch={refetch}></UpdateProfileModal>

        </div>

      </div>

    </div>
  );
};

export default Profile;