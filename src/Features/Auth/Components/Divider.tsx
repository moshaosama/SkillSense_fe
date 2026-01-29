const Divider = ({ text }: { text: string }) => (
  <div className="flex items-center my-4">
    <hr className="flex-1 h-0.5 bg-gray-200 border-0" />
    <span className="mx-3 text-xs sm:text-sm font-semibold text-gray-400">
      {text}
    </span>
    <hr className="flex-1 h-0.5 bg-gray-200 border-0" />
  </div>
);

export default Divider;
