package fr.sebaurel.apps17.controller;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Commentaire;
import fr.sebaurel.apps17.service.CommentaireSrv;
import fr.sebaurel.apps17.service.UtilisateurSrv;
import fr.sebaurel.apps17.util.Controle;

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
    	return commentaireSrv.findAllByIdRecetteOrderByDate(idRecette);
    }
    
 	@PostMapping("")
    public Commentaire create(@RequestBody Commentaire commentaire) {
 		commentaire.setDate(new Date());
        return commentaireSrv.save(commentaire);
    }
    
 	@PutMapping("")
    public ResponseEntity<Commentaire> modify(@RequestBody Commentaire commentaire) {
        return new ResponseEntity<Commentaire>(commentaireSrv.save(commentaire), HttpStatus.CREATED);
    }

 	@DeleteMapping("/{id}")
    public void delete( @PathVariable(value = "id") Long id) {
        commentaireSrv.delete(id);
    }
 	
 	@GetMapping("/last")
    public List<Commentaire> lastCommentaire(){
    	return commentaireSrv.findLastThree();
    }
}
