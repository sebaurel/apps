package fr.sebaurel.apps17.controller;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Article;
import fr.sebaurel.apps17.service.ArticleSrv;
import fr.sebaurel.apps17.service.UtilisateurSrv;
import fr.sebaurel.apps17.util.Controle;

@RestController
@RequestMapping("rest/article")
public class ArticleCtrl {
	
	@Autowired
	UtilisateurSrv utilisateurSrv;
	
	@Autowired
	ArticleSrv articleSrv;
	
	@Autowired
	Controle controle;
	
	@GetMapping("")
    public List<Article> findArticles() {
    	return articleSrv.findAll();
    }
	
	@GetMapping("/{id}")
    public  ResponseEntity<Article> findArticle(@PathVariable(value = "id") Long idArticle) {
    	return new ResponseEntity<Article>(articleSrv.findOneById(idArticle), HttpStatus.ACCEPTED);
    }
    
 	/*@PostMapping("")
    public Article create(@RequestBody Article article) {
        return articleSrv.save(article);
    }*/
    
 	@PutMapping("")
    public ResponseEntity<Article> modify(@RequestBody Article article) {
   	  article.setDate(new Date());
      return new ResponseEntity<Article>(articleSrv.save(article), HttpStatus.CREATED);
    }

 	@DeleteMapping("/{id}")
    public void delete( @PathVariable(value = "id") Long id) {
        articleSrv.delete(id);
    }
 	
 	@GetMapping("/last")
    public List<Article> lastArticle(){
    	return articleSrv.findLastThree();
    }
}
