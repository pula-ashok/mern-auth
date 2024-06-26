import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState("");
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successFlag, setSuccessFlag] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("upload is " + progress + "% done");
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false);
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log("data", data);

      if (data.success === false) {
        // setError(data);
        dispatch(updateUserFailure(data.message));
        return;
      } else {
        // console.log("ashok pula");
        // navigate("/profile");
        // console.log(data);
        dispatch(updateUserSuccess(data));
        setSuccessFlag(true);
      }
      // setLoading(false);
    } catch (error) {
      // setError(error);
      // setLoading(false);
      dispatch(updateUserFailure(error.message));
    }
  };
  const deleteHandler = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch(deleteUserSuccess());
      // console.log(data);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const singoutHandler = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          src={formData.photo || user.photo}
          alt="profile"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-2 self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error Uploading image (file must be less then 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`Uploading: ${imagePercent} %`}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image upload successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={user.username}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          defaultValue={user.email}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
          id="password"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={deleteHandler}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={singoutHandler}>
          Sign Out
        </span>
      </div>
      <p className="text-sm mt-4">
        {error ? (
          <span className="text-red-800">{error}</span>
        ) : successFlag ? (
          <span className="text-green-700">Updated successfully</span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default Profile;
