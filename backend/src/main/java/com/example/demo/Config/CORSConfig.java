package com.example.demo.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all paths ("/**") in your API
                .allowedOrigins(
                        "http://localhost:5173", // The common port for Vite
                        "http://localhost:3000"  // The common port for create-react-app
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed headers for the actual request
                .allowCredentials(true) // Allow sending of cookies, authorization headers, etc.
                .maxAge(3600); // How long the preflight request (OPTIONS) can be cached in seconds
    }
}