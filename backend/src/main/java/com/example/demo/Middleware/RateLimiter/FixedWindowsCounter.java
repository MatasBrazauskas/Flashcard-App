package com.example.demo.Middleware.RateLimiter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Setter
@Getter
@Component
public class FixedWindowsCounter
{
    @AllArgsConstructor
    private static class RequestCounter
    {
        public long timestamp;
        public int count;
    }

    private final int maxRequestsPerSecond = 1;
    private final Map<String, RequestCounter> requestCounters = new ConcurrentHashMap<>();

    public boolean isAllowed(String name)
    {
        long currentTimestamp = System.currentTimeMillis() / 1000;

        requestCounters.compute(name, (key, counter) -> {
            if(counter == null || counter.timestamp != currentTimestamp)
            {
                return new RequestCounter(currentTimestamp, 1);
            }
            counter.count++;
            return counter;
        });

        return requestCounters.get(name).count <= maxRequestsPerSecond;
    }
}