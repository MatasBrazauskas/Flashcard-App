package com.example.demo.Controller;

import com.example.demo.DTOs.Auth.AuthRequest;
import com.example.demo.DTOs.Auth.AuthResponse;
import com.example.demo.Utils.Routes;
import com.example.demo.Validation.JWTUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.Authenticator;
import java.net.URI;

@RestController
@RequestMapping(Routes.AuthRouter.AUTH_ROUTE)
public class AuthController
{
    private final JWTUtils jwtUtils;
    private final ModelMapper mapper;

    public AuthController(JWTUtils jwtUtils, ModelMapper mapper)
    {
        this.jwtUtils = jwtUtils;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> generateToken(@RequestBody AuthRequest authRequest)
    {
        final var token = jwtUtils.generateToken(authRequest.getName());

        final var authResponse = mapper.map(authRequest, AuthResponse.class);
        final URI location =  ServletUriComponentsBuilder.fromCurrentRequest().path("").buildAndExpand(token).toUri();
        return ResponseEntity.created(location).body(authResponse);
    }
}
