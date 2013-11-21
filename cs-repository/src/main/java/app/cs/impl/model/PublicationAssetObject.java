package app.cs.impl.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import app.cs.utils.CommonConstants;

import com.cs.data.api.core.GenericDomain;

@NodeEntity
public class PublicationAssetObject implements GenericDomain{

	@Transient
	private Set<PublicationAssetObject> children = new HashSet<>();
	
	@GraphId
	private Long graphID;
	
	private String id;
	
	private boolean isFolder;
	
//	private String name;
	
	private List<Product> products;
	
	private String path;
	
	private String title;
	
	private String type;
	
	private boolean isLazy;
	
	private String fileID;
	
	private String pageType;
	
	private String renderEngineType;
	
	
/*	@JsonIgnore @Fetch @RelatedToVia(type = "CHILD_OF" , direction = Direction.INCOMING)
	private Set<PublicationAssetObjectRelationShip> relationships = new HashSet<PublicationAssetObjectRelationShip>();*/
	
	public PublicationAssetObject() {
		// TODO Auto-generated constructor stub
	}
	
	public PublicationAssetObject(String title, String type, String path,
			boolean isFolder){
		this.title = title;
		this.type = type;
		this.path = path;
		this.isFolder = isFolder;
	}
	
	public PublicationAssetObject(String id, String type, String title,
			/*String name,*/ String path){
		this.id = id;
		this.type = type;
//		this.name = name;
		this.title = title;
		this.path = path;
	}
	
	public PublicationAssetObject(String id, String type, String path){
		this.id = id;
		this.type = type;
		this.path = path;
	}
	
	
	
	public PublicationAssetObjectRelationShip isChildOf(PublicationAssetObject parent,String typeOfChild){
		PublicationAssetObjectRelationShip relationship = new PublicationAssetObjectRelationShip(parent, this, typeOfChild);
//		this.relationships.add(relationship);
		return relationship;
	}
	

/*	
	public Set<PublicationAssetObjectRelationShip> getRelationships() {
		return relationships;
	}

	public void setRelationships(
			Set<PublicationAssetObjectRelationShip> relationships) {
		this.relationships = relationships;
	}
	
	public void addRelationship(PublicationAssetObjectRelationShip relationship){
		this.relationships.add(relationship);
	}*/

	
	public Set<PublicationAssetObject> getChildren() {
		return children;
	}

	public void setChildren(Set<PublicationAssetObject> children) {
		this.children = children;
	}
	
	public void addToChildren(PublicationAssetObject child){
		this.children.add(child);
	}

	public Long getGraphID() {
		return graphID;
	}

	public void setGraphID(Long graphID) {
		this.graphID = graphID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean getIsFolder() {
		return isFolder;
	}

	public void setIsFolder(boolean isFolder) {
		this.isFolder = isFolder;
	}

	public String getName() {
		return title;
	}

	public void setName(String name) {
		this.title = name;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	

	public boolean getIsLazy() {
		return !this.type.equals(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT);
	}

	public void setIsLazy(boolean isLazy) {
		this.isLazy = isLazy;
	}
	
	

	public String getFileID() {
		return fileID;
	}

	public void setFileID(String fileID) {
		this.fileID = fileID;
	}

	public String getPageType() {
		return pageType;
	}

	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	public String getRenderEngineType() {
		return renderEngineType;
	}

	public void setRenderEngineType(String renderEngineType) {
		this.renderEngineType = renderEngineType;
	}

	@Override
	public String getObjectKey() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getKey() {
		// TODO Auto-generated method stub
		return null;
	}

}
