package net.rachel.controller;

import java.util.List;
import net.rachel.dto.TrainerDto;
import net.rachel.service.TrainerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/trainers")
//@AllArgsConstructor

public class TrainerController {
    private TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }


    // Build Get Trainer REST API
    // http://localhost:8080/api/trainers/1
    @GetMapping("/{id}")
    public ResponseEntity<TrainerDto> findTrainerById(@PathVariable("id") Long trainerId) {
        TrainerDto trainerDto = trainerService.getTrainerById(trainerId);
        return ResponseEntity.ok(trainerDto);
    }

    // Build Get All Trainers REST API
    // http://localhost:8080/api/trainers
    @GetMapping
    public ResponseEntity<List<TrainerDto>> getAllTrainers() {
        List<TrainerDto> trainers = trainerService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    // Build Create Trainer REST API
    // http://localhost:8080/api/trainers
    @PostMapping
    public ResponseEntity<TrainerDto> createTrainer(@RequestBody TrainerDto trainerDto) {
        TrainerDto savedTrainer = trainerService.createTrainer(trainerDto);
        return new ResponseEntity<>(savedTrainer, HttpStatus.CREATED);
    }

    // Build Update Trainer REST API
    // http://localhost:8080/api/trainers/1
    @PutMapping("/{id}")
    public ResponseEntity<TrainerDto> updateTrainerById(@PathVariable("id") Long trainerId, @RequestBody TrainerDto trainerDto) {
        TrainerDto updatedTrainerDto = trainerService.updateTrainerById(trainerId, trainerDto);
        return ResponseEntity.ok(updatedTrainerDto);
    }

    ;

    // Build Delete REST API
    // http://localhost:8080/api/trainers/1
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrainerById(@PathVariable("id") Long trainerId) {
        trainerService.deleteTrainerById(trainerId);
        return ResponseEntity.ok("Trainer deleted successfully!");
    }

    @GetMapping("/search")
    public ResponseEntity<List<TrainerDto>> searchTrainers(@RequestParam String q) {
        List<TrainerDto> results = trainerService.searchTrainers(q);
        return ResponseEntity.ok(results);
    }

}