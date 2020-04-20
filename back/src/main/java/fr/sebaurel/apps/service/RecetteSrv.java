package fr.sebaurel.apps.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.model.Categorie;
import fr.sebaurel.apps.model.Commentaire;
import fr.sebaurel.apps.model.Etape;
import fr.sebaurel.apps.model.Ingredient;
import fr.sebaurel.apps.model.Recette;
import fr.sebaurel.apps.model.Utilisateur;
import fr.sebaurel.apps.repository.RecetteRepo;

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

	public Recette find(Long id) {
		Recette recette = recetteRepo.findOneById(id);
		
		recette.getEtapes().sort(Comparator.comparing(Etape::getOrdre));
		recette.getIngredients().sort(Comparator.comparing(Ingredient::getOrdre));
		recette.getCommentaires().sort(Comparator.comparing(Commentaire::getDate));

		return recette;
	}

	public Recette save(@Valid Recette recette) {
		return recetteRepo.save(recette);
	}
	
	public void delete(@Valid Recette recette) {
		recetteRepo.delete(recette);
	}
	
	public Page<Recette> findByCriteria(Pageable pageable, Collection<Categorie> categories, Collection<Aliment> aliments, Utilisateur utilisateur, Collection<Recette> favoris, boolean demandeFavori, boolean exclusiveAlimentsWanted){
		Page<Recette> page = recetteRepo.findAll(new Specification<Recette>() {
            /**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
            public Predicate toPredicate(Root<Recette> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            	
		        query.orderBy(criteriaBuilder.asc(root.get("titre"))).distinct(true);

                List<Predicate> predicates = new ArrayList<>();
                
                if (!categories.isEmpty()) {
                	predicates.add(
                		root.get("categorie").in(categories)
                	);
                }
                
                
		        if (utilisateur != null && !demandeFavori ) {
		        	predicates.add(
		        		criteriaBuilder.equal(root.get("utilisateur"), utilisateur)
		        	);
		        }else {
		        	predicates.add(
	                	criteriaBuilder.equal(root.get("publier"),true)
	                );
		        }
		        
		        if (utilisateur != null && demandeFavori) {
	                
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
		        
		        if (!aliments.isEmpty()) {
                	Join<Recette, Ingredient> joinIngredients = root.join("ingredients", JoinType.INNER);
                    
                	if (exclusiveAlimentsWanted) {
                		/*TODO trouver la solution pour filtrer seulement les aliments de la liste
                		 * Pour l'instant cela permet de retrouver l'inverse !!
                		 */
                		
	            		/*Collection<Aliment> alimentsNotWanted = alimentSrv.findAll();
			            for(Aliment aliment : aliments) {
			            	alimentsNotWanted.remove(aliment);
			            }*/
			            Predicate buildAliment = criteriaBuilder.and(joinIngredients.get("aliment").in(aliments).not());

			            predicates.add(buildAliment);
                	}else{
            	   		predicates.add(
            	   			joinIngredients.get("aliment").in(aliments)
            			);
                	};
                }
		        
		        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])) ;
            }

		}, pageable);
	 page.getTotalElements();
     page.getTotalPages();
     return page;
    }
	
	public Recette preSaveRecette(Recette recette) {
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
