import {
  Box, Button, Container, TextField, Typography, Paper,
  IconButton, InputAdornment, Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginButton from '../components/LoginButton';
import useAuth from '../hook/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const user = useAuth(); // ✅ 로그인 여부 확인

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || password.length < 6) return;
    console.log('일반 로그인 시도:', { email, password });
  };

  const handleSignup = () => navigate('/signup');

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>로그인</Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button type="submit" fullWidth variant="contained">로그인</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={handleSignup}>회원가입</Button>
            </Grid>
            <Grid item xs={12}>
              <LoginButton />
            </Grid>
          </Grid>

          {user && (
            <Box mt={4}>
              <Typography variant="body1">✅ 로그인 성공</Typography>
              <Typography>🙋‍♂️ {user.name} ({user.email})</Typography>
            </Box>
          )}

          
        </Box>
      </Paper>
    </Container>
  );
}
