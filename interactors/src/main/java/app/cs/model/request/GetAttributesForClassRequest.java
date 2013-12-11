package app.cs.model.request;

import org.springframework.stereotype.Component;

@Component
public class GetAttributesForClassRequest implements RequestModel {

	String id;
	
	public GetAttributesForClassRequest(String id) {
		this.id = id;
	}
	
	public GetAttributesForClassRequest() {
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
}
