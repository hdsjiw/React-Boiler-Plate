import { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        대시보드
      </Typography>

      {user ? (
        <>
          <Typography variant="body1" gutterBottom>
            👋 {user.name}님, 환영합니다!
          </Typography>
          <Typography variant="body2" gutterBottom>
            🆔 ID: {user.id}
          </Typography>
          <Typography variant="body2" gutterBottom>
            📧 이메일: {user.email}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="error">
          사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.
        </Typography>
      )}

      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 4 }}>
        로그아웃
      </Button>
    </Container>
  );
}
