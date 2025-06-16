package net.rachel.controller;

import java.util.Set;
import net.rachel.dto.LoginRequest;
import net.rachel.dto.LoginResponse;
import net.rachel.dto.UserDto;
import net.rachel.entity.Role;
import net.rachel.entity.User;
import net.rachel.mapper.UserMapper;
import net.rachel.repository.UserRepository;
import net.rachel.service.UserService;
import net.rachel.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Trying log in: " + loginRequest.getUsername());

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
            String username = userDetails.getUsername();
            Set<Role> roles = user.getRoles();

            System.out.println("Log in success: " + userDetails.getUsername());
            return ResponseEntity.ok(new LoginResponse(jwt, username,roles));

        } catch (Exception e) {
            System.out.println("Log in failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid username or password: " + e.getMessage());
        }
    }
}