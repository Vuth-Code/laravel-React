import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          404 - Page Not Found
        </h2>
        <p className="mb-6 text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-200 block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
