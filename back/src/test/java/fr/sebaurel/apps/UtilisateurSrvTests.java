package fr.sebaurel.apps;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Recette;
import fr.sebaurel.apps.model.Role;
import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.model.VerificationToken;
import fr.sebaurel.apps.repository.UtilisateurRepo;
import fr.sebaurel.apps.repository.VerificationTokenRepo;
import fr.sebaurel.apps.service.AlimentSrv;
import fr.sebaurel.apps.service.CaptchaSrv;
import fr.sebaurel.apps.service.MailSrv;
import fr.sebaurel.apps.service.RecetteSrv;
import fr.sebaurel.apps.service.UtilisateurSrv;
import fr.sebaurel.apps.util.CustomException;

@SpringBootTest(classes = AppsApplication.class)
public class UtilisateurSrvTests {
	
	@InjectMocks
	private static Utilisateur utilisateurTest = new Utilisateur();
	private static String tokenTest = UUID.randomUUID().toString();
	private static VerificationToken tokenTestVerificated = new VerificationToken(tokenTest);
	
	@TestConfiguration
    static class UtilisateurSrvTest {
 
        @Bean
        public UtilisateurSrv utilisateurSrv() {
            return new UtilisateurSrv();
        }
    }

	@Autowired
	private UtilisateurSrv utilisateurSrv;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@MockBean
	private UtilisateurRepo utilisateurRepo;

	@MockBean
	private CaptchaSrv captchaSrv;

	@MockBean
	private RecetteSrv recetteSrv;
	
	@MockBean
	private AlimentSrv alimentSrv;
	
	@MockBean
	private MailSrv mailSrv;
	
	@MockBean
	private VerificationTokenRepo tokenRepo;

	@BeforeEach
	public void setUp() throws CustomException {

	    utilisateurTest.setId(1l);
	    utilisateurTest.setEmail("test@sebaurel.fr");
	    utilisateurTest.setPseudo("testPseudo");
	    utilisateurTest.setPassword(passwordEncoder.encode("t5stP@ssw0rd"));
	    utilisateurTest.setRole(Role.USER);
	    utilisateurTest.setEnabled(true);
	    utilisateurTest.setFavoris(new ArrayList<Recette>());
	    utilisateurTest.setFrigo(new ArrayList<Aliment>());
	    tokenTestVerificated.setUtilisateur(utilisateurTest);

		/* Impossible de recupérer la methode réel est d'extraire un utilisateur non null
		//when(utilisateurRepo.findOneByEmail("test@sebaurel.fr")).then(CALLS_REAL_METHODS);
		//doCallRealMethod().when(utilisateurRepo).findOneByEmail("test@sebaurel.fr");
		//when(utilisateurRepo.findOneByEmail("test@sebaurel.fr")).thenCallRealMethod();
		utilisateurTest = utilisateurRepo.findOneByEmail("test@sebaurel.fr");
		*/
				
	    when(utilisateurRepo.findOneByEmail(utilisateurTest.getEmail()))
	      .thenReturn(utilisateurTest);
	    when(utilisateurRepo.findOneById(utilisateurTest.getId()))
	      .thenReturn(utilisateurTest);
        when(utilisateurRepo.deleteOneByEmail(utilisateurTest.getEmail()))
	      .thenReturn(1);
	    
	    when(tokenRepo.findByUtilisateur(utilisateurTest)) //util pour le test whenUtilisateurDelete_thenUtilisateurShouldBeDeleted
	      .thenReturn(tokenTestVerificated);
	    when(tokenRepo.findByToken(tokenTest))
	      .thenReturn(tokenTestVerificated);
 
	}
	
	@Test
	public void whenUtilisateurIsValid_thenUtilisateurRoleShouldBeFound() {
	    String email = "test@sebaurel.fr";
	    Set<Role> authoritiesAssert = new HashSet<Role>();
	    authoritiesAssert.add(Role.USER);
	    Set<Role> unmodsetAuthoritiesAssert = Collections.unmodifiableSet(authoritiesAssert);
	    
	    UserDetails utilisateur = utilisateurSrv.loadUserByUsername(email);
	    assertThat(utilisateur.getAuthorities().toArray()).isEqualTo(unmodsetAuthoritiesAssert.toArray());
	 }
	
