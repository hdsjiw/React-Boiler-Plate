// src/pages/Dashboard.jsx
import { Typography, Container } from '@mui/material';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <Typography variant="h4" mt={5}>🎉 로그인 성공</Typography>
      <Typography variant="body1" mt={2}>🙋‍♂️ {user?.name} ({user?.email})</Typography>

      
    </Container>
  );
}
