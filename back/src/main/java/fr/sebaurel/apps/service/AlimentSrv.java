package fr.sebaurel.apps.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import fr.sebaurel.apps.model.Aliment;
import fr.sebaurel.apps.repository.AlimentRepo;
import fr.sebaurel.apps.util.Controle;


@Service
public class AlimentSrv {

	@Autowired
	AlimentRepo alimentRepo;

	@Autowired
	PhotoSrv photoSrv;
	
	@Autowired
	Controle controle;
	
	public List<Aliment> findAll() {
		return alimentRepo.findAll();
	}

	public Aliment find(Long id) {
	    return alimentRepo.findOneById(id);
	}

	public Aliment save(@Valid Aliment aliment) {
		return alimentRepo.save(aliment);
	}
	
	public List<Aliment> findAllById(String alimentsId){
		String[] alimentsIdString = alimentsId.split(",");
		List<Aliment> alimentsSelected = new ArrayList<Aliment>();
		
		for(String alimentId : alimentsIdString){
			String idString = alimentId.replaceAll("[^\\w]","");
			if (!idString.equals("")) {
				long id = Long.parseLong(idString);
				alimentsSelected.add(find(id));
			}
		}
		return alimentsSelected;
	}
	
	public Aliment updateAliment(Aliment newAliment) {
		Aliment oldAliment = find(newAliment.getId());
    	if (newAliment.getPhoto() != null) {
    		if (!newAliment.getPhoto().equals(oldAliment.getPhoto())) {
    			photoSrv.replacePhoto(newAliment.getPhoto(), oldAliment.getPhoto(), "Aliment");
    		}else {
    			photoSrv.validatePhoto(newAliment.getPhoto(), "Aliment");
    		}
   		} else if (oldAliment.getPhoto() != null) {
   			photoSrv.invalidatePhoto(oldAliment.getPhoto().getId());
   		}
        return save(newAliment);		
	}

	public Aliment createAliment(Aliment aliment) {
    	if (aliment.getPhoto() != null) {
    		photoSrv.validatePhoto(aliment.getPhoto(), "Aliment");
		}
		return save(aliment);
	}
	public void deleteAliment(Aliment aliment) {
    	boolean ctrl = controle.alimentDeletable(aliment);
    	if (ctrl) {
    		if (aliment.getPhoto() != null)
    		photoSrv.invalidatePhoto(aliment.getPhoto().getId());// invalide l'ancienne photo qui sera supprimer lors de la prochaine purge
    	}
		alimentRepo.delete(aliment);
	}
}
