package fr.sebaurel.apps.controller;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps.model.Commentaire;
import fr.sebaurel.apps.service.CommentaireSrv;
import fr.sebaurel.apps.service.UtilisateurSrv;
import fr.sebaurel.apps.util.Controle;

@RestController
@RequestMapping("rest/commentaire")
public class CommentaireCtrl {
	
	@Autowired
	UtilisateurSrv utilisateurSrv;
	
	@Autowired
	CommentaireSrv commentaireSrv;
	
	@Autowired
	Controle controle;
	
    @GetMapping("/recette/{id}")
    public List<Commentaire> findCommentairesRecette(@PathVariable(value = "id") Long idRecette) {
    	return commentaireSrv.findAllByIdRecette(idRecette);
    }
    
    
 	@PostMapping("")
    public ResponseEntity<Commentaire> create(@RequestBody Commentaire commentaire) {
 		commentaire.setDate(new Date());
        return new ResponseEntity<Commentaire>(commentaireSrv.save(commentaire), HttpStatus.CREATED);
    }
    
 	

	
}
