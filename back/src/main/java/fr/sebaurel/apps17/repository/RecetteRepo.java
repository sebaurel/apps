package fr.sebaurel.apps17.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Recette;
import fr.sebaurel.apps17.model.Utilisateur;

@Repository
public interface RecetteRepo extends JpaRepository<Recette, Long>, JpaSpecificationExecutor<Recette>{

	Recette findOneById(Long id);
	
	List<Recette> findTop2ByPublierOrderByIdDesc(Boolean publier);
	
	Page<Recette> findAllByUtilisateur(Pageable pageable, Utilisateur utilisateur);

	List<Recette> findAllByUtilisateurAndPublier(Utilisateur utilisateur, boolean publier);
	
	List<Recette> findAllByPublier(boolean publier);

}
