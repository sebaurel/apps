package fr.sebaurel.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Categorie;

@Repository
public interface CategorieRepo extends JpaRepository<Categorie, Long> {

	Categorie findOneById(long id);
}
