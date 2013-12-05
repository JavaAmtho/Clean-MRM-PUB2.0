package com.cs.data.api.core.nosql.neo4j;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.neo4j.graphdb.Path;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.data.neo4j.conversion.Result;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.NoSqlOperations;


public interface NoSqlNeo4jRepository extends NoSqlOperations{
	
	public GenericDomain saveData(GenericDomain objectToInsert);
	
	public <T> T getObjectByKeyValue(String key, String objectKey,Class<T> class1);

	public <T> Iterable<T> traverseFromNode(GenericDomain startElement,
			Class<T> elementClass);

	public <T> Iterable<T> traverseOneLevelFromNodeExcludeStart(
			GenericDomain startElement, Class<T> elementClass);

	public <E> boolean createMultipleRelationships(String parentKey, String parentValue,
			List<E> childNodes, String relationship);

	public <T> Iterator traverseIncomingRelationships(String key, String value,
			String realtionship, Class<T> elementClass);

	public boolean deleteAllNodesByRelationship(String parentKey, String parentValue,
			String relationship);

	public boolean deleteSelfAndAllItsChildren(String key, String value);

	public boolean editProperties(String findKey, String findValue,
			Map<String, String> properties);

	public boolean changeRelationship(String keyToFindNode, String valueOfKey,
			String newParentValueOfKey, String newRelationshipType);

	public <T> Iterator<T> getChildrenUnderParentByType(String parentId, String type,
			Class<T> entityClass);

	public <T>T findOne(Long id, Class<T> entityClass);



}