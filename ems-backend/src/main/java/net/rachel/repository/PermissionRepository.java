package net.rachel.repository;
import java.util.Optional;
import net.rachel.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import net.rachel.entity.Trainer;

public interface PermissionRepository extends JpaRepository<Permission,Long>{
    Optional<Permission> findByName(String name);
}
