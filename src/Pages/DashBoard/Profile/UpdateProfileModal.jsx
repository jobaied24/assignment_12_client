import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUserEdit,
  FaSave,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProfileModal = ({ user, userFromdb,refetch}) => {
  const {updateProfilePic} = useContext(AuthContext);
  const [profilePic,setProfilePic] = useState(user?.photoURL);
  const [upLoading,setUpLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      image: user?.photoURL || "",
      email: user?.email || "",
      phone: userFromdb?.phone || "",
      role: userFromdb?.role || "participant",
      createdAt: userFromdb?.created_at
        ? new Date(userFromdb.created_at).toLocaleDateString()
        : "",
    },
  });


  // image url
const handleImageUpload = async(e) =>{
  setUpLoading(true);

  try{
  const image = e.target.files[0];
  const formData = new FormData();
  formData.append('image',image);
  const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
  
  const result = await axios.post(imageUploadURL,formData);
  setProfilePic(result.data.data.url);
  }
  catch(error){
   Swal.fire({
      icon: "error",
      title: "Image Upload Failed",
      text: "Please try again.",
    });
  }
  finally{

      setUpLoading(false);

  }
};


// Profile update mutation
const profileMutation = useMutation({
  mutationFn:async(data)=>{
    const result = await axiosSecure.patch(`/users/profile/${user?.email}`,{phone:data.phone});
    return result.data;
  },
    onSuccess: () => {
    refetch();

    // close the modal
    document.getElementById('updateProfile_modal').checked=false;

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  },
  onError:(error)=>{
    Swal.fire({
      icon:"error",
      title:"Update Failed",
      text:error.message
    });
  }
})


//   update profile
const onsubmit = async(data) =>{
    console.log('update profile',data);   

    // updateProfileInfo for firebase
    const updateProfileInfo = {
      displayName:data.name,
      photoURL: profilePic
    };

    try{
      await updateProfilePic(updateProfileInfo)
      
    profileMutation.mutate(data);
    }
    catch(error){
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: error.message,
    });
    }
     
};


  return (
    <>
      {/* Open Button */}
      <label
        htmlFor="updateProfile_modal"
        className="btn btn-primary rounded-xl px-7"
      >
        <FaUserEdit />
        Update Profile
      </label>

      <input
        type="checkbox"
        id="updateProfile_modal"
        className="modal-toggle"
      />

      <div className="modal" role="dialog">
        <div className="modal-box max-w-5xl rounded-3xl p-0 overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b-2 border-gray-300">
            <div>
              <h2 className="text-3xl font-bold text-secondary">
                Update Profile
              </h2>

              <p className="text-gray-500 mt-1">
                Keep your profile information up to date.
              </p>
            </div>

            <label
              htmlFor="updateProfile_modal"
              className="btn btn-circle btn-ghost"
            >
              <FaTimes />
            </label>
          </div>

          {/* Body */}
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="p-8"
          >
            <div className="grid lg:grid-cols-3 gap-10">

              {/* LEFT SIDE */}
              <div className="flex flex-col items-center border-r-3 border-gray-300 pr-8">

                <img
                  src={profilePic ||
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  className="w-36 h-36 rounded-full object-cover border-[5px] border-primary shadow-lg"
                />

                <h3 className="mt-5 text-secondary text-xl font-bold">
                  {user?.displayName || "User"}
                </h3>

                <p className="text-gray-500 text-sm">
                  {user?.email}
                </p>

                <label className="mt-8 w-full">
                  <span className="label-text font-semibold text-gray-500">
                    <FaImage className="inline mr-2 text-secondary" />
                    Photo URL
                  </span>

                  <input
                    type="file"
                    className="input input-bordered rounded-xl w-full mt-2"
                    placeholder={"https://example.com/photo.jpg"}
                   onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:col-span-2">

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Name */}
                  <div>
                    <label className="label">
                      <span className="font-semibold flex items-center gap-2">
                        <FaUser className="text-primary" />
                        Full Name
                      </span>
                    </label>

                    <input
                      type="text"
                      className="input input-bordered rounded-xl w-full"
                      {...register("name")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="label">
                      <span className="font-semibold flex items-center gap-2">
                        <FaPhoneAlt className="text-primary" />
                        Phone Number
                      </span>
                    </label>

                    <input
                      type="text"
                      className="input input-bordered rounded-xl w-full"
                      placeholder="01XXXXXXXXX"
                      {...register("phone")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="label">
                      <span className="font-semibold flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        Email
                      </span>
                    </label>

                    <input
                      disabled
                      type="email"
                      className="input input-bordered rounded-xl w-full bg-base-200"
                      {...register("email")}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="label">
                      <span className="font-semibold">
                        Role
                      </span>
                    </label>

                    <input
                      disabled
                      className="input input-bordered rounded-xl w-full bg-base-200 capitalize"
                      {...register("role")}
                    />
                  </div>

                  {/* Member Since */}
                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="font-semibold">
                        Member Since
                      </span>
                    </label>

                    <input
                      disabled
                      className="input input-bordered rounded-xl w-full bg-base-200"
                      {...register("createdAt")}
                    />
                  </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-4 mt-10">

                  <label
                    htmlFor="updateProfile_modal"
                    className="btn btn-outline rounded-xl px-7"
                  >
                    Cancel
                  </label>

                  <button
                    type="submit"
                    disabled={upLoading || profileMutation.isPending}
                    className="btn btn-primary rounded-xl px-7"
                  >
                    <FaSave />
                    Save Changes
                  </button>

                </div>

              </div>

            </div>
          </form>

        </div>

        <label
          htmlFor="updateProfile_modal"
          className="modal-backdrop"
        >
          Close
        </label>
      </div>
    </>
  );
};

export default UpdateProfileModal;