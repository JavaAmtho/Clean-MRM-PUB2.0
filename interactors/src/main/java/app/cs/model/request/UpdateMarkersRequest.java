package app.cs.model.request;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class UpdateMarkersRequest implements RequestModel {
	private String id;
	
	private List<String> markers;

	public UpdateMarkersRequest() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<String> getMarkers() {
		return markers;
	}

	public void setMarkers(List<String> markers) {
		this.markers = markers;
	}

	
}
