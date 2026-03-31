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
        { duration: "30s", target: 10 },   // Warm up
        { duration: "1m", target: 30 },    // Ramp to moderate load
        { duration: "1m", target: 50 },    // Push higher
        { duration: "1m", target: 100 },   // Stress level
        { duration: "30s", target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_failed: ["rate<0.10"],      // Less than 10% failure under stress
        http_req_duration: ["p(95)<2000"],    // 95% under 2s
        http_req_duration: ["p(99)<3000"],    // 99% under 3s
        failed_requests: ["rate<0.10"],
    },
};

export default function () {
    let res = http.get(API_URL);

    let checkRes = check(res, {
        "is status 401": (r) => r.status === 401,
        "response time < 2000ms": (r) => r.timings.duration < 2000,
    });

    failRate.add(!checkRes);

    sleep(1);
}
