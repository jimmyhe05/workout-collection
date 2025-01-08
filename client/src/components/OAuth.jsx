import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 w-full flex items-center justify-center"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-1" />
      <span>Continue With Google</span>
    </button>
  );
}
