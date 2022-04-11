package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Etape;

@Repository
public interface EtapeRepo extends JpaRepository<Etape, Long>{

	Etape findOneById(long id);
}
