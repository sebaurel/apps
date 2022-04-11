package fr.sebaurel.apps17.model;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;


@Entity
public class VerificationToken {
    private static final int EXPIRATION = 60 * 24;
 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
     
    private String token;
   
    @OneToOne(targetEntity = Utilisateur.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "utilisateur")
    private Utilisateur utilisateur;
     
    private Date expiryDate;
    
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }

    public VerificationToken() {
	}
    
    public VerificationToken(final String token) {
        super();

        this.token = token;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }
    
	public VerificationToken(final String token, final Utilisateur utilisateur) {
		super();
		setToken(token);
		setUtilisateur(utilisateur);
		setExpiryDate(calculateExpiryDate(EXPIRATION));
	}

	public long getId() {
		return id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Utilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur (Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
     
}