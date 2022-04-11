package fr.sebaurel.apps17.util;

import java.io.IOException;
import java.util.Collection;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import fr.sebaurel.apps17.model.Recette;


public class RecettesSerializer extends JsonSerializer<Collection<Recette>>{

	@Override
	public void serialize(Collection<Recette> recettes, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
		jsonGenerator.writeStartArray();
		if (recettes != null && !recettes.isEmpty()) {
			for(Recette recette: recettes) {
				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("id", String.valueOf(recette.getId()));
				jsonGenerator.writeStringField("titre", recette.getTitre());
				jsonGenerator.writeEndObject();
			}
		}
        jsonGenerator.writeEndArray();
	}
}
