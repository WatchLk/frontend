import { Button } from "@/components/ui/button";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validators";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { LiaSpinnerSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetSignUpStatus, signUpAsync } from "@/state/authSlice/authSlice";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstnameError, setFirstnameError] = useState(null);
  const [lastnameError, setLastnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { signUpStatus, authError } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSignUpStatus());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstnameError(null);
    setLastnameError(null);
    setEmailError(null);
    setPasswordError(null);

    const firstnameError = validateName(formdata.firstname, 1);
    const lastnameError = validateName(formdata.lastname, 2);
    const emailError = validateEmail(formdata.email);
    const passwordError = validatePassword(formdata.password);

    setFirstnameError(firstnameError);
    setLastnameError(lastnameError);
    setEmailError(emailError);
    setPasswordError(passwordError);

    if (firstnameError || lastnameError || emailError || passwordError) {
      return;
    }

    dispatch(signUpAsync(formdata));
  };

  useEffect(() => {
    if (signUpStatus === "fulfilled") {
      toast.success("Registration successful");
      navigate("/auth/signin");
    } else if (signUpStatus === "rejected") {
      toast.error(authError);
    }
  }, [signUpStatus, navigate, authError]);

  return (
    <div className="min-h-fit my-16 lg:my-12 flex justify-center max-w-7xl m-auto">
      <div className="flex flex-col gap-4 mx-10 w-full md:w-sm ">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="">Please fill the form below.</p>
        </div>
        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                className={`p-3 ps-5 bg-gray-100 rounded-full w-full ${
                  firstnameError && "outline-1 outline-red-500"
                }`}
                value={formdata.firstname}
                onChange={(e) => {
                  setFormdata({ ...formdata, firstname: e.target.value });
                  setFirstnameError(validateName(e.target.value, 1));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {firstnameError && (
                <span className="text-red-500 text-sm ms-5">
                  {firstnameError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                className={`p-3 ps-5 bg-gray-100 rounded-full w-full ${
                  lastnameError && "outline-1 outline-red-500"
                }`}
                value={formdata.lastname}
                onChange={(e) => {
                  setFormdata({ ...formdata, lastname: e.target.value });
                  setLastnameError(validateName(e.target.value, 2));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {lastnameError && (
                <span className="text-red-500 text-sm ms-5">
                  {lastnameError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`p-3 ps-5 bg-gray-100 rounded-full w-full ${
                  emailError && "outline-1 outline-red-500"
                }`}
                value={formdata.email}
                onChange={(e) => {
                  setFormdata({ ...formdata, email: e.target.value });
                  setEmailError(validateEmail(e.target.value));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {emailError && (
                <span className="text-red-500 text-sm ms-5">{emailError}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter your password"
                  className={`p-3 ps-5 bg-gray-100 rounded-full w-full ${
                    passwordError && "outline-1 outline-red-500"
                  }`}
                  value={formdata.password}
                  onChange={(e) => {
                    setFormdata({ ...formdata, password: e.target.value });
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                {passwordError && (
                  <span className="text-red-500 text-sm ms-5">
                    {passwordError}
                  </span>
                )}
                <Button
                  className="absolute top-1.5 right-1.5 rounded-full"
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword && <EyeClosed className="" />}
                  {showPassword && <Eye />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="!p-6 rounded-full mt-2"
              disabled={signUpStatus === "pending"}
            >
              {signUpStatus === "pending" && (
                <LiaSpinnerSolid className="animate-spin size-5" />
              )}
              <span>Register</span>
            </Button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <hr className="grow" />
          <span>Or</span>
          <hr className="grow" />
        </div>
        <Button
          variant="outline"
          className="!p-6 border shadow-none rounded-full"
        >
          <FcGoogle />
          Continue with Google
        </Button>
        <div className="flex gap-1 justify-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link to={"/auth/signin"} className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
