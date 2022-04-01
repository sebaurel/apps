package fr.sebaurel.apps17.controller;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Aliment;
import fr.sebaurel.apps17.model.Categorie;
import fr.sebaurel.apps17.model.Recette;
import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.service.AlimentSrv;
import fr.sebaurel.apps17.service.CategorieSrv;
import fr.sebaurel.apps17.service.PhotoSrv;
import fr.sebaurel.apps17.service.RecetteSrv;
import fr.sebaurel.apps17.service.UtilisateurSrv;
import fr.sebaurel.apps17.util.CustomException;

@RestController
@RequestMapping("rest/recette")
public class RecetteCtrl {
	
	@Autowired
    RecetteSrv recetteSrv;

	@Autowired
    UtilisateurSrv utilisateurSrv;

	@Autowired
    AlimentSrv alimentSrv;

	@Autowired
    CategorieSrv categorieSrv;

	@Autowired
	PhotoSrv photoSrv;
	
    @GetMapping("/{id}")
    public Recette findRecette(@PathVariable(value = "id") Long id) throws CustomException {
    	return recetteSrv.find(id);
    }
    
    @GetMapping("")
    public List<Recette> findRecettes() {
    	List<Recette> recettes = recetteSrv.findAll();
    	return recettes;
    }
    
    @GetMapping("/brouillon/{email}")
    public List<Recette> findRecetteBrouillon(@PathVariable(value = "email") String email) {
    	Utilisateur utilisateur = null;
		if (email != null) {
				utilisateur = utilisateurSrv.find(email);
		}
		return recetteSrv.findAllByUtilisateurAndPublier(utilisateur);
    }
    
    @GetMapping("/last")
    public List<Recette> lastRecettes(){
    	return recetteSrv.findLastTwo();
    }
    
    @GetMapping("/random/{nombre}")
    public List<Recette> randomRecettes(@PathVariable(value = "nombre") String nombre){
    	return recetteSrv.findRandom(Integer.parseInt(nombre));
    }
    
    @GetMapping("/list")
   	public Page<Recette> recettesPageableCategories(@PageableDefault(size = 5) Pageable pageable, @RequestParam("categories") String categoriesId, @RequestParam("email") String emailUtilisateur, @RequestParam("aliments") String alimentsId, @RequestParam("favori") String favori, @RequestParam("seulementLesAliments") String seulementLesAliments ) {
 
    	Collection<Categorie> categoriesSelected = categorieSrv.findAllById(categoriesId); 
    	
    	Collection<Aliment> alimentsSelected = alimentSrv.findAllById(alimentsId);

		Utilisateur utilisateur = null;
		if (emailUtilisateur != null) {
				utilisateur = utilisateurSrv.find(emailUtilisateur);
		}
		
		Collection<Recette> favoris = new ArrayList<Recette>();
		boolean demandeFavori = Boolean.parseBoolean(favori);
		if (demandeFavori) {
			favoris = utilisateur.getFavoris();
		}
		
		boolean demandeSeulementLesAliments = Boolean.parseBoolean(seulementLesAliments);
		
    	return recetteSrv.findByCriteria(pageable, categoriesSelected, alimentsSelected, utilisateur, favoris, demandeFavori, demandeSeulementLesAliments);
   	}

    @PostMapping("")
    public ResponseEntity<Recette> create( @RequestBody Recette recette) throws Exception {
        return new ResponseEntity<Recette>(recetteSrv.preSaveRecette(recette), HttpStatus.CREATED);
    }
    
    @PutMapping("")
    public ResponseEntity<Recette> modify( @RequestBody Recette newRecette) throws CustomException {
    	Recette oldRecette = recetteSrv.find(newRecette.getId());
    	photoSrv.replacePhoto(newRecette.getPhoto(), oldRecette.getPhoto(), "Recette");
    	
    	
    	oldRecette.getIngredients().clear();    	
    	oldRecette.getEtapes().forEach(etape -> {
    		if (etape.getPhoto() != null) photoSrv.invalidatePhoto(etape.getPhoto().getId());
    	}); 
    	oldRecette.getEtapes().clear();
    	
        return new ResponseEntity<Recette>(recetteSrv.preSaveRecette(newRecette), HttpStatus.ACCEPTED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete( @PathVariable(value = "id") Long id) throws CustomException {
    	Recette recette = recetteSrv.find(id);
    	if (recette.getPhoto() != null) {
			photoSrv.invalidatePhoto(recette.getPhoto().getId());// invalide la photo qui sera supprimer lors de la prochaine purge
    	}
    	recetteSrv.delete(recette);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
