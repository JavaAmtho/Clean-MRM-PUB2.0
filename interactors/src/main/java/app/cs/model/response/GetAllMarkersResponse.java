package app.cs.model.response;

import org.springframework.stereotype.Component;

@Component
public class GetAllMarkersResponse  implements ResponseModel {

	
	String markers;
	
	String status;
	
	public GetAllMarkersResponse(String status,String markers) {
		this.status = status;
		this.markers = markers;
	}
	
	public GetAllMarkersResponse() {
	}
	
	@Override
	public Object getResponse() {
		return markers;
	}

	@Override
	public String getStatus() {
		return status;
	}

}
