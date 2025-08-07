package com.example.demo.Middleware.RateLimiter;

import com.example.demo.Exceptions.Exceptions;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;

@Component
@AllArgsConstructor
public class RateLimiterFilter extends OncePerRequestFilter
{
    private final FixedWindowsCounter rateLimiter;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {
        /*Enumeration<String> headerNames = request.getHeaderNames();

        while (headerNames.hasMoreElements()) {
            String header = headerNames.nextElement();
            System.out.println(header + ": " + request.getHeader(header));
        }

        String authHeader = request.getHeader("authorization");
        final String name = authHeader.substring(7);*/

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        final var name = authentication.getName();

        System.out.println(name);

        if(!rateLimiter.isAllowed(name))
        {
            throw new Exceptions.RateLimitExceededException("Rate Limit Exceeded");
        }
        filterChain.doFilter(request, response);
    }
}
