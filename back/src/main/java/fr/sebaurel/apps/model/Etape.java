package fr.sebaurel.apps.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

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
