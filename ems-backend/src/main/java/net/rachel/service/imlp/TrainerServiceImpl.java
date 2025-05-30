package net.rachel.service.imlp;

import java.util.List;
import java.util.stream.Collectors;
import net.rachel.dto.TrainerDto;
import net.rachel.entity.Trainer;
import net.rachel.exception.ResourceNotFoundException;
import net.rachel.mapper.TrainerMapper;
import net.rachel.repository.TrainerRepository;
import net.rachel.service.TrainerService;
import org.springframework.stereotype.Service;

@Service

public class TrainerServiceImpl implements TrainerService {
    private TrainerRepository trainerRepository;

    public TrainerServiceImpl(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    @Override
    public TrainerDto getTrainerById(Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
            .orElseThrow(()-> new ResourceNotFoundException("Trainer does not exist with given ID: " + trainerId));
        return TrainerMapper.mapToTrainerDto(trainer);
    }

    @Override
    public List<TrainerDto> getAllTrainers() {
        List<Trainer> trainers = trainerRepository.findAll();
        return trainers.stream().map( trainer -> TrainerMapper.mapToTrainerDto(trainer))
            .collect(Collectors.toList());
    }

    @Override
    public TrainerDto createTrainer(TrainerDto trainerDto) {
        Trainer trainer = TrainerMapper.mapToTrainer(trainerDto);
        Trainer savedTrainer = trainerRepository.save(trainer);

        return TrainerMapper.mapToTrainerDto(savedTrainer);
    }

    @Override
    public TrainerDto updateTrainerById(Long trainerId, TrainerDto updatedTrainerDto) {
        Trainer existingTrainer = trainerRepository.findById(trainerId)
            .orElseThrow(()-> new ResourceNotFoundException("Trainer does not exist with given ID: " + trainerId));

        existingTrainer.setFirstName(updatedTrainerDto.getFirstName());
        existingTrainer.setLastName(updatedTrainerDto.getLastName());
        existingTrainer.setEmail(updatedTrainerDto.getEmail());
        existingTrainer.setRegion(updatedTrainerDto.getRegion());

        Trainer updatedTrainer =  trainerRepository.save(existingTrainer);
        return TrainerMapper.mapToTrainerDto(updatedTrainer);
    }

    @Override
    public void deleteTrainerById(Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
            .orElseThrow(() -> new ResourceNotFoundException("Trainer does not exist with given ID: " + trainerId));
        trainerRepository.deleteById(trainerId);
    }
}
