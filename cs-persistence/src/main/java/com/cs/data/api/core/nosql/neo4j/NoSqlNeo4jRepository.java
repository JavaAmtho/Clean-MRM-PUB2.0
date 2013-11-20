package com.cs.data.api.core.nosql.neo4j;

import java.util.Iterator;
import java.util.List;

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

	public <T> Iterable<T> traverseOneLevelFromNodeExcludeStart(
			GenericDomain startElement, Class<T> elementClass);

	public <E, T> String createMultipleRelationships(String parentKey, String parentValue,
			List<E> childNodes, String relationship);

	public <T> Iterator traverseFromNodeExcludeStart(String key, String value,
			String realtionship, Class<T> elementClass);

}