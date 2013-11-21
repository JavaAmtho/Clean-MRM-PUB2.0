package app.cs.impl.publicationasset;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.helper.Finder;
import app.cs.impl.model.Product;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.impl.model.PublicationAssetObjectRelationShip;
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
		
		PublicationAssetObject parentNode = neo4jRepository.getObjectByKeyValue("id", parent.getId(), PublicationAssetObject.class);
		Iterable<PublicationAssetObject> iterable = neo4jRepository.traverseOneLevelFromNodeExcludeStart(parentNode,PublicationAssetObject.class);
		Iterator<PublicationAssetObject> iterator = iterable.iterator();
		List<PublicationAssetObject> listOfPublicationAssets = new ArrayList<PublicationAssetObject>();
		while(iterator.hasNext()){
			PublicationAssetObject publicationAsset = iterator.next();
			if(publicationAsset.getType().equalsIgnoreCase(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT)){
				/*Iterable productsIterable = neo4jRepository.traverseOneLevelFromNodeExcludeStart(publicationAsset, Product.class);*/
				Iterator<Product> productsIterator = neo4jRepository.traverseIncomingRelationships("id",publicationAsset.getId(),"PRODUCTS_OF", Product.class);
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
	public PublicationAssetObject save(PublicationAssetObject chapter) {
//		if(chapter.getType() != CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION){
			String parentID = finder.getParentId(chapter.getPath());
			PublicationAssetObject parent = neo4jRepository.getObjectByKeyValue("id", parentID, PublicationAssetObject.class);
			GenericDomain publicationAssetObjectRelationship = chapter.isChildOf(parent, chapter.getType());
			chapter = (PublicationAssetObject)neo4jRepository.saveData(chapter);
			neo4jRepository.saveData(publicationAssetObjectRelationship);
/*		}
		else{
			chapter = (PublicationAssetObject)neo4jRepository.saveData(chapter);
		}*/
		return chapter/*String.valueOf(chapter.getGraphID())*/;

	}
	
	@Override
	public String updateAssortmentProducts(String assortmentID,List<Product> products){
		String responseMessage = CommonConstants.FAIL_RESPONSE;
		responseMessage = neo4jRepository.deleteAllNodesByRelationship("id", assortmentID, PRODUCT_ASSORTMENT_RELATIONSHIP);
		if(products.size() > 0 && responseMessage.equals(CommonConstants.SUCCESS_RESPONSE)){
			responseMessage = neo4jRepository.createMultipleRelationships("id", assortmentID, products, PRODUCT_ASSORTMENT_RELATIONSHIP);
		}
		return responseMessage;
	}
	
	@Override
	public String editProperty(PublicationAssetObject objectToEdit){
		Map<String,String> properties = new HashMap<String,String>();
		properties.put("title", objectToEdit.getTitle());
//		if(objectToEdit.getType().equals(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_PAGE)){
			properties.put("pageType", objectToEdit.getPageType());
			properties.put("renderEngineType", objectToEdit.getRenderEngineType());
			properties.put("fileID", objectToEdit.getFileID());
//		}
		String response = neo4jRepository.editProperties("id", objectToEdit.getId(), properties);
		return response;
	}
		
	
	@Override
	public String delete(PublicationAssetObject chapter) {
		neo4jRepository.deleteSelfAndAllItsChildren("id", chapter.getId());
		return "deleted";
	}
	
	
	@Override
	public String move(PublicationAssetObject chapter, String newPath) {
		String parentID = finder.getPublicationId(newPath);
		PublicationAssetObject parentFromDB = neo4jRepository.getObjectByKeyValue("id", parentID, PublicationAssetObject.class);
		PublicationAssetObject publicationAssetFromDB = neo4jRepository.getObjectByKeyValue("id", chapter.getId(), PublicationAssetObject.class);
		Set<PublicationAssetObjectRelationShip> relationshipsList = null/*publicationAssetFromDB.getRelationships()*/;
		if(!relationshipsList.isEmpty()){	
			//Since Outgoing relationships are requested for each node will have only single relationship
			PublicationAssetObjectRelationShip publicationAssetRelationship = relationshipsList.iterator().next();
			publicationAssetFromDB.setPath(newPath);
			neo4jRepository.saveData(publicationAssetFromDB);
			publicationAssetRelationship.setParentObject(parentFromDB);
			neo4jRepository.saveData(publicationAssetRelationship);
			return "Move Success!";
		}
		else{
			return "Move Failed!";
		}
		
	}
}
