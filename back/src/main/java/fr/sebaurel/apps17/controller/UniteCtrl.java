package fr.sebaurel.apps17.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Unite;
import fr.sebaurel.apps17.service.UniteSrv;

@RestController
@RequestMapping("rest/unite")
public class UniteCtrl {
	
	@Autowired
	UniteSrv uniteSrv;
	
	@GetMapping("")
    public List<Unite> returnUnite() {
    	return uniteSrv.findAll();

    }

}
