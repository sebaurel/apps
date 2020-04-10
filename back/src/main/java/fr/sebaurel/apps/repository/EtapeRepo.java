package fr.sebaurel.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Etape;

@Repository
public interface EtapeRepo extends JpaRepository<Etape, Long>{

	Etape findOneById(Long id);
}
