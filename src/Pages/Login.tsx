import LoginForm from "../Features/Auth/index";

const Login = () => {
  return (
    <LoginForm
      title="Welcome back"
      description="Log in to your professional account"
      isSignUp={false}
    />
  );
};

export default Login;
