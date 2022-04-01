package fr.sebaurel.apps17.controller;

import jakarta.validation.Valid;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.service.UtilisateurSrv;
import fr.sebaurel.apps17.util.CustomException;

@RestController
@RequestMapping("rest")
public class AccountCtrl {
	
    //public static final Logger logger = LoggerFactory.getLogger(AccountCtrl.class);
    
    @Autowired(required=false)
    UtilisateurSrv utilisateurSrv;
    
      @PostMapping("/register")
    public @ResponseBody Utilisateur registerUserAccount(@RequestBody @Valid Utilisateur utilisateur) throws CustomException {
        return utilisateurSrv.createUserAccount(utilisateur);
    }
      
    @PostMapping("/registrationConfirm")
    public @ResponseBody Utilisateur confirmRegistration (@RequestBody String token) throws CustomException {
        return utilisateurSrv.confirmToken(token);
    }
    
    @PostMapping("/changepassword")
    public @ResponseBody Utilisateur changePasswordAccount(@RequestParam("email") String email, @RequestParam("passwordOld") String passwordOld, @RequestParam("passwordNew") String passwordNew) throws CustomException {
        return utilisateurSrv.changePassword(email,passwordOld,passwordNew);
    }
    
}
