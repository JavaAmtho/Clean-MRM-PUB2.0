package app.cs.model.response;

import app.cs.impl.model.PublicationAssetObject;


public class PublicationAssetObjectResponse  implements ResponseModel {
	
	private PublicationAssetObject response;
	
	private String status;

	public PublicationAssetObjectResponse(PublicationAssetObject response) {
		super();
		this.response = response;
	}
	
	public PublicationAssetObjectResponse(PublicationAssetObject response, String status) {
		super();
		this.response = response;
		this.status = status;
	}

	public PublicationAssetObject getResponse() {
		return response;
	}

	public void setResponse(PublicationAssetObject response){
		this.response = response;
	}
	
	public void setStatus(String status){
		this.status = status;
	}

	@Override
	public String getStatus() {
		return status;
	}
}