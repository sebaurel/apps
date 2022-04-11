package fr.sebaurel.apps17.service;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Commentaire;
import fr.sebaurel.apps17.model.Photo;
import fr.sebaurel.apps17.repository.CommentaireRepo;

import java.util.List;

@Service
public class CommentaireSrv {

	@Autowired
	CommentaireRepo commentaireRepo;

	@Autowired
	PhotoSrv photoSrv;
	
	public List<Commentaire> findAllByIdRecetteOrderByDate(long idRecette) {
		return commentaireRepo.findAllByIdRecetteOrderByDate(idRecette);
	}

	public Commentaire save(@Valid Commentaire commentaire) {
		List<Photo> Photos = commentaire.getPhotos();
		if (Photos != null) {
			if (!Photos.isEmpty()) {
				for(Photo photo : Photos) {
					photoSrv.validatePhoto(photo, "Commentaire");
				}
	    	}
		}
		return commentaireRepo.save(commentaire);
	}
	
	public Commentaire modify(@Valid Commentaire commentaire) {
		return commentaire;
	}
	
	public Commentaire findOneById(long idCommentaire) {
		return commentaireRepo.findOneById(idCommentaire);
	}
	
	public void delete(long idCommentaire) {
		Commentaire commentaire = findOneById(idCommentaire);
		List<Photo> Photos = commentaire.getPhotos();
		if (!Photos.isEmpty()) {
			for (Photo photo : Photos) {
				photoSrv.invalidatePhoto(photo.getId());// invalide la photo qui sera supprimer lors de la prochaine purge
			}
		}
		commentaireRepo.delete(commentaire);
	}

	public List<Commentaire> findLastThree() {
		return commentaireRepo.findTop3ByValideOrderByIdDesc(true);
	}
}
