package net.rachel.repository;

import java.util.List;
import net.rachel.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TrainerRepository extends JpaRepository<Trainer,Long> {
    @Query("""
    SELECT t FROM Trainer t
    WHERE 
        t.firstName LIKE %:keyword% OR
        t.lastName LIKE %:keyword% OR
        t.email LIKE %:keyword% OR
        t.region LIKE %:keyword%
""")
    List<Trainer> searchByAllFields(@Param("keyword") String keyword);

}
