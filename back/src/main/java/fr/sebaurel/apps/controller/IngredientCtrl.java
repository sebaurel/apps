package fr.sebaurel.apps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps.model.Ingredient;
import fr.sebaurel.apps.service.IngredientSrv;

@RestController
@RequestMapping("rest/ingredient")
public class IngredientCtrl {
	
	@Autowired(required=false)
    IngredientSrv ingredientSrv;
	
	
	@PutMapping("")
    public Ingredient update( @RequestBody Ingredient ingredient) {
		return ingredientSrv.save(ingredient);
	}
}
