package fr.sebaurel.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Unite;

@Repository
public interface UniteRepo extends JpaRepository<Unite, Long> {
	
	Unite findOneById(Long id);
}
