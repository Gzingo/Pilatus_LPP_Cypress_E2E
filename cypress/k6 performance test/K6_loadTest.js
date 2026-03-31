import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate } from "k6/metrics";
import { parse } from "dotenv";
import { readFileSync } from "fs";

const envConfig = parse(readFileSync('.env'));
const API_URL = envConfig.K6_API_URL;

const failRate = new Rate("failed_requests");

const ENDPOINTS = [
    { name: "Main API", path: "/api/eap" },
    { name: "Test Recordings", path: "/api/eap/test-recordings" },
    { name: "OWL API", path: "/owl/api/open-work-list" },
];

export let options = {
    stages: [
        { duration: "1m", target: 10 },  // Ramp up to 10 users over 1 minute
        { duration: "30s", target: 10 }, // Stay at 10 users for 30 seconds
        { duration: "30s", target: 0 },  // Ramp down to 0 users over 30 seconds
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"],    // Less than 1% of http requests should fail
        http_req_duration: ["p(95)<500"],  // 95% of response times must be below 500ms
        failed_requests: ["rate<0.01"],    // Less than 1% of requests should fail
    },
};

export default function () {
    for (const endpoint of ENDPOINTS) {
        group(endpoint.name, () => {
            let res = http.get(`${API_URL}${endpoint.path}`);

            let checkRes = check(res, {
                [`${endpoint.name} — is status 401`]: (r) => r.status === 401,
                [`${endpoint.name} — response time < 500ms`]: (r) => r.timings.duration < 500,
            });

            failRate.add(!checkRes);
        });
    }

    sleep(1);
}
