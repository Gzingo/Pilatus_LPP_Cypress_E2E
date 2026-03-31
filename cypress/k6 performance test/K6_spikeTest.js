import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import { parse } from "dotenv";
import { readFileSync } from "fs";

const envConfig = parse(readFileSync('.env'));
const API_URL = envConfig.K6_API_URL;

const failRate = new Rate("failed_requests");

export let options = {
    stages: [
        { duration: "10s", target: 1 },   // Baseline with 1 user
        { duration: "10s", target: 50 },   // Spike to 50 users
        { duration: "30s", target: 50 },   // Hold spike for 30 seconds
        { duration: "10s", target: 1 },    // Drop back to 1 user
        { duration: "30s", target: 1 },    // Recovery period
    ],
    thresholds: {
        http_req_failed: ["rate<0.05"],      // Less than 5% failure during spike
        http_req_duration: ["p(95)<1000"],    // 95% under 1s (relaxed for spike)
        failed_requests: ["rate<0.05"],
    },
};

export default function () {
    let res = http.get(API_URL);

    let checkRes = check(res, {
        "is status 401": (r) => r.status === 401,
        "response time < 1000ms": (r) => r.timings.duration < 1000,
    });

    failRate.add(!checkRes);

    sleep(0.5);
}
