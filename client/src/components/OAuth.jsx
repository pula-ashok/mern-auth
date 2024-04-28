import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: displayName,
          email: email,
          photo: photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      className=" bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
      onClick={googleClick}
    >
      Continue with google
    </button>
  );
};

export default OAuth;
