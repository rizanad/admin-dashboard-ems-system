import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white px-4">
      
      <div className="text-center max-w-lg">
        
        
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-72 h-72 bg-emerald-500 opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-emerald-400 drop-shadow-lg">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-emerald-200 mt-3">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded-lg shadow-lg transition duration-300">
            Go Back Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default NotFound;