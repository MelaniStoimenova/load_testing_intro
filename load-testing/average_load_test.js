import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    average_load: {
      executor: 'shared-iterations',
      vus: 50,
      iterations: 500,
      maxDuration: '10m',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.01'],
  },
};

export default function () {

  const loginRes = http.post('http://localhost:8080/login', JSON.stringify());
  check(loginRes, { 'login successful': (resp) => resp.status === 200 });

  http.get('http://localhost:8080/login');
  sleep(1);

  http.get('http://localhost:8080/login');
  sleep(2);

}