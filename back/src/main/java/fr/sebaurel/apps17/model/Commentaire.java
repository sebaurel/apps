package fr.sebaurel.apps17.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.sebaurel.apps17.util.UtilisateurSerializer;

@Entity
public class Commentaire implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String body;
	
	private Date date;
	
    @JsonSerialize(using = UtilisateurSerializer.class)
	@OneToOne(cascade = CascadeType.DETACH)
	private Utilisateur redacteur;
	
	private long idRecette;

	private long idUtilisateur;
	
	private boolean valide;
	
	@OneToMany(cascade = CascadeType.DETACH)
    private List<Photo> photos;
	
	public Commentaire() {}

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Utilisateur getRedacteur() {
		return redacteur;
	}

	public void setRedacteur(Utilisateur redacteur) {
		this.redacteur = redacteur;
	}

	public long getIdRecette() {
		return idRecette;
	}

	public void setIdRecette(long idRecette) {
		this.idRecette = idRecette;
	}

	public long getIdUtilisateur() {
		return idUtilisateur;
	}

	public void setIdUtilisateur(long idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
	}

	public boolean isValide() {
		return valide;
	}

	public void setValide(boolean valide) {
		this.valide = valide;
	}
	
	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}
	
}
