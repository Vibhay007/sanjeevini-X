import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { registerUser, loginUser } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      if (state === "Sign Up") {
        const { data } = await registerUser({ name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await loginUser({ email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Navigate to home (or profile) after successful auth
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-dark-border bg-dark-card rounded-xl text-dark-muted text-sm shadow-xl">
        <p className="text-2xl font-semibold text-dark-text">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-dark-border bg-dark-surface rounded w-full p-2 mt-1 text-dark-text focus:outline-none focus:ring-1 focus:ring-primary"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-dark-border bg-dark-surface rounded w-full p-2 mt-1 text-dark-text focus:outline-none focus:ring-1 focus:ring-primary"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-dark-border bg-dark-surface rounded w-full p-2 mt-1 text-dark-text focus:outline-none focus:ring-1 focus:ring-primary"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-gradient-to-r from-sky-600 to-teal-500 disabled:opacity-60 text-white w-full py-2 rounded-md text-base flex items-center justify-center gap-2 hover:from-sky-500 hover:to-teal-400 transition-all"
        >
          {submitting && (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {submitting
            ? state === "Sign Up" ? "Creating..." : "Logging in..."
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
