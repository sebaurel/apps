package fr.sebaurel.apps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Ingredient;

@Repository
public interface IngredientRepo extends JpaRepository<Ingredient, Long>{
	
	Ingredient findOneById(Long id);
	List<Ingredient> findAllByAliment(Aliment aliment);
}
