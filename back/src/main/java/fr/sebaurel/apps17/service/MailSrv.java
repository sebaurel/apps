package fr.sebaurel.apps17.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import fr.sebaurel.apps17.model.Utilisateur;

@Service
public class MailSrv {

	@Autowired
    private JavaMailSender mailSender;
	
	 public void EmailConfirmRegistrationToken(Utilisateur utilisateur, String token) throws MessagingException {
	 	         
	        String recipeEmail = utilisateur.getEmail();
	        String subject = "Registration Confirmation";
	        String confirmationUrl = "http://appart.sebaurel.fr/#/registerconfirm/" + token;
	        String htmlMsg = "<H1 align=\"center\">message de confirmation</H1><p align=\"center\">pour confirmer votre inscription, merci de suivre le lien ci dessous<br><br> "+confirmationUrl+"</p>";
	        sendEmail(recipeEmail, subject, htmlMsg);
	    }

	public void EmailContact(String email, String name, String htmlMsg) throws MessagingException {
		String subject = "message de " + name + "<" + email + ">" ;
		String recipeEmail = "contact@sebaurel.fr";
        sendEmail(recipeEmail, subject, htmlMsg);
	}

	public void sendEmail(String recipeEmail, String subject, String htmlMsg) throws MessagingException {
		MimeMessage sendEmail = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(sendEmail, "utf-8");
				helper.setText(htmlMsg, true);
				helper.setTo(recipeEmail);
				helper.setSubject(subject);
				helper.setFrom("contact@sebaurel.fr");
	        
	        	mailSender.send(sendEmail);
	}
}
