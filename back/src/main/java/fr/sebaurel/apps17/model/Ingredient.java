package fr.sebaurel.apps17.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ingredient extends ElementCollectionsRecette {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private float quantite;
	
	@OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "idUnite")
	private Unite unite;
	
	@ManyToOne
	@JsonIgnore
    @JoinColumn(name="idRecette") 
	private Recette recette;
	
	@OneToOne
    @JoinColumn(name = "idAliment")
    private Aliment aliment;

	private String commentaire;
	
	public Ingredient() {
	}

	public float getQuantite() {
		return quantite;
	}

	public void setQuantite(float quantite) {
		this.quantite = quantite;
	}

	public Unite getUnite() {
		return unite;
	}

	public void setUnite(Unite unite) {
		this.unite = unite;
	}

	public Aliment getAliment() {
		return aliment;
	}

	public void setAliment(Aliment aliment) {
		this.aliment = aliment;
	}

	public Recette getRecette() {
		return recette;
	}

	public void setRecette(Recette recette) {
		this.recette = recette;
	}
	
	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

}
