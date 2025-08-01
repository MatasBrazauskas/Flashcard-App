package com.example.demo.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // We must permit all preflight OPTIONS requests for CORS to work
        http.authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().permitAll()
        );

        // For a stateless API, CSRF is not required and can interfere with POST/PUT requests
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}