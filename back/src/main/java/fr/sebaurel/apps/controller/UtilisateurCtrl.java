package fr.sebaurel.apps.controller;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.service.UtilisateurSrv;
import fr.sebaurel.apps.util.CustomException;

@RestController
@RequestMapping("rest/utilisateur")
public class UtilisateurCtrl {
	
	@Autowired(required=false)
    UtilisateurSrv utilisateurSrv;
	
    @GetMapping("/{email}")
	public Utilisateur getUtilisateur(@PathVariable(value = "email") String email) {
    	return utilisateurSrv.find(email);
    }
    
    @GetMapping("profil/{id}")
	public Utilisateur getProfil(@PathVariable(value = "id") String id) {
    	return utilisateurSrv.findProfil(id);
    }
    
    @PostMapping("/desactivate/{email}")
    public @ResponseBody Utilisateur desactivate(@PathVariable(value = "email") String email) throws CustomException{
    	return utilisateurSrv.desactivate(getUtilisateur(email));
    }
    
    @PutMapping("")
    public @ResponseBody Utilisateur update(@Valid @RequestBody Utilisateur utilisateur) throws CustomException {
        return utilisateurSrv.updateUser(utilisateur);
    }
    
    @DeleteMapping("")
    public @ResponseBody Integer delete(@RequestParam("email") String email) throws CustomException {
        return utilisateurSrv.deleteUser(email);
    }
    
    @PostMapping("/favori/add")
    public Utilisateur addFavori(@RequestParam("email") String email, @RequestParam("idRecette") String idRecette) {
    	return utilisateurSrv.switchFavori(getUtilisateur(email), idRecette, true);
    }
	
	@DeleteMapping("/favori/delete")
    public Utilisateur deleteFavori(@RequestParam("email") String email, @RequestParam("idRecette") String idRecette) {
    	return utilisateurSrv.switchFavori(getUtilisateur(email), idRecette, false);
    }
	
	@PostMapping("/frigo/sauv")
	public Utilisateur saveFrigo(@RequestParam("email") String email, @RequestParam("aliments") String alimentsId) {
		return utilisateurSrv.frigo(getUtilisateur(email), alimentsId);
	}
	
	@PostMapping("/email")
	public void sendMail(@RequestParam("email") String email, @RequestParam("name") String name, @RequestParam("text") String text) throws MessagingException {
		utilisateurSrv.sendMail(email, name, text);
	}

}
