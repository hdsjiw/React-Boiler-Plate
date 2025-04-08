import { useEffect, useState } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true); // 로딩 시작
    const idToken = response.credential;
    console.log('✅ 받은 idToken:', idToken);

    try {
      const res = await axios.post('http://localhost:8080/auth/login/google', { idToken });

      const { token, user } = res.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('✅ 로그인 성공:', res.data); // 로그인 성공 메시지

      // 로그인 성공 시 isLoggedIn 상태를 true로 설정
      setIsLoggedIn(true);

    } catch (err) {
      console.error('❌ 로그인 실패:', err);
      setError('로그인 실패. 다시 시도해 주세요.'); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 로그인 상태가 true일 경우 /dashboard로 이동
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard'); // 페이지 이동
    }
  }, [isLoggedIn, navigate]); // isLoggedIn이 변경될 때마다 실행

  return (
    <div>
      {loading && <CircularProgress />} {/* 로딩 중일 때 표시 */}
      {error && <Alert severity="error">{error}</Alert>} {/* 에러 메시지 표시 */}
      <div id="google-login-button" style={{ width: '100%' }} />
    </div>
  );
};

export default LoginButton;

