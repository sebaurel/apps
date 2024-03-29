package fr.sebaurel.apps17.service;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

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

import fr.sebaurel.apps17.model.Aliment;
import fr.sebaurel.apps17.model.Recette;
import fr.sebaurel.apps17.model.Role;
import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.model.VerificationToken;
import fr.sebaurel.apps17.repository.UtilisateurRepo;
import fr.sebaurel.apps17.repository.VerificationTokenRepo;
import fr.sebaurel.apps17.util.CustomException;


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
	
	public int deleteUser(String email) {
		Utilisateur utilisateur = utilisateurRepo.findOneByEmail(email);
		VerificationToken token = tokenRepo.findByUtilisateur(utilisateur);
		tokenRepo.delete(token);
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
        	throw new CustomException("Email invalide",HttpStatus.NOT_ACCEPTABLE);
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
		} catch (MessagingException e) {
			throw new CustomException("L'email de confirmation n'a pas pu être envoyé, merci d'essayer plus tard.",HttpStatus.SERVICE_UNAVAILABLE);
		} catch (Exception e) {
			throw new CustomException("Erreur lors de la création de votre compte.\nMerci d'essayer plus tard ou de contacter un administrateur.",HttpStatus.SERVICE_UNAVAILABLE);
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
		
		try {
	    	Utilisateur oldUtilisateur = find(utilisateur.getEmail());
			if (utilisateur.getPhoto() != null) {
	    		if (!utilisateur.getPhoto().equals(oldUtilisateur.getPhoto())) {
	    			photoSrv.replacePhoto(utilisateur.getPhoto(), oldUtilisateur.getPhoto(), "Profil");
	    		}else if(!utilisateur.getPhoto().isValid()){
	    			photoSrv.validatePhoto(utilisateur.getPhoto(), "Profil");
	    		}
	    	}else if (oldUtilisateur.getPhoto() != null) {
	    		photoSrv.invalidatePhoto(oldUtilisateur.getPhoto().getId());
	    	}
			return save(utilisateur);
		}
		catch(Exception e) {
    		 throw new CustomException("Erreur lors de la modification",HttpStatus.NOT_MODIFIED);
    	}	
	}
    
	public Utilisateur switchFavori(@Valid Utilisateur utilisateur, String idRecette, boolean add) throws NumberFormatException, CustomException {
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

	public Utilisateur changePassword(String email, String passwordOld, String passwordNew) throws CustomException {
		Utilisateur utilisateur = find(email);
		
		if (passwordEncoder.matches(passwordOld,utilisateur.getPassword())) {
			try {
				mailSrv.sendEmail(utilisateur.getEmail(), "Changement de mot de passe frigolo", "<H1 align=\"center\">Changement de mot de passe</H1><p align=\"center\">Vous avez récemment changé votre mot de passe sur frigolo.<br>Si ce n'est pas vous, merci de contacter immediatement un administrateur</p>");
				utilisateur.setPassword(passwordEncoder.encode(passwordNew));
				utilisateurRepo.save(utilisateur);
			} catch (MessagingException e) {
				throw new CustomException("Erreur d'envoie du mail de changement de mot de passe.\nVeuillez reessayer plus tard, ou contacter un administrateur", HttpStatus.BAD_REQUEST);
			} catch (Exception e) {
				throw new CustomException("Erreur lors du changement de mot de passe.\nVeuillez reessayer plus tard, ou contacter un administrateur", HttpStatus.BAD_REQUEST);
			}
		} else {
			throw new CustomException("L'ancien mot de passe n'est pas correct !", HttpStatus.BAD_REQUEST);
		}

		return utilisateur;
	}

}

	
