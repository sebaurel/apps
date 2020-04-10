package fr.sebaurel.apps.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import fr.sebaurel.apps.model.Etape;
import fr.sebaurel.apps.repository.EtapeRepo;

@Service
public class EtapeSrv {

	@Autowired(required=false)
	EtapeRepo etapeRepo;
	
	@Autowired
	PhotoSrv photoSrv;
	
	public Etape find(Long id) {
		return etapeRepo.findOneById(id);
	}

	public List<Etape> findAll() {
		return etapeRepo.findAll();
	}

	public Etape save(@Valid Etape etape) {
		if (etape.getPhoto() != null) {
    		Etape oldEtape = find(etape.getId());
    		if (!etape.getPhoto().equals(oldEtape.getPhoto())) {
    			photoSrv.replacePhoto(etape.getPhoto(), oldEtape.getPhoto(), "Etape");
    		}else {
    			photoSrv.validatePhoto(etape.getPhoto(), "Etape");
    		}
    	}
		return etapeRepo.save(etape);
	}
	
}
