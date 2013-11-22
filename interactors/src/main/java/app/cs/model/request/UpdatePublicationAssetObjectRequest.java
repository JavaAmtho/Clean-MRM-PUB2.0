package app.cs.model.request;

import org.springframework.stereotype.Component;

import app.cs.impl.model.Assortment;
import app.cs.impl.model.PublicationAssetObject;

@Component
public class UpdatePublicationAssetObjectRequest implements RequestModel {


	private PublicationAssetObject publicationAssetObject;

	public PublicationAssetObject getPublicationAssetObject() {
		return publicationAssetObject;
	}

	public void setPublicationAssetObject(String type,
			PublicationAssetObject publicationAssetObject) {
		this.publicationAssetObject = publicationAssetObject;
		this.publicationAssetObject.setType(type);
	}
	
}
