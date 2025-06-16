package net.rachel.config;

import net.rachel.entity.Role;
import net.rachel.entity.User;
import net.rachel.entity.Permission;
import net.rachel.entity.Trainer;
import net.rachel.repository.UserRepository;
import net.rachel.repository.RoleRepository;
import net.rachel.repository.PermissionRepository;
import net.rachel.repository.TrainerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final TrainerRepository trainerRepository;

    public DataInitializer(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PermissionRepository permissionRepository,
                           TrainerRepository trainerRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.trainerRepository = trainerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // create permission
        if (permissionRepository.count() == 0) {
            Permission readPermission = new Permission();
            readPermission.setName("READ_TRAINER");
            permissionRepository.save(readPermission);

            Permission writePermission = new Permission();
            writePermission.setName("WRITE_TRAINER");
            permissionRepository.save(writePermission);

            Permission deletePermission = new Permission();
            deletePermission.setName("DELETE_TRAINER");
            permissionRepository.save(deletePermission);

        }

        // create role
        if (roleRepository.count() == 0) {
            Permission readPerm = permissionRepository.findByName("READ_TRAINER").orElse(null);
            Permission writePerm = permissionRepository.findByName("WRITE_TRAINER").orElse(null);
            Permission deletePerm = permissionRepository.findByName("DELETE_TRAINER").orElse(null);

            Role userRole = new Role();
            userRole.setName("USER");
            userRole.setPermissions(Set.of(readPerm));
            roleRepository.save(userRole);

            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setPermissions(Set.of(readPerm, writePerm, deletePerm));
            roleRepository.save(adminRole);
        }

        // create test user
        if (!userRepository.existsByUsername("admin")) {
            Role adminRole = roleRepository.findByName("ADMIN").orElse(null);

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("password");
            admin.setEnabled(true);
            if (adminRole != null) {
                admin.setRoles(Set.of(adminRole));
            }
            userRepository.save(admin);

            Trainer adminTrainer = new Trainer();
            adminTrainer.setFirstName("Admin");
            adminTrainer.setLastName("User");
            adminTrainer.setEmail("admin@pokemon.com");
            adminTrainer.setRegion("Kanto");
            adminTrainer.setUser(admin);
            trainerRepository.save(adminTrainer);

            admin.setTrainer(adminTrainer);
            userRepository.save(admin);
        }

        if (!userRepository.existsByUsername("ash")) {
            Role userRole = roleRepository.findByName("USER").orElse(null);

            User user = new User();
            user.setUsername("ash");
            user.setPassword("pikachu");
            user.setEnabled(true);
            if (userRole != null) {
                user.setRoles(Set.of(userRole));
            }
            userRepository.save(user);

            Trainer ashTrainer = new Trainer();
            ashTrainer.setFirstName("Ash");
            ashTrainer.setLastName("Ketchum");
            ashTrainer.setEmail("ash@pokemon.com");
            ashTrainer.setRegion("Pallet Town");
            ashTrainer.setUser(user);
            trainerRepository.save(ashTrainer);

            user.setTrainer(ashTrainer);
            userRepository.save(user);
        }
    }
}