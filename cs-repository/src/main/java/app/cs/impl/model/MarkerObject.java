package app.cs.impl.model;

import com.cs.data.api.core.GenericDomain;

public class MarkerObject implements GenericDomain{

	String markerName;
	
	
	public MarkerObject() {
		// TODO Auto-generated constructor stub
	}
	
	public MarkerObject(String markerName) {
		this.markerName = markerName;
	}

	public String getMarkerName() {
		return markerName;
	}

	public void setMarkerName(String markerName) {
		this.markerName = markerName;
	}

	@Override
	public String getObjectKey() {
		// TODO Auto-generated method stub
		return markerName;
	}

	@Override
	public String getKey() {
		// TODO Auto-generated method stub
		return markerName;
	}
	
}
