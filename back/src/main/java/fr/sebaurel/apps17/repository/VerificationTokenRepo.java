package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.model.VerificationToken;

public interface VerificationTokenRepo 
extends JpaRepository<VerificationToken, Long> {

  VerificationToken findByToken(String token);

  VerificationToken findByUtilisateur(Utilisateur utilisateur);
}