package com.example.gameauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.security.MessageDigest;
import java.util.Base64;

@SpringBootApplication
@RestController
@RequestMapping("/api/auth")
public class GameAuthApplication {

    private final UserRepository userRepository;

    public GameAuthApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(GameAuthApplication.class, args);
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        if (userRepository.existsById(user.getUsername())) {
            return "Username already exists";
        }
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findById(user.getUsername()).orElse(null);
        if (existingUser == null) {
            return "User not found";
        }
        if (!existingUser.getPassword().equals(hashPassword(user.getPassword()))) {
            return "Invalid password";
        }
        return "Login successful";
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}

@Entity
class User {
    @Id
    private String username;
    private String password;

    // Getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

@Repository
interface UserRepository extends JpaRepository<User, String> {
}
