import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Grid
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import LoginButton from '../components/LoginButton' // 👈 Google 로그인 버튼 import

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })

  const navigate = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const validate = () => {
    const newErrors = { email: '', password: '' }

    if (!email) newErrors.email = '이메일을 입력해주세요.'
    if (!password) newErrors.password = '비밀번호를 입력해주세요.'
    else if (password.length < 6) newErrors.password = '6자 이상 입력해주세요.'

    setErrors(newErrors)
    return Object.values(newErrors).every((e) => e === '')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!validate()) return

    console.log('로그인 시도:', { email, password })
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          로그인
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="비밀번호"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                로그인
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleSignup}>
                회원가입
              </Button>
            </Grid>
            <Grid item xs={12}>
              {/* ✅ 구글 로그인 버튼 삽입 */}
              <LoginButton />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}