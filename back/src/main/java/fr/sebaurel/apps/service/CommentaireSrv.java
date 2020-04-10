package fr.sebaurel.apps.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps.model.Commentaire;
import fr.sebaurel.apps.repository.CommentaireRepo;

import java.util.List;

@Service
public class CommentaireSrv {

	@Autowired
	CommentaireRepo commentaireRepo;

	public List<Commentaire> findAllByIdRecette(Long idRecette) {
		return commentaireRepo.findAllByIdRecette(idRecette);
	}

	public Commentaire save(@Valid Commentaire commentaire) {
		return commentaireRepo.save(commentaire);
	}
	
}
