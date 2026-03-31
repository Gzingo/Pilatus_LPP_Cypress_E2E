import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import { parse } from "dotenv";
import { readFileSync } from "fs";

const envConfig = parse(readFileSync('.env'));
const API_URL = envConfig.K6_API_URL;

const failRate = new Rate("failed_requests");
const responseTimeTrend = new Trend("response_time_trend");

export let options = {
    stages: [
        { duration: "30s", target: 10 },   // Ramp up
        { duration: "5m", target: 10 },    // Sustained load for 5 minutes
        { duration: "30s", target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"],      // Less than 1% failure over sustained period
        http_req_duration: ["p(95)<500"],     // 95% under 500ms
        http_req_duration: ["p(99)<1000"],    // 99% under 1s
        failed_requests: ["rate<0.01"],
        response_time_trend: ["p(95)<500"],   // Track for degradation over time
    },
};

export default function () {
    let res = http.get(API_URL);

    responseTimeTrend.add(res.timings.duration);

    let checkRes = check(res, {
        "is status 401": (r) => r.status === 401,
        "response time < 500ms": (r) => r.timings.duration < 500,
    });

    failRate.add(!checkRes);

    sleep(1);
}
