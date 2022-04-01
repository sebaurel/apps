package fr.sebaurel.apps17.service;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import fr.sebaurel.apps17.model.Etape;
import fr.sebaurel.apps17.repository.EtapeRepo;

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
