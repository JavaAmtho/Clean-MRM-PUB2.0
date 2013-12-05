package app.cs.impl.publicationasset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.helper.Finder;
import app.cs.impl.model.Product;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.utils.CommonConstants;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

@Component
public class PublicationAssetRepository implements IPublicationAssetRepository{

	
	private static final String PRODUCT_ASSORTMENT_RELATIONSHIP = "PRODUCTS_OF";

	private NoSqlNeo4jRepository neo4jRepository;
	
	private Finder finder;
	
	@Autowired
	public PublicationAssetRepository(NoSqlNeo4jRepository neo4jRepository
			,Finder finder) {
		this.neo4jRepository = neo4jRepository;
		this.finder = finder;
	}
	
	@Override
	public List<PublicationAssetObject> getPublicationAssetsUnderParent(PublicationAssetObject parent){
		
		PublicationAssetObject parentNode = neo4jRepository.getObjectByKeyValue(CommonConstants.NODE_IDENTIFICATION_FIELD, parent.getId(), PublicationAssetObject.class);
		Iterable<PublicationAssetObject> iterable = neo4jRepository.traverseOneLevelFromNodeExcludeStart(parentNode,PublicationAssetObject.class);
		Iterator<PublicationAssetObject> iterator = iterable.iterator();
		List<PublicationAssetObject> listOfPublicationAssets = new ArrayList<PublicationAssetObject>();
		while(iterator.hasNext()){
			PublicationAssetObject publicationAsset = iterator.next();
			if(publicationAsset.getType().equalsIgnoreCase(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT)){
				/*Iterable productsIterable = neo4jRepository.traverseOneLevelFromNodeExcludeStart(publicationAsset, Product.class);*/
				Iterator<Product> productsIterator = neo4jRepository.
						traverseIncomingRelationships(CommonConstants.NODE_IDENTIFICATION_FIELD,publicationAsset.getId(),"PRODUCTS_OF", Product.class);
				List<Product> products = new ArrayList<Product>();
				while(productsIterator.hasNext()){
					Product product = (Product)productsIterator.next();
					products.add(product);
				}
				publicationAsset.setProducts(products);
			}
			listOfPublicationAssets.add(publicationAsset);
		}
		
		return listOfPublicationAssets;
		
	}
	
	@Override
	public PublicationAssetObject save(PublicationAssetObject publicationAssetObject) {
		String parentID = finder.getParentId(publicationAssetObject.getPath());
		PublicationAssetObject parent = neo4jRepository.getObjectByKeyValue(CommonConstants.NODE_IDENTIFICATION_FIELD, parentID, PublicationAssetObject.class);
		GenericDomain publicationAssetObjectRelationship = publicationAssetObject.isChildOf(parent, publicationAssetObject.getType());
		publicationAssetObject = (PublicationAssetObject)neo4jRepository.saveData(publicationAssetObject);
		neo4jRepository.saveData(publicationAssetObjectRelationship);
		return publicationAssetObject;

	}
	
	@Override
	public boolean updateAssortmentProducts(String assortmentID,List<Product> products){
		boolean response = false;
		response = neo4jRepository.deleteAllNodesByRelationship(CommonConstants.NODE_IDENTIFICATION_FIELD, assortmentID, PRODUCT_ASSORTMENT_RELATIONSHIP);
		if(products.size() > 0 && response){
			response = neo4jRepository.createMultipleRelationships(CommonConstants.NODE_IDENTIFICATION_FIELD, assortmentID, products, PRODUCT_ASSORTMENT_RELATIONSHIP);
		}
		return response;
	}
	
	@Override
	public boolean editProperty(PublicationAssetObject objectToEdit){
		Map<String,String> properties = new HashMap<String,String>();
		properties.put("title", objectToEdit.getTitle());
		if(objectToEdit.getType().equals(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_PAGE)){
			properties.put("pageType",  (objectToEdit.getPageType()!=null ? objectToEdit.getPageType() : ""));
			properties.put("renderEngineType", (objectToEdit.getRenderEngineType()!=null ? objectToEdit.getRenderEngineType() : ""));
			properties.put("fileID", (objectToEdit.getFileID()!=null ? objectToEdit.getFileID() : ""));
			properties.put("filePath", (objectToEdit.getFilePath()!=null ? objectToEdit.getFilePath() : ""));
		}
		boolean response = neo4jRepository.editProperties(CommonConstants.NODE_IDENTIFICATION_FIELD, objectToEdit.getId(), properties);
		return response;
	}
	
	@Override
	public boolean updateEditURLOfPage(String pageId, String editUrl, String mamFileId){
		Map<String,String> properties = new HashMap<String,String>();
		properties.put("editorURL",editUrl);
		properties.put("fileID",mamFileId);
		boolean response = neo4jRepository.editProperties(CommonConstants.NODE_IDENTIFICATION_FIELD,pageId, properties);
		return response;
	}
	
		
	
	@Override
	public String delete(PublicationAssetObject chapter) {
		String response = CommonConstants.FAIL_RESPONSE;
		boolean result = neo4jRepository.deleteSelfAndAllItsChildren(CommonConstants.NODE_IDENTIFICATION_FIELD, chapter.getId());
		if(result){
			response = CommonConstants.SUCCESS_RESPONSE;
		}
		return response;
	}
	
	
	@Override
	public boolean move(PublicationAssetObject chapter, String newPath) {
		String parentID = finder.getParentId(newPath);
		return neo4jRepository.changeRelationship(CommonConstants.NODE_IDENTIFICATION_FIELD, chapter.getId(), parentID, 
				CommonConstants.NEO4J_PUBLICATIONASSET_RELATIONSHIP);
	}
	
	@Override
	public PublicationAssetObject getPublicationAsset(String id){
		return neo4jRepository.getObjectByKeyValue("id", id, PublicationAssetObject.class);
	}
	
	@Override
	public PublicationAssetObject getAssortmentUnderPage(String pageId){
		Iterator<PublicationAssetObject> iter = neo4jRepository.getChildrenUnderParentByType(pageId, "Assortment", PublicationAssetObject.class);
		if(iter.hasNext()){
			PublicationAssetObject publicationAsset = iter.next();
			Iterator<Product> productsIterator = neo4jRepository.
					traverseIncomingRelationships(CommonConstants.NODE_IDENTIFICATION_FIELD,publicationAsset.getId(),"PRODUCTS_OF", Product.class);
			List<Product> products = new ArrayList<Product>();
			while(productsIterator.hasNext()){
				Product product = (Product)productsIterator.next();
				products.add(product);
			}
			publicationAsset.setProducts(products);
			return publicationAsset;
		}
		return null;
	}
	
}
