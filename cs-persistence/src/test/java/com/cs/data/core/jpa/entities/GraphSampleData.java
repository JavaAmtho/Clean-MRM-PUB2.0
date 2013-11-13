package com.cs.data.core.jpa.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.cs.data.api.core.GenericDomain;
@Table(name = "SampleDATA")
@NodeEntity
@Entity
public class GraphSampleData implements GenericDomain,Serializable {

	public List<SampleDataRelationship> getRelationships() {
		return relationships;
	}

	public void setRelationships(List<SampleDataRelationship> relationships) {
		this.relationships = relationships;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@GraphId
	private Long nodeID;
	
	private static final String objectKey = "SampleDATA";
	
	private String name;
	
	private Long id;
	
	private List<SampleDataRelationship> relationships = new ArrayList<SampleDataRelationship>(); 
	
	public GraphSampleData() {
		// TODO Auto-generated constructor stub
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
