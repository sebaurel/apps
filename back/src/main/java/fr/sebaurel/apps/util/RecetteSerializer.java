package fr.sebaurel.apps.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import fr.sebaurel.apps.model.Recette;


public class RecetteSerializer extends JsonSerializer<Recette>{

	@Override
	public void serialize(Recette recette, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
		if (recette != null) {

				jsonGenerator.writeStartObject();
				jsonGenerator.writeStringField("id", recette.getId().toString());
				jsonGenerator.writeEndObject();
		}
	}
}
