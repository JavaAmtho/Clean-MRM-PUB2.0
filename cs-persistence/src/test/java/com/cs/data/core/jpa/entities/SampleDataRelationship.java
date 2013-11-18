package com.cs.data.core.jpa.entities;

import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

import com.cs.data.api.core.GenericDomain;

@RelationshipEntity(type="CHILD_OF")
public class SampleDataRelationship implements GenericDomain {

	@GraphId
	private Long relationshipID;
	
	@Fetch@EndNode
	private GenericDomain parentObject;
	@Fetch@StartNode
	private GenericDomain childObject;
	private String typeOfChild;
	
	public Long getRelationshipID() {
		return relationshipID;
	}

	public void setRelationshipID(Long relationshipID) {
		this.relationshipID = relationshipID;
	}

	public String getTypeOfChild() {
		return typeOfChild;
	}

	public SampleDataRelationship(){
		// TODO Auto-generated constructor stub
	}
	
	public SampleDataRelationship(GenericDomain parent,
			GenericDomain child, String typeOfChild){
		
		this.parentObject = parent;
		this.childObject = child;
		this.typeOfChild = typeOfChild;
		
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
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((parentObject == null) ? 0 : parentObject.hashCode());
		result = prime * result + ((childObject == null) ? 0 : childObject.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SampleDataRelationship other = (SampleDataRelationship) obj;
		if (parentObject == null) {
			if (other.parentObject != null)
				return false;
		} else if (!parentObject.equals(other.parentObject))
			return false;
		if (childObject == null) {
			if (other.childObject != null)
				return false;
		} else if (!childObject.equals(other.childObject))
			return false;
		return true;
	}
	
}
