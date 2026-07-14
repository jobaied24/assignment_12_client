
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-[#12ADDE]/10 flex items-center justify-center">
          <FaLock className="text-5xl text-[#12ADDE]" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-[#2B87F0] mt-6">
          403
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-bold text-secondary mt-3">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 leading-relaxed">
          Sorry, you don't have permission to access this page.
          Please contact an administrator if you believe this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#12ADDE] hover:bg-[#0d98c3] text-white font-semibold transition-all duration-300"
          >
            <FaArrowLeft />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;