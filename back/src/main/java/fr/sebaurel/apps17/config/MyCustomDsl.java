package fr.sebaurel.apps17.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import fr.sebaurel.apps17.jwt.JWTAuthenticationFilter;
import fr.sebaurel.apps17.jwt.JWTAuthorizationFilter;

public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {

	@Override
	public void init(HttpSecurity http) throws Exception {
		// any method that adds another configurer
		// must be done in the init method
		http.csrf().disable();
	}

	@Override
    public void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http.addFilter(new JWTAuthenticationFilter(authenticationManager))
            .addFilter(new JWTAuthorizationFilter(authenticationManager));
    }

	public static MyCustomDsl customDsl() {
		return new MyCustomDsl();
	}
}
