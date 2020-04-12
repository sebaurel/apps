package fr.sebaurel.apps;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.sebaurel.apps.controller.UtilisateurCtrl;
import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Categorie;
import fr.sebaurel.apps.model.Recette;
import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.service.AlimentSrv;
import fr.sebaurel.apps.service.PhotoSrv;
import fr.sebaurel.apps.service.RecetteSrv;
import fr.sebaurel.apps.service.UtilisateurSrv;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.util.ArrayList;
import java.util.Collection;


@RunWith(SpringRunner.class)
//@SpringBootTest
@ContextConfiguration(classes = UtilisateurCtrl.class)
@WebMvcTest(UtilisateurCtrl.class)
@AutoConfigureMockMvc
public class UtilisateurCtrlTests {

	private MockMvc mockMvc;

	@MockBean
	private UtilisateurSrv utilisateurSrv;
	
	@MockBean
	private RecetteSrv recetteSrv;

	@MockBean
	private PhotoSrv photoSrv;

	@MockBean
    private AlimentSrv alimentSrv;
	
	private Utilisateur utilisateur1 = new Utilisateur();
	private Utilisateur utilisateur2 = new Utilisateur();
	private Utilisateur utilisateur2New = new Utilisateur();
	
	private Recette recette = new Recette();

	@Autowired
	private WebApplicationContext wac;
	
	private ObjectMapper mapper = new ObjectMapper();

	@Before
	public void before() {

		utilisateur1.setId(1l);
		utilisateur1.setFirstName("Prenom1");
		utilisateur1.setLastName("Nom1");
		utilisateur1.setPseudo("Pseudo1");
		utilisateur1.setPassword("1234567890");
		utilisateur1.setEmail("email1@email.fr");
		
		utilisateur2.setId(2l);
		utilisateur2.setFirstName("Prenom2");
		utilisateur2.setLastName("Nom2");
		utilisateur2.setPseudo("Pseudo2");
		utilisateur2.setPassword("1234567890");
		utilisateur2.setEmail("email2@email.fr");
		
		utilisateur2New.setId(2l);
		utilisateur2New.setFirstName("PrenomNew");
		utilisateur2New.setLastName("NomNew");
		utilisateur2New.setPseudo("PseudoNew");
		utilisateur2New.setPassword("1234567890");
		utilisateur2New.setEmail("email2@email.fr");

		recette.setId(1l);
		recette.setTitre("titreRecette");
		Categorie categorie = new Categorie();
		recette.setCategorie(categorie);

		this.mockMvc =  webAppContextSetup(this.wac).build();
	}
	
	/*@Test
	//@WithMockUser(roles = "USER")
	public void getUtilisateurConnecteTest() throws Exception {
		
		when(utilisateurSrv.find("email1@email.fr")).thenReturn(utilisateur1);
		when(utilisateurSrv.find("email2@email.fr")).thenReturn(utilisateur2);
		
		this.mockMvc.perform(get("/rest/utilisateur/email1@email.fr"))
        	.andExpect(status().isOk())
        	.andExpect(content().string("{\"id\":1,\"firstName\":\"Prenom1\",\"lastName\":\"Nom1\",\"pseudo\":\"Pseudo1\",\"birthday\":null,\"password\":\"1234567890\",\"enabled\":false,\"email\":\"email1@email.fr\",\"recettes\":null,\"descriptif\":null,\"photo\":null,\"favoris\":null,\"frigo\":null,\"commentaires\":null,\"role\":null}"));
        
		this.mockMvc.perform(get("/rest/utilisateur/email2@email.fr"))
        	.andExpect(status().isOk())
        	.andExpect(content().string("{\"id\":2,\"firstName\":\"Prenom2\",\"lastName\":\"Nom2\",\"pseudo\":\"Pseudo2\",\"birthday\":null,\"password\":\"1234567890\",\"enabled\":false,\"email\":\"email2@email.fr\",\"recettes\":null,\"descriptif\":null,\"photo\":null,\"favoris\":null,\"frigo\":null,\"commentaires\":null,\"role\":null}"));

	}*/
	
	/*@Test
	//@WithMockUser(roles = "USER")
	public void updateTest() throws Exception {
		//TODO à améliorer
		when(utilisateurSrv.find(utilisateur2.getEmail())).thenReturn(utilisateur2New);
		
		String stringResult = "{\"id\":2,\"firstName\":\"PrenomNew\",\"lastName\":\"NomNew\",\"pseudo\":\"PseudoNew\",\"birthday\":null,\"password\":\"1234567890\",\"enabled\":false,\"email\":\"email2@email.fr\",\"recettes\":null,\"descriptif\":null,\"photo\":null,\"favoris\":null,\"frigo\":null,\"commentaires\":null,\"role\":null}";
		
		//System.out.println("utilisateurNew : "+mapper.writeValueAsString(utilisateur2New));
		when(utilisateurSrv.save(any(Utilisateur.class))).thenReturn(utilisateur2New);
		//when(utilisateurSrv.save(utilisateur2New)).thenReturn(utilisateur2New);
		//given(utilisateurSrv.save(utilisateur2New)).willReturn(utilisateur2New);
		
		this.mockMvc.perform(put("/rest/utilisateur")
			.contentType("application/json")
			.content(mapper.writeValueAsString(utilisateur2)))
        	.andExpect(status().isOk())
        	.andExpect(content().string(stringResult));
	}
	*/
	@Test
	public void saveFavoriTest() throws Exception {
		utilisateur1.setFavoris(new ArrayList<>());
		recette.setId(1l);
		recette.setTitre("titreRecette");

		when(utilisateurSrv.find("email1@email.fr")).thenReturn(utilisateur1);
		when(recetteSrv.find(1l)).thenReturn(recette);
		when(utilisateurSrv.save(utilisateur1)).thenReturn(utilisateur1);

	}
	
	/*@Test
	public void deleteFavoriTest() throws Exception {
		Collection<Recette> favoris = new ArrayList<>();
		favoris.add(recette);
		utilisateur1.setFavoris(favoris);

		when(utilisateurSrv.find("email1@email.fr")).thenReturn(utilisateur1);
		when(recetteSrv.find(1l)).thenReturn(recette);
		when(utilisateurSrv.save(utilisateur1)).thenReturn(utilisateur1);
		
		this.mockMvc.perform(delete("/rest/utilisateur/favori/delete")
				.param("email", "email1@email.fr")
				.param("idRecette", "1"))
	        	.andExpect(status().isOk())
				.andExpect(content().contentType("application/json"))
				.andExpect(jsonPath("$.favoris").isEmpty());
		
	}
	
	@Test
	public void sauverFrigoTest() throws Exception {
		Aliment aliment = new Aliment();
		aliment.setIdAliment(2l);
		Collection<Aliment> aliments = new ArrayList<Aliment>();
		aliments.add(aliment);
		
		when(utilisateurSrv.find("email1@email.fr")).thenReturn(utilisateur1);
		when(alimentSrv.findAllById(any(String.class))).thenReturn(aliments);
		when(utilisateurSrv.save(utilisateur1)).thenReturn(utilisateur1);

		this.mockMvc.perform(post("/rest/utilisateur/frigo/sauv")
				.param("email", "email1@email.fr")
				.param("aliments", "[1]"))
	        	.andExpect(status().isOk())
	        	.andExpect(jsonPath("$.frigo[0].idAliment", is(2)));
	}*/

}
