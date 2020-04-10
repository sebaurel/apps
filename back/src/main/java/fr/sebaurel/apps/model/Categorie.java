package fr.sebaurel.apps.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Categorie implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "VARCHAR(50)", unique=true)
	private String nom;
	
	
	public Categorie(String nom) {
		this.nom = nom;
	}
	
	public Categorie() {
	}

	public Long getId() {
		return id;
	}
	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	@Override 
    public String toString(){ 
        return nom; 
    } 
}