	@Test
	public void whenValidEmail_thenUtilisateurShouldBeFound() {
	    String email = "test@sebaurel.fr";
	    Utilisateur utilisateur = utilisateurSrv.find(email);
	 
	    assertThat(utilisateur.getEmail()).isEqualTo(email);
	 }
	
	@Test
	public void whenUtilisateurIsSaving_thenUtilisateurShouldBeSaved() {
	    Utilisateur utilisateur = new Utilisateur();
	    utilisateur.setEmail("test@sebaurel.fr");
	    utilisateur.setPseudo("testPseudo");
	    
	    when(utilisateurRepo.save(utilisateurTest))
	      .thenReturn(utilisateurTest);
	    
	    Utilisateur utilisateurSaved = utilisateurSrv.save(utilisateurTest);
	 
	    assertThat(utilisateur.toString()).isEqualTo(utilisateurSaved.toString());
	 }
	
	@Test
	public void whenUtilisateurIsDeleting_thenUtilisateurShouldBeDeleted() {
	    String email = "test@sebaurel.fr";
	    int Reponse = utilisateurSrv.deleteUser(email);
	    
	    assertThat(Reponse).isEqualTo(1);
	}	
	
	
	@Test
	public void whenUtilisateurTokenMustBeVerified_thenTokenShouldBeVerified() {
		VerificationToken tokenVerified = utilisateurSrv.getVerificationToken(tokenTest);
	    
	    assertThat(tokenVerified).isEqualTo(tokenTestVerificated);
	}	
	
	
	@Test
	public void whenUtilisateurIsCreating_thenUtilisateurInvalideMustBeCreated() throws CustomException, MessagingException {
	    
		Utilisateur utilisateur = new Utilisateur();
		utilisateur.setEmail("test@sebaurel.fr");
	    utilisateur.setPseudo("testPseudo");
	    utilisateur.setPassword(passwordEncoder.encode("t5stP@ssw0rd"));
	    utilisateur.setReCaptcha("TestReCaptcha");

	    when(captchaSrv.verify("TestReCaptcha"))
	      .thenReturn(true);
	    when(captchaSrv.captchaVerify(utilisateur))
	      .thenReturn(utilisateur);
	    doNothing().when(mailSrv).EmailConfirmRegistrationToken(utilisateur, tokenTest);
	    when(utilisateurSrv.save(utilisateur))
	      .thenReturn(utilisateur);
	
	    Utilisateur newUtilisateur =  utilisateurSrv.createUserAccount(utilisateur);
		
	    assertThat(newUtilisateur).isInstanceOf(Utilisateur.class);
		assertThat(newUtilisateur.getPseudo())
          .isEqualTo("testPseudo");
	    assertThat(!newUtilisateur.isEnabled());
	}
	
	@Test
	public void whenValidUtilisateurIsDesactivating_thenUtilisateurShouldBeDesactivated() throws CustomException {
		Utilisateur utilisateur = new Utilisateur();
		utilisateur.setEmail("test@sebaurel.fr");
	    utilisateur.setPseudo("testPseudo");
	    utilisateur.setPassword("t5stP@ssw0rd");
	    utilisateur.setEnabled(true);
	    
	    utilisateur = utilisateurSrv.desactivate(utilisateur);
	    
	    assertThat(!utilisateur.isEnabled());
	 }
	
