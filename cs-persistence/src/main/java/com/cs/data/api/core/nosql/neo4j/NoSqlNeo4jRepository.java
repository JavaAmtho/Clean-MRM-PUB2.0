package com.cs.data.api.core.nosql.neo4j;

import org.neo4j.graphdb.Path;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.data.neo4j.conversion.Result;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.NoSqlOperations;


public interface NoSqlNeo4jRepository extends NoSqlOperations{
	
	public GenericDomain saveData(GenericDomain objectToInsert);
	
	public <T> T findOne(Long ID, Class<T> classOfObjectToBeFetched);
	
	public <T> T getObjectByKeyValue(String key, String objectKey,Class<T> class1);

	public <T> Iterable<T> traverseFromNode(GenericDomain startElement,
			Class<T> elementClass);

	public <T> Iterable<T> traverseFromNodeExcludeStart(GenericDomain startElement,
			Class<T> elementClass);

	public <T> Iterable<T> traverseOneLevelFromNodeExcludeStart(
			GenericDomain startElement, Class<T> elementClass);

}