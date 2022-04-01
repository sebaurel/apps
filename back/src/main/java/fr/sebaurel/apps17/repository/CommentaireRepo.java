package fr.sebaurel.apps17.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps17.model.Commentaire;

@Repository
public interface CommentaireRepo extends JpaRepository<Commentaire, Long>, JpaSpecificationExecutor<Commentaire> {

	List<Commentaire> findTop3ByValideOrderByIdDesc(boolean Valide);
	List<Commentaire> findAllByIdRecetteOrderByDate(Long idRecette);
	Commentaire findOneById(Long id);
}
