package fr.sebaurel.apps17.service;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Unite;
import fr.sebaurel.apps17.repository.UniteRepo;

@Service
public class UniteSrv {
	
	@Autowired
	UniteRepo uniteRepo;

	public List<Unite> findAll() {
		return uniteRepo.findAll();
	}

	public Unite find(Long id) {
	    return uniteRepo.findOneById(id);
	}

	public Unite save(@Valid Unite unite) {
		return uniteRepo.save(unite);
	}
	
	public void delete(@Valid Unite unite) {
		uniteRepo.delete(unite);
	}
	
}
