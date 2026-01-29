import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SupportForm {
  name: string;
  email: string;
  issue: string;
}

const ITSupport: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SupportForm>({
    name: "",
    email: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST to backend endpoint e.g. /support/ticket
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">IT Support</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          If you cannot remember your password or are unable to log in, please
          fill in the form below and our IT team will assist you.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Staff Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="staff@medilink.com"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Issue Description
              </label>
              <textarea
                name="issue"
                required
                rows={4}
                value={form.issue}
                onChange={handleChange}
                placeholder="I forgot my password and cannot access the system."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit Support Request
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              Your support request has been submitted. An IT staff member will
              contact you shortly.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ITSupport;