package net.rachel.dto;

import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.rachel.entity.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String username;
    private Set<Role> roles;
}
