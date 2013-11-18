package app.cs.impl.model;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.cs.data.api.core.GenericDomain;


@RelationshipEntity(type="CHILD_OF")
public class PublicationAssetObjectRelationShip implements GenericDomain {

	@GraphId
	private Long relationshipID;
	
	@Fetch@EndNode
	private GenericDomain parentObject;
	@Fetch@StartNode
	private GenericDomain childObject;
	
	private String typeOfChild;

	public PublicationAssetObjectRelationShip(GenericDomain parent,
			GenericDomain child, String typeOfChild){
		
		this.parentObject = parent;
		this.childObject = child;
		this.typeOfChild = typeOfChild;
		
	}
	
	public Long getRelationshipID() {
		return relationshipID;
	}

	public void setRelationshipID(Long relationshipID) {
		this.relationshipID = relationshipID;
	}

	public GenericDomain getParentObject() {
		return parentObject;
	}

	public void setParentObject(GenericDomain parentObject) {
		this.parentObject = parentObject;
	}

	public GenericDomain getChildObject() {
		return childObject;
	}

	public void setChildObject(GenericDomain childObject) {
		this.childObject = childObject;
	}

	public String getTypeOfChild() {
		return typeOfChild;
	}

	public void setTypeOfChild(String typeOfChild) {
		this.typeOfChild = typeOfChild;
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
