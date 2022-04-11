package fr.sebaurel.apps17.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fr.sebaurel.apps17.util.UtilisateurSerializer;

@Entity
public class Article implements Serializable {

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
 
	
	@OneToOne(cascade = CascadeType.DETACH)
    private Photo photo;
	
    private boolean valide;
	
	public Article() {}

	public long getId() {
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

	public boolean isValide() {
		return valide;
	}

	public void setValide(boolean valide) {
		this.valide = valide;
	}
	   
	public Photo getPhoto() {
		return photo;
	}

	public void setPhoto(Photo photo) {
		this.photo = photo;
	}
	
	public Utilisateur getRedacteur() {
		return redacteur;
	}

	public void setRedacteur(Utilisateur redacteur) {
		this.redacteur = redacteur;
	}

}
