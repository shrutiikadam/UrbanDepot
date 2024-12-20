
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from './Login.css';
import 'boxicons/css/boxicons.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // Admin credentials
  const adminEmail = "admin@gmail.com";  // Replace with the actual admin email
  const adminPassword = "123";  // Replace with the actual admin password

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      toast.success("Admin login successful!");

      alert("Admin login successful!");
      navigate("/adminpage");  // Navigate to the admin page
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        alert("Login successful!");
        navigate("/map");
      } else {
        toast.warn("Please verify your email before logging in.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);

    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      toast.success("Google login successful!");

      navigate("/map");
    } catch (error) {
      toast.error(`Google Login Error: ${error.message}`);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      toast.success("Signup successful! Please check your email for verification.");
      navigate("/login");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent! Check your inbox.");
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      <div className={`form-container ${isSignUp ? "show-signup" : "show-login"}`}>
        <div className="col col-1">
          <div className="image-layer">
            <img src="car.png" className="car-bg" />
          </div>
          <p className="words">Few Seconds Away From Solving Parking Issue!</p>
        </div>
        <div className="col col-2">
          <div className="btn-box">
            <button className={`btn1 ${!isSignUp ? "btn-1" : ""}`} onClick={() => setIsSignUp(false)}>
              LOG IN
            </button>
            <button className={`btn1 ${isSignUp ? "btn-2" : ""}`} onClick={() => setIsSignUp(true)}>
              SIGN UP
            </button>
          </div>

          <div className={`register-form ${isSignUp ? "active" : ""}`}>
            <div className="form-title"><span>SIGN UP</span></div>
            <form onSubmit={handleSignUp}>
              <div className="form-inputs">
                <div className="input-box">
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <i className="bx bx-envelope icon"></i>
                </div>
                <div className="input-box">
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="input-box">
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <i className="bx bx-lock-alt icon"></i>
                </div>
                <button className="input-submit" type="submit">
                  <span>Sign Up</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </form>
            <button className="google-btn" onClick={handleGoogleLogin}>
              <span className="google-icon"><i className="bx bxl-google"></i></span>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className={`login-form ${!isSignUp ? "active" : ""}`}>
            <div className="form-title"><span>LOGIN</span></div>
            <form onSubmit={handleLogin}>
              <div className="form-inputs">
                <div className="input-box">
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <i className="bx bx-envelope icon"></i>
                </div>
                <div className="input-box">
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i className="bx bx-lock-alt icon"></i>
                </div>
                <button className="input-submit" type="submit">
                  <span>LOG IN</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </form>
            <button className="google-btn" onClick={handleGoogleLogin}>
              <span className="google-icon"><i className="bx bxl-google"></i></span>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

