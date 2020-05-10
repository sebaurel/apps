package fr.sebaurel.apps.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fr.sebaurel.apps.model.Photo;
import fr.sebaurel.apps.repository.PhotoRepo;
//import fr.sebaurel.apps.util.CustomException;

@Service
public class PhotoSrv {
	private final Path rootLocation = Paths.get("/home/sebapps/images/");
	//private final Path rootLocation = Paths.get("C:\\Program Files\\Apache24\\htdocs\\images");


	/*@Value("${photosPath}")
    private String photosPath;
	private Path rootLocation = Paths.get(photosPath);*/

	@Autowired
	PhotoRepo photoRepo;

	public List<Photo> findAll() {
		return photoRepo.findAll();
	}
	
	public Photo save(MultipartFile multipartFile, String heightString, String widthString) throws Exception {
		purgePhotos();
		Photo photo = new Photo();
		try {
			File file = convert(multipartFile);
			
			Date date = new Date();
			photo.setDate(date);
			
			photo = photoRepo.save(photo);
			
			String photoNom = photo.getId() + ".png";
			String thumbNom = photo.getId() + "-thumb.png";
			
			BufferedImage originalImage = ImageIO.read(file);

			//photoSrv.storeOriginal(multipartFile);
			int width;
			int height;
			if (widthString.equals("0") && heightString.equals("0")) {
				width = originalImage.getWidth();				
				height = originalImage.getHeight();
			} else {
				width = Integer.parseInt(widthString);
				height = Integer.parseInt(heightString);
			}
			store(originalImage, photoNom, width, height);
			store(originalImage, thumbNom, 100, 100);
			
		} catch (Exception e) {
			throw e;
			//throw new CustomException(e.getStackTrace().toString(), HttpStatus.BAD_REQUEST);
		}
		return photoRepo.save(photo);
	}

	public Photo find(long id) {
		return photoRepo.findById(id);
	}
	
	public List<Photo> findLastSixCommentaireRecette(){
		List<String> recherche = new ArrayList<String>() ;
		recherche.add("Recette");
		recherche.add("Commentaire");
		return photoRepo.findTop4ByValidAndUtilInOrderByIdDesc(true, recherche);
	}
	
	public void invalidatePhoto(long id) {
		Photo photo = find(id);
		photo.setValid(false);
		photoRepo.save(photo);
	}
	
	public void validatePhoto(@Valid Photo photo, String utilisation) {
		photo.setValid(true);
		photo.setUtil(utilisation);
		photoRepo.save(photo);
	}

	public void replacePhoto(Photo newPhoto, Photo oldPhoto, String utilisation) {
		if (newPhoto != null && oldPhoto != null && !newPhoto.equals(oldPhoto)) {
			invalidatePhoto(oldPhoto.getId());// invalide l'ancienne photo qui sera supprimer lors de la prochaine purge
			validatePhoto(newPhoto, utilisation);
		}else if(newPhoto == null && oldPhoto != null){
			invalidatePhoto(oldPhoto.getId());// invalide l'ancienne photo qui sera supprimer lors de la prochaine purge
		}else if(newPhoto != null && oldPhoto == null) {
			validatePhoto(newPhoto, utilisation);
		}
		
	}
	
	public void storeOriginal(MultipartFile multipartFile) {
		
		try {
			Files.copy(multipartFile.getInputStream(), this.rootLocation.resolve(multipartFile.getOriginalFilename()));
		} catch (Exception e) {
			throw new RuntimeException("FAIL! : " + e.getMessage());
		}
	}
 
	public void store(BufferedImage originalImage, String photoNom, int width, int height) throws IOException {
		
		int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		
		BufferedImage resizeImagePng = resizeImage(originalImage, type, width, height);
		ImageIO.write(resizeImagePng, "png", new File(this.rootLocation.resolve(photoNom).toString()));
		
	}
	
	private static BufferedImage resizeImage(BufferedImage originalImage, int type, int width, int height){
		BufferedImage resizedImage = new BufferedImage(width, height, type);
		Graphics2D g = resizedImage.createGraphics();
		double originalHeight = originalImage.getHeight(), originalWidth = originalImage.getWidth();
		double newHeight = 0, newWidth = 0, cropWidth = 0, cropHeight = 0;
		
		if (originalHeight > originalWidth || originalWidth < width || (originalWidth / originalHeight * height) < width ) {
			newWidth = width;
			newHeight = (originalHeight / originalWidth * width);
			cropHeight = -((newHeight - height) / 2);
		} else {
			newHeight = height;
			newWidth = (originalWidth / originalHeight * height);
			cropWidth = -((newWidth - width) / 2);
		}
		
		g.drawImage(originalImage, (int)cropWidth, (int)cropHeight, (int)newWidth, (int)newHeight, null);
		g.dispose();
			
		return resizedImage;
	    }

	public File convert(MultipartFile file) throws IOException
	{    
	    File convFile = new File(System.getProperty("java.io.tmpdir")+"/"+file.getOriginalFilename());
	    file.transferTo(convFile);
	    return convFile;

	}
	
	public void purgePhotos() {// supprime les fichiers des photos non utilisées
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, -1);
		date = cal.getTime();

		List<Photo> photos = photoRepo.findAllByValidAndDateBefore(false, date);
		for (Photo photo : photos){
			deletePhotoFile(photo);
		}
		photoRepo.deleteAll(photos);
	}
	
	public void deletePhotoFile(Photo photo) {
		try{
			String photonom = this.rootLocation.resolve(photo.getId()+ ".png").toString();
			File photoFile = new File(photonom);
			photoFile.delete();
			
			String thumbnom = this.rootLocation.resolve(photo.getId()+ "-thumb.png").toString();
			File thumbFile = new File(thumbnom);
			thumbFile.delete();
		} catch (Exception e) {
			//ne rien faire, le fichier n'existe pas
		}
	}
}
