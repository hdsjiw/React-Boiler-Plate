import { Button, Container, Typography } from '@mui/material'

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        대시보드
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        여기에 로그인한 사용자 정보나 기능을 표시할 수 있어요.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        로그아웃
      </Button>
    </Container>
  )
}
