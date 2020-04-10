package fr.sebaurel.apps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.sebaurel.apps.model.Photo;
import fr.sebaurel.apps.service.PhotoSrv;

@RestController
@RequestMapping("rest/photo")
public class PhotoCtrl {

	@Autowired
	PhotoSrv photoSrv;
	
	@Autowired
	ObjectMapper mapper;
	
	@PostMapping("")
	public Photo handleFileUpload(@RequestParam("file") MultipartFile multipartFile, @RequestParam("height") String height, @RequestParam("width") String width) {
		return photoSrv.save(multipartFile,height,width);
	}
	
	@DeleteMapping("/{id}")
	public void deletePhoto(@PathVariable(value = "id") Long id) {
		photoSrv.invalidatePhoto(id);
	}
}
