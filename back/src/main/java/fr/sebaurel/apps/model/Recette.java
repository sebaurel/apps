package fr.sebaurel.apps.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Recette implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	private String titre;
	
	@Column(columnDefinition = "TEXT")
	private String descriptif;

	@ManyToOne(cascade = CascadeType.DETACH)
    private Utilisateur utilisateur;
	
	@OneToOne(cascade = CascadeType.DETACH)
	private Photo photo;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "recette", orphanRemoval = true)
	private List<Etape> etapes;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "recette", orphanRemoval = true)
	private List<Ingredient> ingredients;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "idRecette", fetch = FetchType.LAZY)
	private List<Commentaire> commentaires;
	
	@ManyToOne(cascade = CascadeType.DETACH)
    private Categorie categorie;
    
	private Date date;
	
	private boolean publier = false;
	
	public Recette() {}

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescriptif() {
		return descriptif;
	}

	public void setDescriptif(String descriptif) {
		this.descriptif = descriptif;
	}

	public Photo getPhoto() {
		return photo;
	}

	public void setPhoto(Photo photo) {
		this.photo = photo;
	}

	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}
	
	public List<Etape> getEtapes() {
		return etapes;
	}

	public void setEtapes(List<Etape> etapes) {
		this.etapes = etapes;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

    public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isPublier() {
		return publier;
	}

	public void setPublier(boolean publier) {
		this.publier = publier;
	}

	public List<Commentaire> getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(List<Commentaire> commentaires) {
		this.commentaires = commentaires;
	}

}
