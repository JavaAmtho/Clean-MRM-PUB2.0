package app.cs.impl.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;

import com.cs.data.api.core.GenericDomain;

@NodeEntity
public class PublicationAssetObject implements GenericDomain{

	private List<PublicationAssetObject> children;
	
	@GraphId
	private Long graphID;
	
	private String id;
	
	private boolean isFolder;
	
	private String name;
	
	private List<Product> products;
	
	private String path;
	
	private String title;
	
	private String type;
	
	@Fetch @RelatedToVia(type = "CHILD_OF" , direction = Direction.INCOMING)
	private Set<PublicationAssetObjectRelationShip> relationships = new HashSet<PublicationAssetObjectRelationShip>();
	
	public PublicationAssetObject() {
		// TODO Auto-generated constructor stub
	}
	
	public PublicationAssetObject(String name, String type, String path,
			boolean isFolder){
		this.name = name;
		this.type = type;
		this.path = path;
		this.isFolder = isFolder;
	}
	
	public PublicationAssetObject(String id, String type, String title,
			String name, String path){
		this.id = id;
		this.type = type;
		this.name = name;
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
		this.relationships.add(relationship);
		return relationship;
	}
	

	
	public Set<PublicationAssetObjectRelationShip> getRelationships() {
		return relationships;
	}

	public void setRelationships(
			Set<PublicationAssetObjectRelationShip> relationships) {
		this.relationships = relationships;
	}
	
	public void addRelationship(PublicationAssetObjectRelationShip relationship){
		this.relationships.add(relationship);
	}

	
	public List<PublicationAssetObject> getChildren() {
		return children;
	}

	public void setChildren(List<PublicationAssetObject> children) {
		this.children = children;
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

	public boolean isFolder() {
		return isFolder;
	}

	public void setFolder(boolean isFolder) {
		this.isFolder = isFolder;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
