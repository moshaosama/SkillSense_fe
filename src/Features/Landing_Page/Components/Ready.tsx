const Ready = () => {
  return (
    <div className="bg-blue-600 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        Ready to land your dream job?
      </h1>
      <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 max-w-full sm:max-w-xl px-2 sm:px-0">
        Join thousands of developers using AI CV to optimize their careers. Get
        started today for free.
      </p>
      <button className="bg-white cursor-pointer hover:bg-[#eee] transition-all duration-300 text-blue-600 font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base md:text-lg">
        Analyze My CV Now
      </button>
    </div>
  );
};

export default Ready;
