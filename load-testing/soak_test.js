import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '2m', target: 150 },
        { duration: '30s', target: 200 },
        { duration: '1m', target: 200 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        'http_req_duration': ['p(90)<1000', 'p(95)<1500'],
        'http_req_failed': ['rate<0.1'],
    },
};

export default function () {
    const loginRes = http.post('http://localhost:8080/login', JSON.stringify({ ... }));
    check(loginRes, { 'login successful': (resp) => resp.status === 200 });

    http.get('http://localhost:8080/login');
    sleep(1);

    http.batch([
        ['GET', 'http://localhost:8080/login'],
        ['GET', 'http://localhost:8080/login']
    ]);
    sleep(1);
}