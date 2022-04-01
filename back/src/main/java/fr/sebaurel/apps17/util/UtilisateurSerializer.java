package fr.sebaurel.apps17.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import fr.sebaurel.apps17.model.Utilisateur;


public class UtilisateurSerializer extends JsonSerializer<Utilisateur>{

	@Override
	public void serialize(Utilisateur utilisateur, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
		if (utilisateur != null) {

				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("id", utilisateur.getId().toString());
				jsonGenerator.writeStringField("pseudo", utilisateur.getPseudo());
				//jsonGenerator.writeStringField("email", utilisateur.getEmail());
				if (utilisateur.getPhoto() != null) {
					jsonGenerator.writeStringField("idPhoto", utilisateur.getPhoto().getId().toString());					
				}
				jsonGenerator.writeEndObject();
		}
	}
}
