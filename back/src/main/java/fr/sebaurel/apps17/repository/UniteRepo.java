package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Unite;

@Repository
public interface UniteRepo extends JpaRepository<Unite, Long> {
	
	Unite findOneById(Long id);
}
