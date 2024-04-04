import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8080/login';
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(url, payload, params);

  check(loginRes, {
    'login successful': (resp) => resp.status === 200,
  });

  if (loginRes.status === 200) {
    const profileRes = http.get('http://localhost:8080/login');
    check(profileRes, { 'profile loaded': (resp) => resp.status === 200 });
  }
  sleep(1);
}