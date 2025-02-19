import { Button } from "@/components/ui/button";
import { validateEmail, validatePassword } from "@/lib/validators";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    const emailError = validateEmail(formdata.email);
    const passwordError = validatePassword(formdata.password);

    if (emailError && passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    } else if (emailError) {
      return setEmailError(emailError);
    } else if (passwordError) {
      return setPasswordError(passwordError);
    }

    alert(JSON.stringify(formdata));
    setFormdata({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-fit my-16 lg:my-12 flex justify-center max-w-7xl m-auto">
      <div className="flex flex-col gap-4 mx-10 w-full md:w-sm ">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="">Please fill the form below.</p>
        </div>
        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`p-3 ps-5 bg-gray-100 rounded-full ${
                  emailError && "outline-1 outline-red-500"
                }`}
                value={formdata.email}
                onChange={(e) => {
                  setFormdata({ ...formdata, email: e.target.value });
                  setEmailError(validateEmail(e.target.value));
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
            <p className="underline text-end">Forgot password?</p>
            <Button type="submit" className="!p-6 rounded-full mt-2">
              Sign in
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
          <span className="text-gray-600">Don&#39;t have an account?</span>
          <Link to={"/sign-up"} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
