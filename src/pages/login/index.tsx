import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { loginWithCredentials, getUser } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const user = getUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loggedUser = loginWithCredentials(username, password);

    if (!loggedUser) {
      setError("Invalid username or password");
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            className="w-full mt-1 p-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          Login
        </button>

        <div className="text-xs text-gray-500 text-center mt-2">
          <p>admin / admin123</p>
          <p>employee / emp123</p>
        </div>
      </form>
    </div>
  );
};

export default Login;