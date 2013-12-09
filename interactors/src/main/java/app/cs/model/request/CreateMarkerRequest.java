package app.cs.model.request;

import org.springframework.stereotype.Component;

@Component
public class CreateMarkerRequest  implements RequestModel{

	String markerName;
	
	public CreateMarkerRequest(String tagName) {
		this.markerName = tagName;
	}
	
	public CreateMarkerRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getMarkerName() {
		return markerName;
	}

	public void setMarkerName(String markerName) {
		this.markerName = markerName;
	}
}
