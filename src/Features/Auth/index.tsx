import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Inputs from "./Components/Inputs";
import SocialButton from "./Components/SocialBtns";
import Divider from "./Components/Divider";

const Index = ({
  isBrand,
  title,
  description,
  isSignUp,
}: {
  isBrand: boolean;
  title: string;
  description: string;
  isSignUp: boolean;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
      <div className="w-full">
        {isBrand ? (
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src="logo.png"
              alt="logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
            />
            <h1 className="text-(--main-color) font-bold text-xl sm:text-2xl -mt-2">
              SkillSense
            </h1>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full px-4 sm:px-10 py-3 flex items-center justify-between">
            <img
              src="logo.png"
              alt="Logo"
              className="w-14 h-14 sm:w-20 sm:h-20 object-cover"
            />
            <Link to="/">
              <span className="text-sm sm:text-md font-semibold text-gray-700">
                Back to homepage
              </span>
            </Link>
          </div>
        )}

        <div className="mx-auto bg-white rounded-xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-center">{title}</h1>
          <p className="text-gray-400 text-sm sm:text-lg font-semibold text-center mt-1">
            {description}
          </p>

          {isSignUp ? (
            <div className="flex flex-col sm:flex-row gap-3 my-6">
              <SocialButton icon={<FcGoogle size={20} />} text="Google" />
              <SocialButton icon={<Github size={20} />} text="Github" />
            </div>
          ) : (
            <div className="flex flex-col gap-3 my-6">
              <SocialButton
                icon={<FcGoogle size={20} />}
                text="Continue with Google"
              />
              <SocialButton
                icon={<Github size={20} />}
                text="Continue with Github"
              />
            </div>
          )}

          <Divider
            text={isSignUp ? "OR CONTINUE WITH EMAIL" : "OR EMAIL LOGIN"}
          />

          <form className="w-full">
            {isSignUp && (
              <Inputs label="Full Name" placeholder="Name" type="text" />
            )}

            <Inputs
              label="Email Address"
              placeholder="name@gmail.com"
              type="email"
            />

            <Inputs
              label="Password"
              placeholder="Enter Password"
              type="password"
            />

            <button className="btn-main w-full mt-6">
              {isSignUp ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm sm:text-base">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-(--main-color) font-bold">Login</span>
                </Link>
              </>
            ) : (
              <>
                New here?{" "}
                <Link to="/signup">
                  <span className="text-(--main-color) font-bold">
                    Create an account
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
