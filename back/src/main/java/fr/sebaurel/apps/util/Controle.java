package fr.sebaurel.apps.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.service.IngredientSrv;

@Component
public class Controle {

	@Autowired
    IngredientSrv ingredientSrv;
	
	public boolean alimentDeletable(Aliment aliment) {
		if (ingredientSrv.findAllByAliment(aliment).size() != 0) {
			return false;
		}else{
			return true;
		}
	}
}