	@Test
	public void whenUtilisateurIsUpdating_thenUtilisateurShouldBeUpdated() throws CustomException {
		Utilisateur utilisateur = new Utilisateur();
	    utilisateur.setPseudo("testNewPseudo");
	    utilisateur.setPassword("t5stP@ssw0rd");
	    utilisateur.setEmail(utilisateurTest.getEmail());
	    utilisateur.setId(utilisateurTest.getId());
	    utilisateur.setRole(utilisateurTest.getRole());
	    utilisateur.setEnabled(utilisateurTest.isEnabled());

	    when(utilisateurSrv.find("test@sebaurel.fr"))
	      .thenReturn(utilisateurTest);
	    when(utilisateurSrv.save(utilisateur))
	      .thenReturn(utilisateur);
	    
	    Utilisateur newUtilisateur = utilisateurSrv.updateUser(utilisateur);
	    
	    assertThat(newUtilisateur.getPseudo()).isEqualTo("testNewPseudo");
	 }
	
	@Test
	public void whenFavoriIsSwitching_thenFavoriShouldBeSwitched() throws CustomException {
	    
		Recette recette = new Recette();
		recette.setId(1l);
		recette.setUtilisateur(utilisateurTest);
		recette.setTitre("TitreRecetteTest");
	    boolean add = true;
	    boolean delete = false;
		
	    when(recetteSrv.find(1l))
	      .thenReturn(recette);
	    when(utilisateurRepo.save(utilisateurTest))
	      .thenReturn(utilisateurTest);
	    
	    utilisateurSrv.switchFavori(utilisateurTest, "1", add);
	    assertThat(recette).isIn(utilisateurTest.getFavoris());
		
	    utilisateurSrv.switchFavori(utilisateurTest, "1", delete);
	    assertThat(recette).isNotIn(utilisateurTest.getFavoris());

	 }
	
	@Test
	public void whenUtilisateurFrigoIsSaving_thenUtilisateurFrigoShouldBeSaved() {
		Aliment aliment1 = new Aliment();
		aliment1.setId(1l);
		aliment1.setNom("alimentTest1");
		
		Aliment aliment2 = new Aliment();
		aliment2.setId(2l);
		aliment2.setNom("alimentTest2");
		
	    List<Aliment> alimentsSelected = new ArrayList<Aliment>();
	    alimentsSelected.add(aliment1);
	    alimentsSelected.add(aliment2);
	    
	    when(alimentSrv.findAllById("[1,2]"))
	      .thenReturn(alimentsSelected);
	    when(utilisateurRepo.save(utilisateurTest))
	      .thenReturn(utilisateurTest);
	    
	    utilisateurTest = utilisateurSrv.frigo(utilisateurTest, "[1,2]");
	    
	    assertThat(utilisateurTest.getFrigo()).isEqualTo(alimentsSelected);
	 }
	
	@Test
	public void whenUtilisateurRegisterConfirme_thenUtilisateurShouldBeSavedAndActivated() throws CustomException {
        utilisateurTest.setEnabled(false); 
        
	    when(utilisateurSrv.save(utilisateurTest))
	      .thenReturn(utilisateurTest);
	    
		Utilisateur utilisateur = utilisateurSrv.confirmToken(tokenTest);
	    
	    assertThat(utilisateur).isInstanceOf(Utilisateur.class);
	    assertThat(utilisateur.isEnabled());	 
	 }
		
	@Test
	public void whenValidId_thenUtilisateurShouldBeFound() {
	    String id = "1";
	    Long idAssert = 1l;
	    Utilisateur utilisateur = utilisateurSrv.findProfil(id);
	    assertThat(utilisateur.getId()).isEqualTo(idAssert);
	 }
	
	//changePassword(String email, String passwordOld, String passwordNew)
    // 
	@Test
	public void whenUtilisateurChangingPasword_thenUtilisateurShouldBeSavedWithNewPassword() throws MessagingException, CustomException {
	
		doNothing().when(mailSrv).EmailConfirmRegistrationToken(utilisateurTest, tokenTest);
		
		Utilisateur utilisateur = utilisateurSrv.changePassword(utilisateurTest.getEmail(),  "t5stP@ssw0rd", "t5stN5wP@ssw0rd");
		
		assertThat(passwordEncoder.matches("t5stN5wP@ssw0rd",utilisateur.getPassword()));
	 }

	
}
