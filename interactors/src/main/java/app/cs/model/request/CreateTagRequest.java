package app.cs.model.request;

import org.springframework.stereotype.Component;

@Component
public class CreateTagRequest implements RequestModel{

	String tagName;
	
	public CreateTagRequest(String tagName) {
		this.tagName = tagName;
	}
	public CreateTagRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	
	
	
}
