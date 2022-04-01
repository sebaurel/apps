package fr.sebaurel.apps17.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Utilisateur;

@Repository
public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long>{

	Utilisateur findOneByEmail(String email);
	Integer deleteOneByEmail(String email);
	Utilisateur findOneById(long id);
}
