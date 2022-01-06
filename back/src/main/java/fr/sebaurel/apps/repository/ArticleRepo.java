package fr.sebaurel.apps.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import fr.sebaurel.apps.model.Article;

@Repository
public interface ArticleRepo extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {

	List<Article> findTop3ByValideOrderByIdDesc(boolean Valide);
	List<Article> findAll();
	Article findOneById(Long id);
}
