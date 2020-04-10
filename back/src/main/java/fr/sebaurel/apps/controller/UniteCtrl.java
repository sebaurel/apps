package fr.sebaurel.apps.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps.model.Unite;
import fr.sebaurel.apps.service.UniteSrv;

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
