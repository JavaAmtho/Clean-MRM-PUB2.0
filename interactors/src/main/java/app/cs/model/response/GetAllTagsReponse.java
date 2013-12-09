package app.cs.model.response;


import java.util.List;

import org.springframework.stereotype.Component;

import app.cs.impl.model.TagObject;

@Component
public class GetAllTagsReponse implements ResponseModel {

	List<TagObject> tags;
	
	String status;
	
	public GetAllTagsReponse(String status,List<TagObject> tags) {
		this.tags = tags;
		this.status = status;
	}
	
	public GetAllTagsReponse() {
		// TODO Auto-generated constructor stub
	}
	
	public List<TagObject> getResponseString(){
		return tags;
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
