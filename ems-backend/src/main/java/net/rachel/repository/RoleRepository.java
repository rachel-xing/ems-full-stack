package net.rachel.repository;
import java.util.Optional;
import net.rachel.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role,Long>{
    Optional<Role> findByName(String name);
}
