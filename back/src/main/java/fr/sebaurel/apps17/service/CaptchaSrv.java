package fr.sebaurel.apps17.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import fr.sebaurel.apps17.model.CaptchaResponse;
import fr.sebaurel.apps17.model.Utilisateur;
import fr.sebaurel.apps17.util.CustomException;

@Service
public class CaptchaSrv {

	private final RestTemplate restTemplate;

    public CaptchaSrv(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Value("${google.recaptcha.secret.key}")
    public String recaptchaSecret;
    
    @Value("${google.recaptcha.verify.url}")
    public String recaptchaVerifyUrl;
	
	public Utilisateur captchaVerify(Utilisateur utilisateur) throws CustomException {
        boolean captchaVerified = verify(utilisateur.getReCaptcha());
        if(!captchaVerified) {
        	throw new CustomException("captcha invalide", HttpStatus.UNAUTHORIZED);
        }
        
        return utilisateur;
    }
	
	public boolean verify(String response) {
    	
        MultiValueMap<String, String> param= new LinkedMultiValueMap<>();
        param.add("secret", recaptchaSecret);
        param.add("response", response);

        CaptchaResponse captchaResponse = null;
        try {
            captchaResponse = this.restTemplate.postForObject(recaptchaVerifyUrl, param, CaptchaResponse.class);
        }catch(RestClientException e){
            System.out.print(e.getMessage());
        }
       if(captchaResponse.isSuccess()){
            return true;
        }else {
            return false;
        }
    }
}
