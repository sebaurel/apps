package fr.sebaurel.apps.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.service.UtilisateurSrv;
import fr.sebaurel.apps.util.CustomException;

@RestController
@RequestMapping("rest")
public class AccountCtrl {
	
    public static final Logger logger = LoggerFactory.getLogger(AccountCtrl.class);
    
    @Autowired(required=false)
    UtilisateurSrv utilisateurSrv;
    
    @PostMapping("/register")
    public @ResponseBody Utilisateur registerUserAccount(@RequestBody @Valid Utilisateur utilisateur) throws CustomException {
        return utilisateurSrv.createUserAccount(utilisateur);
    }
      
    @PostMapping("/regitrationConfirm")
    public  @ResponseBody Utilisateur confirmRegistration (@RequestBody String token) throws CustomException {
        return utilisateurSrv.confirmToken(token);
    }
}
