package com.example.demo.Controller;

import com.example.demo.DTOs.AuthRequest;
import com.example.demo.DTOs.AuthResponse;
import com.example.demo.Utils.Routes;
import com.example.demo.Validation.JWTUtils;
import jakarta.validation.Valid;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Routes.AuthRouter.AUTH_ROUTE)
public class AuthController
{
    private final JWTUtils jwtUtils;

    public AuthController(JWTUtils jwtUtils)
    {
        this.jwtUtils = jwtUtils;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> generateToken(@RequestBody @Valid AuthRequest authRequest)
    {
        final var token = jwtUtils.generateToken(authRequest.getName());
        final var authResponse = new AuthResponse(token);
        return ResponseEntity.ok().body(authResponse);
    }
}
