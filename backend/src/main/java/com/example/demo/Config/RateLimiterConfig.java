package com.example.demo.Config;

import com.example.demo.Middleware.RateLimiter.FixedWindowsCounter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RateLimiterConfig
{
    @Bean
    public FixedWindowsCounter fixedWindowsCounter()
    {
        return new FixedWindowsCounter();
    }
}