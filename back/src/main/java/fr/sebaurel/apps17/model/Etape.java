package fr.sebaurel.apps17.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Etape extends ElementCollectionsRecette {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String titre;
	
	@Column(columnDefinition = "TEXT")
	private String descriptif;
	
	@OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "idPhoto")
	private Photo photo;
	
	@ManyToOne
	@JsonIgnore
    @JoinColumn(name="idRecette") 
	private Recette recette;
		
	public Etape() {}
	
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

	public Recette getRecette() {
		return recette;
	}

	public void setRecette(Recette recette) {
		
		this.recette = recette;
	}
	
	
}
