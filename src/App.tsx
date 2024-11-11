import logoo from '../utils/logoo.gif';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons' 
import {useHandleClicks} from '../hooks/useHandleClicks'

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {handlePasswordChange,handleUsernameChange,error,onLoginClick,username,password} = useHandleClicks();

  const onLogin = (e: any) => {
    onLoginClick(e, navigate, username, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', minHeight: '100vh',  width: '100vw' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', height: '94%', width: '97%', textAlign: 'center', }}>
        <img
          src={logoo}
          alt="logo"
          style={{
            alignSelf: 'center',
            width: '350px',
            height: 'auto',
            marginBottom: '-360px',
            marginTop: '-20px',
            marginInlineStart: '-25px',
  }}
/>

        <h2 style={{ marginTop: '310px', marginBottom: '-5px', color: 'black', marginInlineStart: '-12px' }}>LOGIN</h2>
        <form onSubmit={onLogin} style={{ margin: '10px 0' }}>
          <div style={{ textAlign: 'left', marginBottom: '7px' }}>
            <label style={{ fontSize: 14, display: 'block', marginBottom: '1px', color:'black', marginInlineStart: '592px' }}>Username:</label>
            <input
              type="text"
              name="username"
              style={{
                width: '275px',
                padding: '8px',
                backgroundColor: '#F08080',
                border: 'none',
                borderRadius: '10px',
                marginInlineStart: '590px',
              }}


              onChange={(e) => handleUsernameChange(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'left', marginBottom: '30px', }}>
            <label style={{ fontSize: 14, display: 'block', marginBottom: '1px', color: 'black', marginInlineStart: '592px' }}>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                style={{
                  width: '275px',
                  padding: '8px',
                  backgroundColor: '#F08080',
                  border: 'none',
                  borderRadius: '10px',
                  marginInlineStart: '590px'
                }}


                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}  style={{ color: 'black', marginInline: '600px' }} />
              </span>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '20px', marginTop: '-30px', fontSize: 13, marginInlineStart: '-14px' }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: '290px',
              padding: '10px',
              backgroundColor: 'maroon',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: 16,
              marginBottom: '30px',
              marginInlineStart: '-10px'
            }}
            onClick={onLogin}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}