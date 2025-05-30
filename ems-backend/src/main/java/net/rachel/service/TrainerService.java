package net.rachel.service;

import java.util.List;
import net.rachel.dto.TrainerDto;

public interface TrainerService {
    TrainerDto createTrainer(TrainerDto trainerDto);
    TrainerDto getTrainerById(Long trainerId);
    List<TrainerDto> getAllTrainers();
    TrainerDto updateTrainerById(Long trainerId,TrainerDto updatedTrainerDto);
    void deleteTrainerById(Long trainerId);
}
