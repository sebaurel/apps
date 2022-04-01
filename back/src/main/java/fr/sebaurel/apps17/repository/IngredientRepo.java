package fr.sebaurel.apps17.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Aliment;
import fr.sebaurel.apps17.model.Ingredient;

@Repository
public interface IngredientRepo extends JpaRepository<Ingredient, Long>{
	
	Ingredient findOneById(Long id);
	List<Ingredient> findAllByAliment(Aliment aliment);
}
