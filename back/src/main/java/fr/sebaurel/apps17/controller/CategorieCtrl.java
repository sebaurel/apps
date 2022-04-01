package fr.sebaurel.apps17.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Categorie;
import fr.sebaurel.apps17.service.CategorieSrv;

@RestController
@RequestMapping("rest/categorie")
public class CategorieCtrl {
	
	@Autowired(required=false)
    CategorieSrv categorieSrv;
	
	@GetMapping("")
    public List<Categorie> recturnCategorie() {
    	return categorieSrv.findAll();

    }

}
