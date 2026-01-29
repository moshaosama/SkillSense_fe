import LoginForm from "../Features/Auth/index";

const Login = () => {
  return (
    <div>
      <LoginForm
        isBrand={true}
        title="Welcome back"
        description="Log in to your professional account"
        isSignUp={false}
      />
    </div>
  );
};

export default Login;
