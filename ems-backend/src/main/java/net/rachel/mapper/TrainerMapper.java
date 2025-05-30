package net.rachel.mapper;

import net.rachel.dto.TrainerDto;
import net.rachel.entity.Trainer;
import net.rachel.entity.User;

public class TrainerMapper {
    public static TrainerDto mapToTrainerDto(Trainer trainer) {
        if (trainer == null) {
            return null;
        }

        Long userId = null;
        if (trainer.getUser() != null) {
            userId = trainer.getUser().getId();
        }

        return new TrainerDto(
            trainer.getId(),
            trainer.getFirstName(),
            trainer.getLastName(),
            trainer.getEmail(),
            trainer.getRegion(),
            userId
        );
    }

    public static Trainer mapToTrainer(TrainerDto trainerDto) {
        if (trainerDto == null) {
            return null;
        }

        Trainer trainer = new Trainer();
        trainer.setId(trainerDto.getId());
        trainer.setFirstName(trainerDto.getFirstName());
        trainer.setLastName(trainerDto.getLastName());
        trainer.setEmail(trainerDto.getEmail());
        trainer.setRegion(trainerDto.getRegion());

        // 只设置User的id，完整User对象需要在Service层或DAO层加载
        if (trainerDto.getUserId() != null) {
            User user = new User();
            user.setId(trainerDto.getUserId());
            trainer.setUser(user);
        } else {
            trainer.setUser(null);
        }

        return trainer;

    }
}
