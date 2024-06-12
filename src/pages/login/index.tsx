import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [enterOtp, setEnterOtp] = useState("");
  const [encryptedOTP, setEncryptedOTP] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state to handle multiple submissions

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      if (otpRequested) {
        const response = await axios.post("/api/auth", { enterOtp, encryptedOTP });
        console.log("response:::;", response);
      } else {
        handleRequestOTP();
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestOTP = async () => {
    if (!email) return;
    try {
      const response = await axios.post("/api/generate-otp", { email });

      if (response.status === 200) {
        setOtpRequested(true);
        setEncryptedOTP(response.data.encryptOTP);
      } else {
        console.error("Failed to send OTP:", response);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      // Implement signup logic using email, contact, name, and OTP
      console.log("Sign up with:", email, contact, name, enterOtp);
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setEnterOtp("");
    setOtpRequested(false);
    setContact("");
    setName("");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">{isLoginMode ? "Login" : "Sign Up"}</h2>
        <form onSubmit={isLoginMode ? handleLogin : handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          {!isLoginMode && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact:
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
            </>
          )}
          {!otpRequested && (
            <button
              type="button"
              onClick={handleRequestOTP}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              {isLoginMode ? "Get Login OTP" : "Sign Up"}
            </button>
          )}
          {otpRequested && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                OTP:
              </label>
              <input
                type="text"
                value={enterOtp}
                onChange={(e) => setEnterOtp(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
          )}
          {otpRequested && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              disabled={!enterOtp || (!isLoginMode && (!contact || !name))}
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          )}
        </form>
        <button
          onClick={toggleMode}
          className="mt-4 text-sm text-blue-500 hover:underline w-full"
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
