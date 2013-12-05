package app.cs.model.response;

import com.cs.data.api.core.GenericDomain;

public class EmptyResponseWithStatus implements ResponseModel {

	private String status;
	
	private String responseString;
	
	public EmptyResponseWithStatus(String status) {
		this.status = status;
	}
	
	public EmptyResponseWithStatus(String status,String responseString) {
		super();
		this.status = status;
		this.responseString = responseString;
	}
	
	@Override
	public GenericDomain getResponse() {
		return null;
	}

	@Override
	public String getStatus() {
		return status;
	}

	public String getResponseString() {
		return responseString;
	}

}
