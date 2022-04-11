package fr.sebaurel.apps17.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Selection;
import jakarta.persistence.criteria.Subquery;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Aliment;
import fr.sebaurel.apps17.model.Categorie;
import fr.sebaurel.apps17.model.Commentaire;
import fr.sebaurel.apps17.model.Etape;
import fr.sebaurel.apps17.model.Ingredient;
import fr.sebaurel.apps17.model.Recette;
import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.repository.RecetteRepo;
import fr.sebaurel.apps17.util.CustomException;

@Service
public class RecetteSrv {

	@Autowired
	RecetteRepo recetteRepo;
	
	@Autowired
	AlimentSrv alimentSrv;
	
	@Autowired
    EtapeSrv etapeSrv;
	
	@Autowired
	CommentaireSrv commentaireSrv;
	
	@Autowired
    IngredientSrv ingredientSrv;
	
	@Autowired
	PhotoSrv photoSrv;

	@Autowired
	EntityManager entityManager;

	public List<Recette> findAll() {
		return recetteRepo.findAll();
	}
	
	public List<Recette> findLastTwo(){
		return recetteRepo.findTop2ByPublierOrderByIdDesc(true);
	}
	
	public List<Recette> findRandom(int nombre) {
		
		List<Recette> listAllRecettes = recetteRepo.findAllByPublier(true);
		Collections.shuffle(listAllRecettes);
		
		return listAllRecettes.subList(0, nombre);
		
		//return findAllByIdIn(tableau de nombre après select id recette)
		
	}
	
	public List<Recette> findAllByUtilisateurAndPublier(Utilisateur utilisateur) {
		return recetteRepo.findAllByUtilisateurAndPublier(utilisateur, false);
	}
	
	public Page<Recette> findAllPageableUtilisateur(Pageable pageable, Utilisateur utilisateur) {
		return recetteRepo.findAllByUtilisateur(pageable, utilisateur);
	}
	
	public Page<Recette> findAllPageable(Pageable pageable) {
		return recetteRepo.findAll(pageable);
	}

	public Recette find(long id) throws CustomException {
		Recette recette = recetteRepo.findOneById(id);
		try {
			if (recette.getEtapes() != null)
				recette.getEtapes().sort(Comparator.comparing(Etape::getOrdre));
			//if (recette.getIngredients() != null)
			//	recette.getIngredients().sort(Comparator.comparing(Ingredient::getOrdre));
			if (recette.getCommentaires() != null)
				recette.getCommentaires().sort(Comparator.comparing(Commentaire::getDate));
		}
		catch(Exception e) {
			throw new CustomException("Recette non trouvée", HttpStatus.NOT_FOUND);
		};

		return recette;
	}

	public Recette save(@Valid Recette recette) {
		return recetteRepo.save(recette);
	}
	
	public void delete(@Valid Recette recette) {
		recetteRepo.delete(recette);
	}
	
