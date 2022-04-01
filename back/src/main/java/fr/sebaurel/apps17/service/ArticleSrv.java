package fr.sebaurel.apps17.service;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Article;
import fr.sebaurel.apps17.model.Photo;
import fr.sebaurel.apps17.repository.ArticleRepo;

import java.util.List;

@Service
public class ArticleSrv {

	@Autowired
	ArticleRepo articleRepo;

	@Autowired
	PhotoSrv photoSrv;
	
	public List<Article> findAll() {
		return articleRepo.findAll();
	}

	public Article save(@Valid Article article) {
		Photo photo = article.getPhoto();
		if (photo != null) {
			photoSrv.validatePhoto(photo, "Article");
		}
		return articleRepo.save(article);
	}
	
	/*public Article modify(@Valid Article article) {
		return article;
	}*/
	
	public Article findOneById(Long idArticle) {
		return articleRepo.findOneById(idArticle);
	}
	
	public void delete(Long idArticle) {
		Article article = findOneById(idArticle);
		Photo photo = article.getPhoto();
		photoSrv.invalidatePhoto(photo.getId());// invalide la photo qui sera supprimer lors de la prochaine purge
			
		articleRepo.delete(article);
	}

	public List<Article> findLastThree() {
		return articleRepo.findTop3ByValideOrderByIdDesc(true);
	}
}
