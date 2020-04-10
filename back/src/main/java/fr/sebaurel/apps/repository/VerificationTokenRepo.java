package fr.sebaurel.apps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.model.VerificationToken;

public interface VerificationTokenRepo 
extends JpaRepository<VerificationToken, Long> {

  VerificationToken findByToken(String token);

  VerificationToken findByUtilisateur(Utilisateur utilisateur);
}