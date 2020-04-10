package fr.sebaurel.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Aliment;

@Repository
public interface AlimentRepo extends JpaRepository<Aliment, Long>{

	Aliment findOneById(Long id);
}
