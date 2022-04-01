package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Categorie;

@Repository
public interface CategorieRepo extends JpaRepository<Categorie, Long> {

	Categorie findOneById(long id);
}
