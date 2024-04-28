import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signFailure, signStart, signSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false);
      dispatch(signStart());
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        // setError(data);
        dispatch(signFailure(data.message));
        return;
      }
      if (res.ok) {
        navigate("/");
        dispatch(signSuccess(data));
      }
      // setLoading(false);
    } catch (error) {
      // setError(error);
      // setLoading(false);
      dispatch(signFailure(error));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className=" mt-5">
        <p className="flex gap-2">
          Don't have an account?
          <Link to="/sign-up" className="text-blue-500">
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
      {error && (
        <p className="text-red-500 mt-2">
          {error ? error : "Something went wrong"}
        </p>
      )}
    </div>
  );
};

export default SignIn;
