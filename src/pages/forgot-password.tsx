import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your staff email address and we will send you instructions to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Staff Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@medilink.com"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              If an account exists for this email, a reset link has been sent.
            </p>

            <button
              onClick={() => navigate("/Login")}
              className="text-blue-600 hover:underline"
            >

                <Link
                 to="/Login"
                 className="mt-4 inline-block text-blue-600 hover:underline"
                ></Link>

              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

