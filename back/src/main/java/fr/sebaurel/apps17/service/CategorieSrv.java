package fr.sebaurel.apps17.service;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Categorie;
import fr.sebaurel.apps17.repository.CategorieRepo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CategorieSrv {

	@Autowired
	CategorieRepo categorieRepo;

	public List<Categorie> findAll() {
		return categorieRepo.findAll();
	}

	public Categorie find(long id) {
	    return categorieRepo.findOneById(id);
	}

	public Categorie save(@Valid Categorie aliment) {
		return categorieRepo.save(aliment);
	}
	
	public void delete(@Valid Categorie aliment) {
		categorieRepo.delete(aliment);
	}
	
	public Collection<Categorie> findAllById(String categoriesId){
		String[] categoriesIdString = categoriesId.split(",");
		Collection<Categorie> categoriesSelected = new ArrayList<Categorie>();
		
		for(String categorieId : categoriesIdString){
			String idString = categorieId.replaceAll("[^\\w]","");
			if (!idString.equals("")) {
				long id = Long.parseLong(idString);
				categoriesSelected.add(find(id));
			}
		}
		return categoriesSelected;
	}
}
