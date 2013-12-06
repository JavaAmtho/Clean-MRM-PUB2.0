package app.cs.model.request;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class UpdateTagsRequest implements RequestModel {
	private String id;
	
	private List<String> tags;

	public UpdateTagsRequest() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	
}
