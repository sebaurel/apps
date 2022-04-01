package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Aliment;

@Repository
public interface AlimentRepo extends JpaRepository<Aliment, Long>{

	Aliment findOneById(Long id);
}
