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
import { FcGoogle } from 'react-icons/fc';


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
    navigate('/signup') // 👉 회원가입 페이지로 이동
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
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                href="http://localhost:8080/oauth2/authorization/google"
                component="a"
                startIcon={<FcGoogle size={20} />} // ✅ 아이콘 추가
                sx={{ textTransform: 'none' }} // 구글 스타일에 맞게 대소문자 유지
              >
                Google로 로그인
              </Button>
          </Grid>
            
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}
