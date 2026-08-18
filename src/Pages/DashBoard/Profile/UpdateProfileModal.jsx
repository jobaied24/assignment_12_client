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

const UpdateProfileModal = ({ user, userFromdb, refetch }) => {
  const { updateProfilePic } = useContext(AuthContext);

  const [profilePic, setProfilePic] = useState(user?.photoURL);
  const [upLoading, setUpLoading] = useState(false);

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


  // Image upload
  const handleImageUpload = async (e) => {
    setUpLoading(true);

    try {
      const image = e.target.files[0];

      const formData = new FormData();
      formData.append("image", image);

      const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

      const result = await axios.post(imageUploadURL, formData);

      setProfilePic(result.data.data.url);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try again.",
      });
    } finally {
      setUpLoading(false);
    }
  };


  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (data) => {
      const result = await axiosSecure.patch(
        `/users/profile/${user?.email}`,
        {
          phone: data.phone,
        }
      );

      return result.data;
    },

    onSuccess: () => {
      refetch();

      document.getElementById(
        "updateProfile_modal"
      ).checked = false;

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    },
  });


  // Submit
  const onsubmit = async (data) => {

    const updateProfileInfo = {
      displayName: data.name,
      photoURL: profilePic,
    };

    try {
      await updateProfilePic(updateProfileInfo);

      profileMutation.mutate(data);

    } catch (error) {
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
        className="btn btn-primary btn-sm md:btn-md rounded-xl px-4 md:px-7"
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

        <div
          className="
            modal-box
            max-w-5xl
            w-[95%]
            sm:w-[90%]
            rounded-2xl
            md:rounded-3xl
            overflow-hidden
            p-0
            max-h-[95vh]
          "
        >

          {/* Header */}
          <div
            className="
              flex
              justify-between
              items-center
              px-4
              py-4
              md:px-8
              md:py-6
              border-b-2
              border-gray-300
            "
          >

            <div className="min-w-0">

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                  text-secondary
                "
              >
                Update Profile
              </h2>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-gray-500
                  mt-1
                  truncate
                "
              >
                Keep your profile information up to date.
              </p>

            </div>


            <label
              htmlFor="updateProfile_modal"
              className="btn btn-circle btn-ghost btn-sm md:btn-md shrink-0"
            >
              <FaTimes />
            </label>

          </div>


          {/* Body */}
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="
              p-4
              sm:p-5
              md:p-8
              overflow-y-auto
            "
          >

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-4
                md:gap-8
                lg:gap-10
              "
            >

              {/* LEFT SIDE */}
              <div
                className="
                  flex
                  flex-col
                  items-center
                  lg:border-r-3
                  border-gray-300
                  lg:pr-8
                "
              >

                {/* Profile image */}
                <img
                  src={
                    profilePic ||
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  className="
                    w-24
                    h-24
                    sm:w-28
                    sm:h-28
                    md:w-36
                    md:h-36
                    rounded-full
                    object-cover
                    border-4
                    md:border-[5px]
                    border-primary
                    shadow-lg
                  "
                />


                {/* Name */}
                <h3
                  className="
                    mt-3
                    md:mt-5
                    text-secondary
                    text-lg
                    md:text-xl
                    font-bold
                    text-center
                  "
                >
                  {user?.displayName || "User"}
                </h3>


                {/* Email */}
                <p
                  className="
                    text-gray-500
                    text-xs
                    md:text-sm
                    text-center
                    max-w-full
                    truncate
                  "
                >
                  {user?.email}
                </p>


                {/* Image upload */}
                <label
                  className="
                    mt-5
                    md:mt-8
                    w-full
                  "
                >

                  <span
                    className="
                      label-text
                      text-xs
                      md:text-sm
                      font-semibold
                      text-gray-500
                    "
                  >
                    <FaImage className="inline mr-2 text-secondary" />
                    Change Profile Photo
                  </span>


                  <input
                    type="file"
                    accept="image/*"
                    className="
                      input
                      input-bordered
                      rounded-xl
                      w-full
                      mt-2
                      text-xs
                      md:text-sm
                      p-2
                    "
                    onChange={handleImageUpload}
                  />

                </label>

              </div>


              {/* RIGHT SIDE */}
              <div className="lg:col-span-2">

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-1
                    md:gap-6
                  "
                >

                  {/* Name */}
                  <div>

                    <label className="label py-1 md:py-2">

                      <span
                        className="
                          font-semibold
                          text-sm
                          md:text-base
                          flex
                          items-center
                          md:gap-2
                        "
                      >
                        <FaUser className="text-primary text-sm md:text-base" />
                        Full Name
                      </span>

                    </label>


                    <input
                      type="text"
                      className="
                        input
                        input-bordered
                        rounded-xl
                        w-full
                        input-sm
                        md:input-md
                      "
                      {...register("name")}
                    />

                  </div>


                  {/* Phone */}
                  <div>

                    <label className="label py-1 md:py-2">

                      <span
                        className="
                          font-semibold
                          text-sm
                          md:text-base
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FaPhoneAlt className="text-primary text-sm md:text-base" />
                        Phone Number
                      </span>

                    </label>


                    <input
                      type="text"
                      className="
                        input
                        input-bordered
                        rounded-xl
                        w-full
                        input-sm
                        md:input-md
                      "
                      placeholder="01XXXXXXXXX"
                      {...register("phone")}
                    />

                  </div>


                  {/* Email */}
                  <div>

                    <label className="label py-1 md:py-2">

                      <span
                        className="
                          font-semibold
                          text-sm
                          md:text-base
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <FaEnvelope className="text-primary text-sm md:text-base" />
                        Email
                      </span>

                    </label>


                    <input
                      disabled
                      type="email"
                      className="
                        input
                        input-bordered
                        rounded-xl
                        w-full
                        input-sm
                        md:input-md
                        bg-base-200
                      "
                      {...register("email")}
                    />

                  </div>


                  {/* Role */}
                  <div>

                    <label className="label py-1 md:py-2">

                      <span className="font-semibold text-sm md:text-base">
                        Role
                      </span>

                    </label>


                    <input
                      disabled
                      className="
                        input
                        input-bordered
                        rounded-xl
                        w-full
                        input-sm
                        md:input-md
                        bg-base-200
                        capitalize
                      "
                      {...register("role")}
                    />

                  </div>


                  {/* Member Since */}
                  <div className="sm:col-span-2">

                    <label className="label py-1 md:py-2">

                      <span className="font-semibold text-sm md:text-base">
                        Member Since
                      </span>

                    </label>


                    <input
                      disabled
                      className="
                        input
                        input-bordered
                        rounded-xl
                        w-full
                        input-sm
                        md:input-md
                        bg-base-200
                      "
                      {...register("createdAt")}
                    />

                  </div>

                </div>


                {/* Footer */}
                <div
                  className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    justify-end
                    gap-2
                    md:gap-4
                    mt-6
                    md:mt-10
                  "
                >

                  <label
                    htmlFor="updateProfile_modal"
                    className="
                      btn
                      btn-outline
                      btn-sm
                      md:btn-md
                      rounded-xl
                      px-5
                      md:px-7
                    "
                  >
                    Cancel
                  </label>


                  <button
                    type="submit"
                    disabled={
                      upLoading ||
                      profileMutation.isPending
                    }
                    className="
                      btn
                      btn-primary
                      btn-sm
                      md:btn-md
                      rounded-xl
                      px-5
                      md:px-7
                    "
                  >

                    <FaSave />

                    {upLoading
                      ? "Uploading..."
                      : profileMutation.isPending
                      ? "Saving..."
                      : "Save Changes"}

                  </button>

                </div>

              </div>

            </div>

          </form>

        </div>


        {/* Backdrop */}
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