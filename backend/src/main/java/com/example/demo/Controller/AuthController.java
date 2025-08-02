package com.example.demo.Controller;

import com.example.demo.DTOs.Auth.AuthRequest;
import com.example.demo.DTOs.Auth.AuthResponse;
import com.example.demo.Utils.Routes;
import com.example.demo.Validation.JWTUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.Authenticator;

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
    public ResponseEntity<AuthResponse> generateToken(@RequestBody AuthRequest authRequest)
    {
        var token = jwtUtils.generateToken(authRequest.getName());
        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.CREATED);
    }
}
