package app.cs.interfaces.publicationasset;

import java.util.List;

import app.cs.impl.model.Product;
import app.cs.impl.model.PublicationAssetObject;

public interface IPublicationAssetRepository {

	public abstract List<PublicationAssetObject> getPublicationAssetsUnderParent(
			PublicationAssetObject publication);

	public abstract PublicationAssetObject save(PublicationAssetObject chapter);

	public abstract String delete(PublicationAssetObject chapter);

	public abstract boolean move(PublicationAssetObject chapter, String path);

	public boolean updateAssortmentProducts(String assortmentID, List<Product> products);

	public boolean editProperty(PublicationAssetObject objectToEdit);

	public PublicationAssetObject getPublicationAsset(String id);

	public PublicationAssetObject getAssortmentUnderPage(String pageId);

	public boolean updateEditURLOfPage(String pageId, String editUrl, String mamFileId);

}
