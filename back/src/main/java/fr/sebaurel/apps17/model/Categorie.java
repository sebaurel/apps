package fr.sebaurel.apps17.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Categorie implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
	
	@Column(columnDefinition = "VARCHAR(50)", unique=true)
	private String nom;
	
	
	public Categorie(String nom) {
		this.nom = nom;
	}
	
	public Categorie() {
	}

	public long getId() {
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
