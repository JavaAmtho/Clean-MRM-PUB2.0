package app.cs.model.response;

import org.springframework.stereotype.Component;

@Component
public class GetAllCustomClassesResponse implements ResponseModel{

	String status;
	
	String response;
	
	public GetAllCustomClassesResponse() {
	}
	
	public GetAllCustomClassesResponse(String status,String response) {
		this.status = status;
		this.response = response;
	}
	
	@Override
	public Object getResponse() {
		return response;
	}

	@Override
	public String getStatus() {
		return status;
	}

}
