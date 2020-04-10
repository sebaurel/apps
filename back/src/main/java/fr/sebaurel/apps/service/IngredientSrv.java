package fr.sebaurel.apps.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Ingredient;
import fr.sebaurel.apps.repository.IngredientRepo;


@Service
public class IngredientSrv {

	@Autowired(required=false)
	IngredientRepo ingredientRepo;
	
	public Ingredient find(Long id) {
		return ingredientRepo.findOneById(id);
	}

	public List<Ingredient> findAllByAliment(Aliment aliment) {
		return ingredientRepo.findAllByAliment(aliment);
	}

	public Ingredient save(@Valid Ingredient ingredient) {
		return ingredientRepo.save(ingredient);
	}
	
}
