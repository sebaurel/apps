package fr.sebaurel.apps17.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.sebaurel.apps17.model.Aliment;
import fr.sebaurel.apps17.service.AlimentSrv;

@RestController
@RequestMapping("rest/aliment")
public class AlimentCtrl {
		
	@Autowired(required=false)
    AlimentSrv alimentSrv;

    @GetMapping("/{id}")
    public Aliment findaliment(@PathVariable(value = "id") Long id) {
    	return alimentSrv.find(id);
    }
    
    @GetMapping("")
    public List<Aliment> findAliments() {
    	return alimentSrv.findAll();
    }
    
 	@PostMapping("")
    public Aliment create( @RequestBody Aliment aliment) {
        return alimentSrv.createAliment(aliment);
    }
    
 	@PutMapping("")
    public Aliment update( @RequestBody Aliment newAliment) {
    	return alimentSrv.updateAliment(newAliment);
    }
    
 	
	@DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
		Aliment aliment = alimentSrv.find(id);
    	alimentSrv.deleteAliment(aliment);
    } 

	
}
