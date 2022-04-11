package fr.sebaurel.apps17.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

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
	private Collection<Ingredient> ingredients;
		
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "idRecette", fetch = FetchType.LAZY)
	private List<Commentaire> commentaires;
	
	@ManyToOne(cascade = CascadeType.DETACH)
    private Categorie categorie;
    
	private Date date;
	
	private boolean publier = false;
	
	public Recette() {}

	public long getId() {
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

	public Collection<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(Collection<Ingredient> ingredients) {
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
