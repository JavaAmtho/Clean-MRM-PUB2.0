package com.cs.data.core.jpa.entities;

import java.util.Map;

import com.cs.data.api.core.GenericDomain;

public class SampleDataContainingHashMap implements GenericDomain{

	String id;

	Map<String,String> attributes;
	
	@Override
	public String getObjectKey() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getKey() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}
	
	
}
