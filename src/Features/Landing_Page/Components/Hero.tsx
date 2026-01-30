import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="my-16 sm:my-20 px-4 sm:px-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      {/* Text Section */}
      <div className="flex flex-col gap-6 lg:gap-8 max-w-full lg:max-w-xl text-center lg:text-left">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Analyze, Improve and Generate Your CV with AI
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400">
          Unlock your career potential with our ATS-optimized analyzer and
          instant portfolio generator designed for tech professionals
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
          <Link
            to={"/upload-cv"}
            className="py-3 btn-main sm:py-4 px-6 sm:px-8 text-base sm:text-lg"
          >
            <button className="btn-main py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg">
              Analyze your CV
            </button>
          </Link>
          <button className="py-3 sm:py-4 px-6 sm:px-8 bg-white border font-semibold border-gray-200 rounded-xl text-base sm:text-lg">
            View Samples
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-auto flex justify-center">
        <img
          src="dashboard.png"
          alt="dashboard"
          loading="lazy"
          className="w-full max-w-md lg:max-w-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
