package app.cs.model.response;

import java.util.List;

import org.springframework.stereotype.Component;

import app.cs.impl.model.MarkerObject;

@Component
public class GetAllMarkersResponse  implements ResponseModel {

	List<MarkerObject> markers;
	
	String status;
	
	public GetAllMarkersResponse(String status,List<MarkerObject> markers) {
		this.markers = markers;
		this.status = status;
	}
	
	public GetAllMarkersResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public List<MarkerObject> getResponseString(){
		return markers;
	}

	@Override
	public Object getResponse() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getStatus() {
		// TODO Auto-generated method stub
		return status;
	}

}
