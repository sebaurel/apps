package fr.sebaurel.apps.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(
    strategy = InheritanceType.JOINED
)

public class ElementCollectionsRecette implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private long id;
		
	private int ordre;

	public long getId() {
		return id;
	}

	public int getOrdre() {
		return ordre;
	}

	public void setOrdre(int ordre) {
		this.ordre = ordre;
	}


}
