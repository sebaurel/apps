package fr.sebaurel.apps.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps.model.Commentaire;
import fr.sebaurel.apps.model.Photo;
import fr.sebaurel.apps.repository.CommentaireRepo;

import java.util.List;

@Service
public class CommentaireSrv {

	@Autowired
	CommentaireRepo commentaireRepo;

	@Autowired
	PhotoSrv photoSrv;
	
	public List<Commentaire> findAllByIdRecetteOrderByDate(Long idRecette) {
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
	
	public Commentaire findOneById(Long idCommentaire) {
		return commentaireRepo.findOneById(idCommentaire);
	}
	
	public void delete(Long idCommentaire) {
		Commentaire commentaire = findOneById(idCommentaire);
		List<Photo> Photos = commentaire.getPhotos();
		if (!Photos.isEmpty()) {
			for (Photo photo : Photos) {
				photoSrv.invalidatePhoto(photo.getId());// invalide la photo qui sera supprimer lors de la prochaine purge
			}
		}
		commentaireRepo.delete(commentaire);
	}
}
