// useAuth.js
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ default 대신 중괄호로 가져오기

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const idToken = params.get('id_token');

    if (idToken) {
        const decoded = jwtDecode(idToken); // ✅ 함수 이름도 변경
        setUser(decoded);

      // 선택사항: 로컬스토리지 저장
      localStorage.setItem('user', JSON.stringify(decoded));

      // 해시 제거
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return user;
};