	public Page<Recette> findByCriteria(Pageable pageable, Collection<Categorie> categories, Collection<Aliment> aliments, Utilisateur utilisateur, boolean demandePublier, Collection<Recette> favoris, boolean demandeFavori, boolean exclusiveAlimentsWanted){
		Page<Recette> page = recetteRepo.findAll(new Specification<Recette>() {
            /**
			 * 
			 */
			private static final long serialVersionUID = 1L;
			
			@Override
            public Predicate toPredicate(Root<Recette> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            	
		        
		        
                List<Predicate> predicates = new ArrayList<>();
                
                if (!categories.isEmpty()) { // Categories filter
                	predicates.add(
                		root.get("categorie").in(categories)
                	);
                }
                
                
		        if (utilisateur != null && !demandeFavori ) { // User Pages
		        	predicates.add(
		        		criteriaBuilder.equal(root.get("utilisateur"), utilisateur)
		        	);
		        	if (demandePublier) {
		        		predicates.add(
		        			criteriaBuilder.equal(root.get("publier"),false)
			            );
		        	}
		        }else { // Page all recettes
		        	predicates.add(
	                	criteriaBuilder.equal(root.get("publier"),true)
	                );
		        }
		        
		        if (utilisateur != null && demandeFavori) { // filtre sur les favoris
	                
		        	List<Predicate> predicatesFavoris = new ArrayList<>();
	                if (!favoris.isEmpty()) {
			            for(Recette recette : favoris) {
			            	predicatesFavoris.add(
		    		        	criteriaBuilder.equal(root.get("id"), recette.getId())
		                    );	
			            }
	                }else {
	                	return criteriaBuilder.isNull(root);
	                }
		            Predicate buildFavoris = criteriaBuilder.or(predicatesFavoris.toArray(new Predicate[predicatesFavoris.size()]));
			        predicates.add(buildFavoris);
		        }
		        
		        if (!aliments.isEmpty()) { // filtre sur les aliments
		            Join<Ingredient, Recette> joinIngredients = root.join("ingredients", JoinType.LEFT);
                	Predicate ingredientSelect = joinIngredients.get("aliment").in(aliments);

                    predicates.add(
                    		ingredientSelect
            		);
                    
                    //query.orderBy(criteriaBuilder.asc(criteriaBuilder.countDistinct(root.get("ingredients"))));                  
		        	
		        	//("select r.titre as ingredient, count(al.id) as total from ingredient i left join recette r on r.id = i.id_recette left join Aliment al on al.id = i.id_aliment where al.id in (6,9,17,30) group by r.id order by COUNT(al.id) desc").getResultList().;
		        } else {
    		        query.orderBy(criteriaBuilder.asc(root.get("titre")));
                }
		        query.distinct(true);
		        
		        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }

		}, pageable);
	 page.getTotalElements();
     page.getTotalPages();
     //Sort.by("titre").descending();
     return page;
    }	
	
	public List<Order> testquery( Collection<Aliment> aliments) {
        CriteriaBuilder ingredientBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Ingredient> queryIngredients = ingredientBuilder.createQuery(Ingredient.class);
        
    	Root<Ingredient> rootIngredient = queryIngredients.from(Ingredient.class);
    	
	    // Join to the other tables we can filter on.
    	Join<Ingredient, Aliment> joinAliment = rootIngredient.join("aliment", JoinType.INNER);
    	Join<Ingredient, Recette> joinRecette = rootIngredient.join("recette", JoinType.INNER);
    	
    	//queryIngredients.select(joinRecette.get("titre")).where(joinAliment.get("nom")).groupBy(rootIngredient.get("recette"));//.orderBy(ingredientBuilder.asc(ingredientBuilder.countDistinct(joinAliment)));
    	queryIngredients.orderBy(ingredientBuilder.asc(ingredientBuilder.countDistinct(joinAliment.get("nom"))));
    	return queryIngredients.getOrderList();
	};
	
	
	public Recette preSaveRecette(Recette recette) throws CustomException {
		Recette newRecette = save(recette);
		
		if (!newRecette.getEtapes().isEmpty()) {
    		for (Etape newEtape: newRecette.getEtapes()) {
	    		newEtape.setRecette(newRecette);
	    		etapeSrv.save(newEtape);
    		}
    	}
		
    	if (!newRecette.getIngredients().isEmpty()) {
	    	for (Ingredient ingredient: newRecette.getIngredients()) {
	    		ingredient.setRecette(newRecette);
	    		ingredientSrv.save(ingredient);
	    	}
    	}
    	
    	if (recette.getPhoto() != null) {
    		Recette oldRecette = find(recette.getId());
    		if (!recette.getPhoto().equals(oldRecette.getPhoto())) {
    			photoSrv.replacePhoto(recette.getPhoto(), oldRecette.getPhoto(), "Recette");
    		}else {
    			photoSrv.validatePhoto(recette.getPhoto(), "Recette");
    		}
    	}
    	
    	return newRecette;
		
	}
	
}
