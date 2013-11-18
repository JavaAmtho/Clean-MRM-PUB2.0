package app.cs.interfaces.publicationasset;

import java.util.List;

import app.cs.impl.model.PublicationAssetObject;

public interface IPublicationAssetRepository {

	public abstract List<PublicationAssetObject> getPublicationAssetsUnderParent(
			PublicationAssetObject publication);

	public abstract PublicationAssetObject save(PublicationAssetObject chapter);

	public abstract String delete(PublicationAssetObject chapter);

	public abstract String move(PublicationAssetObject chapter, String path);

}
