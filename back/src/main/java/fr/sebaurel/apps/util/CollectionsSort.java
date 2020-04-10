package fr.sebaurel.apps.util;

import java.util.Comparator;

import fr.sebaurel.apps.model.ElementCollectionsRecette;

public class CollectionsSort implements Comparator<ElementCollectionsRecette>{
	
	
	
	public int compare(ElementCollectionsRecette objet1, ElementCollectionsRecette objet2) {
	     Integer ordre1 = objet1.getOrdre();
	     Integer ordre2 = objet2.getOrdre();
	     if (ordre2.compareTo(ordre1) > 0) return -1;
	     else if(ordre2.compareTo(ordre1) == 0) return 0;
	     else return 1;
	  }

	public int compareTo(Integer o) {
		// TODO Auto-generated method stub
		return 0;
	}

	

}
