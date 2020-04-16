package fr.sebaurel.apps.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.context.annotation.Scope;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import fr.sebaurel.apps.util.RecettesSerializer;

@Entity
@Scope("session")
public class Utilisateur implements UserDetails{
	
    
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
    
	private String firstName;

	private String lastName;

	@NotNull
	@Size(max = 100)
	private String pseudo;
	
	private Date birthday;
	
	@NotNull
	private String password;
	
	@NotNull
    @Column(name = "activate")
	private boolean enabled;
	
	@Email
	@NotNull
	@Size(max = 100)
	@Column(unique = true)
	private String email;
	
    @JsonSerialize(using = RecettesSerializer.class)
	@OneToMany(cascade = CascadeType.DETACH)
    private List<Recette> recettes;
	
	@Column(columnDefinition = "TEXT")
	private String descriptif;
	
	@OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name="idPhoto")
	private Photo photo;
	
    @JsonSerialize(using = RecettesSerializer.class)
	@ManyToMany
    private List<Recette> favoris;
	
	@ManyToMany
    private List<Aliment> frigo;
	
	@OneToMany(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
	private List<Commentaire> commentaires;
	
	@Transient
    private String reCaptcha;
    
	public Utilisateur() {
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPseudo() {
		return pseudo;
	}

	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    
    public void setRole(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }
    
	@JsonIgnore
    @Override
    public List<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        list.add(role);

        return list;
    }
    
    @JsonIgnore
	@Override
	public String getUsername() {
		return email;
	}

	@Override
    @JsonIgnore
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
    @JsonIgnore
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
    @JsonIgnore
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public List<Recette> getRecettes() {
		return recettes;
	}
	
	public void setRecettes(List<Recette> recettes) {
		this.recettes = recettes;
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

	public List<Recette> getFavoris() {
		return favoris;
	}

	public void setFavoris(List<Recette> favoris) {
		this.favoris = favoris;
	}

	public List<Aliment> getFrigo() {
		return frigo;
	}

	public void setFrigo(List<Aliment> frigo) {
		this.frigo = frigo;
	}

	public List<Commentaire> getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(List<Commentaire> commentaires) {
		this.commentaires = commentaires;
	}
	
	public String getReCaptcha() {
		return reCaptcha;
	}

	public void setReCaptcha(String reCaptcha) {
		this.reCaptcha = reCaptcha;
	}
	
}
