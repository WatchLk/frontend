import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "../lib/firebase.config";
import { signInWithGoogleAsync } from "@/state/authSlice/authSlice";
import { useDispatch } from "react-redux";

const OAuthButton = () => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const idToken = await res.user.getIdToken();
      dispatch(signInWithGoogleAsync(idToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="outline"
      className="!p-6 border shadow-none rounded-full"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle />
      Continue with Google
    </Button>
  );
};

export default OAuthButton;
