package app.cs.impl.model;

import org.springframework.stereotype.Component;

import com.cs.data.api.core.GenericDomain;

@Component
public class TagObject implements GenericDomain {

	String tagName;
	
	public TagObject() {
		// TODO Auto-generated constructor stub
	}
	
	public TagObject(String tagName) {
		this.tagName = tagName;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	@Override
	public String getObjectKey() {
		// TODO Auto-generated method stub
		return tagName;
	}

	@Override
	public String getKey() {
		// TODO Auto-generated method stub
		return tagName;
	}
	
	
	
}
