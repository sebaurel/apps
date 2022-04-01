package fr.sebaurel.apps17.util;

import org.springframework.http.HttpStatus;

public class CustomException extends Exception  {

  private static final long serialVersionUID = 1L;

  private final String message;
  private final HttpStatus httpStatus;

  public CustomException(String message, HttpStatus httpStatus) {
	this.message = message;
    this.httpStatus = httpStatus;
  }

  public CustomException(String message) {
	this.httpStatus = null;
	this.message = message;
}

@Override
  public String getMessage() {
    return message;
  }

  public HttpStatus getHttpStatus() {
    return httpStatus;
  }

}