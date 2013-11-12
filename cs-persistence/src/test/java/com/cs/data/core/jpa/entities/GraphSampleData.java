package com.cs.data.core.jpa.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.cs.data.api.core.GenericDomain;
@Table(name = "SampleDATA")
@NodeEntity
@Entity
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
		result = prime * result + ((nodeID == null) ? 0 : nodeID.hashCode());
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
		if (nodeID == null) {
			if (other.nodeID != null)
				return false;
		} else if (!nodeID.equals(other.nodeID))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	
	
	
}
