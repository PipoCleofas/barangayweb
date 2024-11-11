import logoo from '../utils/logoo.gif';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useHandleClicks } from '../hooks/useHandleClicks';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { handlePasswordChange, handleUsernameChange, error, onLoginClick, username, password } = useHandleClicks();

  const onLogin = (e) => {
    e.preventDefault();
    onLoginClick(e, navigate, username, password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoo} alt="logo" className="login-logo" />
        <h2 className="login-title">LOGIN</h2>
        <form onSubmit={onLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Username:</label>
            <input
              type="text"
              name="username"
              className="login-input"
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="login-input"
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
