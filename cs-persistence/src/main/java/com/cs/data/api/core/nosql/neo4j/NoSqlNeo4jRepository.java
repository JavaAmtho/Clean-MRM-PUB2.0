package com.cs.data.api.core.nosql.neo4j;

import org.neo4j.graphdb.RelationshipType;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.NoSqlOperations;


public interface NoSqlNeo4jRepository extends NoSqlOperations{
	
	public GenericDomain saveData(GenericDomain objectToInsert);
	
//	public GenericDomain saveData(GenericDomain objectToInsert,RelationshipType relationshipType);
	
}