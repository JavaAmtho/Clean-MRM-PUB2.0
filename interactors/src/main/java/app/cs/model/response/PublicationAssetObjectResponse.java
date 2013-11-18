package app.cs.model.response;

import app.cs.impl.model.PublicationAssetObject;


public class PublicationAssetObjectResponse  implements ResponseModel {
	private PublicationAssetObject response;

	public PublicationAssetObjectResponse(PublicationAssetObject response) {
		super();
		this.response = response;
	}

	public PublicationAssetObject getResponse() {
		return response;
	}

	public void setResponseString(PublicationAssetObject response) {
		this.response = response;
	}
}