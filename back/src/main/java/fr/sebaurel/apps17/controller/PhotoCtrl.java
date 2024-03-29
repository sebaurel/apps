package fr.sebaurel.apps17.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.sebaurel.apps17.model.Photo;
import fr.sebaurel.apps17.service.PhotoSrv;

@RestController
@RequestMapping("rest/photo")
public class PhotoCtrl {

	@Autowired
	PhotoSrv photoSrv;
	
	@PostMapping("")
	public Photo handleFileUpload(@RequestParam("file") MultipartFile multipartFile, @RequestParam("height") String height, @RequestParam("width") String width) throws Exception {
		return photoSrv.save(multipartFile,height,width);
	}
	
	@DeleteMapping("/{id}")
	public void deletePhoto(@PathVariable(value = "id") long id) {
		photoSrv.invalidatePhoto(id);
	}
	
	@GetMapping("/last")
    public List<Photo> lastPhoto(){
    	return photoSrv.findLastSixCommentaireRecette();
    }
}
