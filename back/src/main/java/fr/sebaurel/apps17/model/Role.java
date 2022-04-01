package fr.sebaurel.apps17.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
	ADMIN,USER;

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return null;
	}
}
