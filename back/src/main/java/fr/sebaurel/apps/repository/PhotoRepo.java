package fr.sebaurel.apps.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Photo;

@Repository
public interface PhotoRepo extends JpaRepository<Photo, Long> {

	Photo findById(long id);
	List<Photo> findAllByValidAndDateBefore(boolean valid, Date date);
}
