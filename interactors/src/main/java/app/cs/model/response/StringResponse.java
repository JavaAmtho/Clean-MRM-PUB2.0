package app.cs.model.response;

import com.cs.data.api.core.GenericDomain;

public class StringResponse implements ResponseModel {
	private String responseString;

	public StringResponse(String responseString) {
		super();
		this.responseString = responseString;
	}

	public String getResponseString() {
		return responseString;
	}

	public void setResponseString(String responseString) {
		this.responseString = responseString;
	}

	@Override
	public GenericDomain getResponse() {
		// TODO Auto-generated method stub
		return null;
	}
}
