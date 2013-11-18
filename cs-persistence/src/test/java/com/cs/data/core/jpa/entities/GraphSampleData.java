package com.cs.data.core.jpa.entities;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;

import com.cs.data.api.core.GenericDomain;

@NodeEntity
public class GraphSampleData implements GenericDomain,Serializable {

	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@GraphId
	private Long nodeID;
	
	private static final String objectKey = "SampleDATA";
	private String name;
	
	private Long id;
	
	@Fetch @RelatedToVia(type = "CHILD_OF" , direction = Direction.OUTGOING)
	private Set<SampleDataRelationship> relationships = new HashSet<SampleDataRelationship>(); 
	
	public GraphSampleData() {
		// TODO Auto-generated constructor stub
	}
	
	public Set<SampleDataRelationship> getRelationships() {
		return relationships;
	}

	public void setRelationships(Set<SampleDataRelationship> relationships) {
		this.relationships = relationships;
	}
	
	public GraphSampleData(Long id, String name){
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getNodeID() {
		return nodeID;
	}

	public void setNodeID(Long nodeID) {
		this.nodeID = nodeID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public GenericDomain isChildOf(GenericDomain parent,String typeOfChild){
		SampleDataRelationship relationship = new SampleDataRelationship(parent, this, typeOfChild);
		this.relationships.add(relationship);
		return relationship;
	}

	@Override
	public String getObjectKey() {
		// TODO Auto-generated method stub
		return objectKey;
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
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		GraphSampleData other = (GraphSampleData) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	
	
	
}
