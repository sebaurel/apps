package fr.sebaurel.apps.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
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

@Configuration
@EnableJpaAuditing
@EnableWebSecurity
@ComponentScan
public class WebConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

	@Bean
	 public AuthenticationManager authenticationManagerBean() throws Exception {
	     return super.authenticationManagerBean();
	 }
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://appart.sebaurel.fr", "https://appart.sebaurel.fr", "http://localhost:4200", "https://localhost:4200")
                						  .exposedHeaders("Authorization")
                						  .allowedMethods("GET", "PUT", "POST", "DELETE", "OPTION");
            };
            
        };
    }

		
    @Override
    protected void configure(HttpSecurity http) throws Exception {

    	http.cors()
    	.and()
       	.authorizeRequests()
    	.antMatchers("/", "/rest/utilisateur/profil/**", "/rest/article/**", "/rest/commentaire/last", "/rest/photo/last", "/rest/recette/**", "/rest/categorie", "/rest/aliment", "/rest/unite", "/rest/login", "/login", "/rest/register**", "/rest/regitrationConfirm**").permitAll()
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
