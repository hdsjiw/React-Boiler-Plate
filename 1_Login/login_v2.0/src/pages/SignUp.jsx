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

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [emailChecked, setEmailChecked] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'email') {
      setEmailChecked(false) // 이메일 수정 시 중복 체크 다시 해야 함
    }
  }

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*]/.test(password)
    return password.length >= 6 && hasLetter && hasNumber && hasSpecial
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = '이름을 입력해주세요.'
    if (!form.email) newErrors.email = '이메일을 입력해주세요.'
    else if (!emailChecked) newErrors.email = '이메일 중복 확인이 필요합니다.'
    if (!form.password) newErrors.password = '비밀번호를 입력해주세요.'
    else if (!validatePassword(form.password))
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 6자 이상이어야 합니다.'
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkEmailDuplication = async () => {
    if (!form.email) return
    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(form.email)}`)
      const data = await response.json()

      if (data.exists) {
        setErrors((prev) => ({ ...prev, email: '이미 사용 중인 이메일입니다.' }))
        setEmailChecked(false)
      } else {
        setErrors((prev) => ({ ...prev, email: '' }))
        setEmailChecked(true)
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: '이메일 확인 중 오류가 발생했습니다.' }))
      setEmailChecked(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('회원가입에 실패했습니다.')

      alert('회원가입 성공! 이제 로그인해주세요.')
      window.location.href = '/login'

    } catch (error) {
      alert(error.message)
    }
  }

  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="이름"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="이메일"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={checkEmailDuplication}
            fullWidth
            error={!!errors.email}
            helperText={errors.email || (emailChecked && '사용 가능한 이메일입니다.')}
          />
          <TextField
            label="비밀번호"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="비밀번호 확인"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                회원가입
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={() => window.location.href = '/login'}>
                로그인
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}
