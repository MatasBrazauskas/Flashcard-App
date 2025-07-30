package com.example.demo.Config;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimiter {

    private static class RequestInfo {
        long timestamp;
        int count;

        RequestInfo(long timestamp, int count) {
            this.timestamp = timestamp;
            this.count = count;
        }
    }

    private final int MAX_REQUESTS = 5;
    private final long TIME_WINDOW_MS = 60_000;

    private final Map<String, RequestInfo> requestMap = new ConcurrentHashMap<>();

    public boolean isAllowed(String clientId) {
        long now = Instant.now().toEpochMilli();

        requestMap.compute(clientId, (key, info) -> {
            if (info == null || now - info.timestamp > TIME_WINDOW_MS) {
                return new RequestInfo(now, 1); // New window
            }

            if (info.count < MAX_REQUESTS) {
                info.count++;
                return info;
            }
            return info;
        });

        RequestInfo info = requestMap.get(clientId);
        return info.count <= MAX_REQUESTS;
    }
}

