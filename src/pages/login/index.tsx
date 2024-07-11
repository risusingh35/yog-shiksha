import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/component/spinner/Spinner";
import { setLocalStorage } from "@/utils/loaclStorageService";
import { setIsAuth, resetIsAuth } from "@/reduxStore/Slice/isAuthSlice";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [enterOtp, setEnterOtp] = useState("");
  const [encryptedOTP, setEncryptedOTP] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, token } = useSelector((state: any) => state.auth);
  useEffect(() => {
    console.log({ isAuth, token });
    dispatch(resetIsAuth());
  }, []);
  const handleLogin = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (otpRequested) {
        const response = await axios.post("/api/auth", {
          enterOtp,
          encryptedOTP,
          loggedInUser,
        });
        console.log("response:::;", response);
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const token = response.data.token;
          const isAuth = true;
          setLocalStorage("token", token);
          // login(token);
          dispatch(setIsAuth({ isAuth, token }));
          router.push("/");
        } else {
          console.error("Failed to authenticate:", response.data);
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
      setIsLoading(true);
      const response = await axios.post("/api/users/find-one", { email });
      console.log("response-find-one", response);
      setLoggedInUser(response?.data?.user)
      setIsLoading(false);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOtpRequested(true);
        setEncryptedOTP(response.data.encryptOTP);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Failed to send OTP:", response);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error, {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false)
      console.error("Failed to send OTP:", error);
    }
  };

  const toggleMode = () => {
    setOtpRequested(false);
    router.push("/sign-up");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Spinner
        text="Sending OTP..."
        closedIn={125000}
        onClose={() => setIsLoading(false)}
        isVisible={isLoading}
      />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
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
          {!otpRequested ? (
            <button
              type="button"
              onClick={handleRequestOTP}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Get Login OTP
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              disabled={!enterOtp}
            >
              Login
            </button>
          )}
        </form>
        <button
          onClick={toggleMode}
          className="mt-4 text-sm text-blue-500 hover:underline w-full"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
