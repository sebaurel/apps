package fr.sebaurel.apps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Commentaire;

@Repository
public interface CommentaireRepo extends JpaRepository<Commentaire, Long>{

	List<Commentaire> findAllByIdRecetteOrderByDate(Long idRecette);
	Commentaire findOneById(Long id);
}
