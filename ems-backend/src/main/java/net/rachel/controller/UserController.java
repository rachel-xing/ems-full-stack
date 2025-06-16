package net.rachel.controller;


import java.util.Optional;
import net.rachel.dto.UserDto;
import net.rachel.entity.User;
import net.rachel.mapper.UserMapper;
import net.rachel.repository.UserRepository;
import net.rachel.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getByUsername(@PathVariable("username") String username ){
        return userRepository.findByUsername(username)
            .map(UserMapper::mapToUserDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

}
