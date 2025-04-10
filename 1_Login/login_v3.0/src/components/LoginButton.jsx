import { useEffect, useState } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!window.google || !window.google.accounts) {
      console.error('Google API not loaded');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    const idToken = response.credential;

    try {
      const res = await axios.post('http://localhost:8080/auth/login/google', { idToken });
      const { token } = res.data;

      localStorage.setItem('jwt', token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('❌ 로그인 실패:', err);
      setError('로그인 실패. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <div id="google-login-button" style={{ width: '100%' }} />
    </div>
  );
};

export default LoginButton;


