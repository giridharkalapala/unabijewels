import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(formData.email, formData.password);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>UNabi Admin</h1>

        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁"}
            </button>

          </div>

          {error && (
            <p className="error">{error}</p>
          )}

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;