package app.cs.impl.publicationasset;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.helper.Finder;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.impl.model.PublicationAssetObjectRelationShip;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.utils.CommonConstants;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

@Component
public class PublicationAssetRepository implements IPublicationAssetRepository{

	
	private NoSqlNeo4jRepository neo4jRepository;
	
	private Finder finder;
	
	@Autowired
	public PublicationAssetRepository(NoSqlNeo4jRepository neo4jRepository
			,Finder finder) {
		this.neo4jRepository = neo4jRepository;
		this.finder = finder;
	}
	
	@Override
	public List<PublicationAssetObject> getPublicationAssetsUnderParent(PublicationAssetObject publication){
		
		PublicationAssetObject parentNode = neo4jRepository.getObjectByKeyValue("id", publication.getId(), PublicationAssetObject.class);
		Iterable<PublicationAssetObject> iterable = neo4jRepository.traverseOneLevelFromNodeExcludeStart(parentNode,PublicationAssetObject.class);
		Iterator<PublicationAssetObject> iterator = iterable.iterator();
		List<PublicationAssetObject> listOfPublicationAssets = new ArrayList<PublicationAssetObject>();
		while(iterator.hasNext()){
			System.out.println("HELLO");
			PublicationAssetObject publicationAsset = iterator.next();
			listOfPublicationAssets.add(publicationAsset);
		}
		return listOfPublicationAssets;
		
	}
	
	@Override
	public PublicationAssetObject save(PublicationAssetObject chapter) {
//		if(chapter.getType() != CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION){
			String parentID = finder.getParentId(chapter.getPath());
			System.out.println("PubAssetRepo");
			System.out.println("parentID =>" + parentID);
			PublicationAssetObject parent = neo4jRepository.getObjectByKeyValue("id", parentID, PublicationAssetObject.class);
			System.out.println("HERE");
			System.out.println("ParentGraphID => " + parent.getGraphID());
			GenericDomain publicationAssetObjectRelationship = chapter.isChildOf(parent, chapter.getType());
			chapter.setId(chapter.getName());
			chapter = (PublicationAssetObject)neo4jRepository.saveData(chapter);
			neo4jRepository.saveData(publicationAssetObjectRelationship);
/*		}
		else{
			chapter = (PublicationAssetObject)neo4jRepository.saveData(chapter);
		}*/
		return chapter/*String.valueOf(chapter.getGraphID())*/;

	}
		
	
	@Override
	public String delete(PublicationAssetObject chapter) {
		neo4jRepository.delete(chapter);
		return "deleted";
	}
	
	
	@Override
	public String move(PublicationAssetObject chapter, String newPath) {
		String parentID = finder.getPublicationId(newPath);
		PublicationAssetObject parentFromDB = neo4jRepository.getObjectByKeyValue("id", parentID, PublicationAssetObject.class);
		PublicationAssetObject publicationAssetFromDB = neo4jRepository.getObjectByKeyValue("id", chapter.getId(), PublicationAssetObject.class);
		Set<PublicationAssetObjectRelationShip> relationshipsList = publicationAssetFromDB.getRelationships();
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