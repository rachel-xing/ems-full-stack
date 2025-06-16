package net.rachel.mapper;

import net.rachel.dto.UserDto;
import net.rachel.entity.User;

public class UserMapper {
   public static UserDto mapToUserDto(User user) {
       UserDto dto = new UserDto();
       dto.setUsername(user.getUsername());
       dto.setRoles(user.getRoles());
       return dto;
    }
}
