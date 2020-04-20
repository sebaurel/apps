package fr.sebaurel.apps.service;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Recette;
import fr.sebaurel.apps.model.Role;
import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.model.VerificationToken;
import fr.sebaurel.apps.repository.UtilisateurRepo;
import fr.sebaurel.apps.repository.VerificationTokenRepo;
import fr.sebaurel.apps.util.CustomException;


@Service
@Transactional(rollbackFor = CustomException.class)
public class UtilisateurSrv implements UserDetailsService {

	@Autowired
	private UtilisateurRepo utilisateurRepo;
	
	@Autowired
    private VerificationTokenRepo tokenRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private PhotoSrv photoSrv;
	
	@Autowired
	private RecetteSrv recetteSrv;
	
	@Autowired
	private AlimentSrv alimentSrv;
	
	@Autowired
	private MailSrv mailSrv;
	
	@Autowired
	private CaptchaSrv captchasrv;
	
    @Override
    public UserDetails loadUserByUsername(String lastName) throws UsernameNotFoundException {
        Utilisateur utilisateur = find(lastName);
        if (utilisateur == null) throw new UsernameNotFoundException("Utilisateur non trouvé");
        
        List<GrantedAuthority> grantedAuthorityList = new ArrayList<GrantedAuthority>();
        grantedAuthorityList.addAll(utilisateur.getAuthorities());
        
        if (utilisateur.isEnabled()) return new User(utilisateur.getUsername(), utilisateur.getPassword(), grantedAuthorityList);
        throw new UsernameNotFoundException("Compte désactivé");
    }

   	public Utilisateur find(String email) {
	    return utilisateurRepo.findOneByEmail(email);
	}

	public Utilisateur save(@Valid Utilisateur utilisateur) {
		return utilisateurRepo.save(utilisateur);
	}
	
	public Integer deleteUser(String email) {	
		return utilisateurRepo.deleteOneByEmail(email);
	}
	
    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepo.findByToken(VerificationToken);
    }
     
    public void createVerificationToken(Utilisateur utilisateur, String token) {
        VerificationToken myToken = new VerificationToken(token, utilisateur);
        tokenRepo.save(myToken);
    }
    
    public Utilisateur createUserAccount(Utilisateur utilisateur) throws CustomException {
    	utilisateur = captchasrv.captchaVerify(utilisateur);
    	
    	Utilisateur newUtilisateur = new Utilisateur();
    	
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateur.setRole(Role.USER);
       
	    if (!utilisateur.getEmail().matches("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
                +"[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
                +"(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
        	throw new CustomException("Mail invalide",HttpStatus.NOT_ACCEPTABLE);
        }
        
        try {
        	newUtilisateur = save(utilisateur);
		} catch (Exception e) {
			throw new CustomException("Email déjà utilisé",HttpStatus.NOT_ACCEPTABLE);
		}
        
		try {	        
			String token = UUID.randomUUID().toString();
		    createVerificationToken(utilisateur, token);
		    mailSrv.EmailConfirmRegistrationToken(newUtilisateur, token);
		} catch (Exception e) {
			throw new CustomException("L'email de confirmation n'a pas pu être envoyé, merci d'essayer plus tard.",HttpStatus.SERVICE_UNAVAILABLE);
		}
		
        return newUtilisateur;
    }    
    
   

	public Utilisateur desactivate(Utilisateur utilisateur) throws CustomException {
		try {
	    	utilisateur.setEnabled(false);
	    	save(utilisateur);
    	}
    	catch(Exception e) {
    		 throw new CustomException("Erreur lors de la desactivation",HttpStatus.NOT_MODIFIED);
    	}
    	
    	return utilisateur;		
	}

	public Utilisateur updateUser(@Valid Utilisateur utilisateur) throws CustomException {
		Utilisateur newUtilisateur = new Utilisateur();
		
		try {
	    	Utilisateur oldUtilisateur = find(utilisateur.getEmail());
			if (utilisateur.getPhoto() != null) {
	    		if (!utilisateur.getPhoto().equals(oldUtilisateur.getPhoto())) {
	    			photoSrv.replacePhoto(utilisateur.getPhoto(), oldUtilisateur.getPhoto(), "Profil");
	    		}else if(!utilisateur.getPhoto().isValid()){
	    			photoSrv.validatePhoto(utilisateur.getPhoto(), "Profil");
	    		}
	    	}else {
	    		photoSrv.invalidatePhoto(oldUtilisateur.getPhoto().getId());
	    	}
			newUtilisateur = save(utilisateur);
		}
		catch(Exception e) {
    		 throw new CustomException("Erreur lors de la modification",HttpStatus.NOT_MODIFIED);
    	}
    	return newUtilisateur;
	}
    
	public Utilisateur switchFavori(@Valid Utilisateur utilisateur, String idRecette, boolean add) {
		Recette recette = recetteSrv.find(Long.parseLong(idRecette));
		List<Recette> favoris = utilisateur.getFavoris();
		if (add) {
			favoris.add(recette);
		} else {
			favoris.remove(recette);
		}
		utilisateur.setFavoris(favoris);
		
		return save(utilisateur);
	}

	public Utilisateur frigo(Utilisateur utilisateur, String alimentsId) {
		List<Aliment> alimentsSelected = alimentSrv.findAllById(alimentsId);
    	utilisateur.setFrigo(alimentsSelected);
    	
		return save(utilisateur);
	}

	public Utilisateur confirmToken(String token) throws CustomException {
		VerificationToken verificationToken = getVerificationToken(token);
		
        if (verificationToken == null) {
            throw new CustomException("Clès de confirmation invalide", HttpStatus.BAD_REQUEST);
        }

        Utilisateur utilisateur = verificationToken.getUtilisateur();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
        	throw new CustomException("Clès de confirmation expiré", HttpStatus.BAD_REQUEST);
        }

        utilisateur.setEnabled(true); 

        return save(utilisateur);
	}
	
	public void sendMail(String email, String name, String text) throws MessagingException {
		mailSrv.EmailContact(email, name, text);
	}

	public Utilisateur findProfil(String id) {
		long profilId = Long.parseLong(id);
		return utilisateurRepo.findOneById(profilId);
	}

}

	
