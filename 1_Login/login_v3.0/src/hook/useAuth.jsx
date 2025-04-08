import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    console.log("🟨 현재 URL hash:", hash);

    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const idToken = params.get('id_token');
    console.log("🟦 감지된 id_token:", idToken);

    if (idToken) {
      try {
        const decoded = jwtDecode(idToken);
        console.log("🟩 디코딩된 사용자:", decoded);

        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));

        fetch('http://localhost:8080/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken })
        })
          .then((res) => {
            console.log("📡 백엔드 응답코드:", res.status);
            return res.json();
          })
          .then((data) => {
            console.log("🟢 JWT 저장:", data.token);
            localStorage.setItem('jwt', data.token);
            navigate('/dashboard');
          })
          .catch(err => {
            console.error("❌ fetch 실패:", err);
          });

        // 👉 해시 제거는 가장 마지막에 해!
        window.history.replaceState(null, '', window.location.pathname);

      } catch (err) {
        console.error("❌ jwtDecode 실패:", err);
      }
    } else {
      const stored = localStorage.getItem('user');
      if (stored) {
        console.log("📦 localStorage에서 복원:", stored);
        setUser(JSON.parse(stored));
      } else {
        console.log("🕳 로그인 정보 없음");
      }
    }
  }, [navigate]);

  return user;
};

export default useAuth;
