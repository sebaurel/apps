package fr.sebaurel.apps.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import fr.sebaurel.apps.jwt.JWTAuthenticationFilter;
import fr.sebaurel.apps.jwt.JWTAuthorizationFilter;
import fr.sebaurel.apps.service.UtilisateurSrv;

@Configuration
@EnableJpaAuditing
@EnableWebSecurity
@ComponentScan
public class WebConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

	@Autowired
	UtilisateurSrv utilisateurSrv;

	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(utilisateurSrv).passwordEncoder(this.passwordEncoder());
    }
	 
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://appart.sebaurel.fr", "https://appart.sebaurel.fr", "http://localhost:4200", "https://localhost:4200")
                						  .exposedHeaders("Authorization").allowedMethods("GET", "PUT", "POST", "DELETE");
            };
            
        };
    }

	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity https) throws Exception {

    	https.cors()
    	.and()
       	.authorizeRequests()
    	.antMatchers("/", "/rest/utilisateur/profil/**", "/rest/commentaire/last", "/rest/photo/last", "/rest/recette/**", "/rest/categorie", "/rest/aliment", "/rest/unite", "/login", "/rest/register**", "/rest/regitrationConfirm**").permitAll()
        .anyRequest().authenticated()
        .and()
        .httpBasic()
        .and()
        .addFilter(new JWTAuthenticationFilter(authenticationManager()))
        .addFilter(new JWTAuthorizationFilter(authenticationManager()))
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//We don't need sessions to be created.
        .and()
        .csrf().disable();
     	//.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    	
   }

}
