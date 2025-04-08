import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

const LoginButton = () => {
  const clientId = "763857549070-ega46aucoupumeck0napcfml95arkrbd.apps.googleusercontent.com"; // 🔁 실제 Google Client ID로 교체
  const redirectUri = 'http://localhost:5173'; // 프론트 개발 주소
  const scope = 'openid email profile';
  const responseType = 'id_token';
  const nonce = Math.random().toString(36).substring(2);

  const handleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&nonce=${nonce}&prompt=select_account`;
    window.location.href = url;
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      color="inherit"
      onClick={handleLogin}
      startIcon={<FcGoogle size={20} />}
      sx={{ textTransform: 'none' }}
    >
      Google로 로그인
    </Button>
  );
};

export default LoginButton;
