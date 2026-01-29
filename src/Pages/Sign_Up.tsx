import SignUpForm from "../Features/Auth/index";

const Sign_Up = () => {
  return (
    <div>
      <SignUpForm
        isBrand={false}
        title="Create your account"
        description="Join 10,000+ tech professionals"
        isSignUp={true}
      />
    </div>
  );
};

export default Sign_Up;
