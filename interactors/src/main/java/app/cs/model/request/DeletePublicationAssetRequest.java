package app.cs.model.request;

import org.springframework.stereotype.Component;

import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;

@Component
public class DeletePublicationAssetRequest implements RequestModel {

	private PublicationAssetObject publicationAsset;

	public PublicationAssetObject getPublicationAsset() {
		return publicationAsset;
	}

	public void setPublicationAsset(PublicationAssetObject publicationAsset) {
		this.publicationAsset = publicationAsset;
	}
}
