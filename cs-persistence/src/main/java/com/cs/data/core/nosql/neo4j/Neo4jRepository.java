package com.cs.data.core.nosql.neo4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.neo4j.graphdb.traversal.Evaluators;
import org.neo4j.graphdb.traversal.TraversalDescription;
import org.neo4j.kernel.Traversal;
import org.neo4j.rest.graphdb.entity.RestNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.support.mapping.Neo4jPersistentEntityImpl;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.stereotype.Repository;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

@Repository
public class Neo4jRepository implements NoSqlNeo4jRepository {
	
	private static final String MUSTACHE_TEMPLATE_VARIABLE_VALUE = "value";
	private static final String MUSTACHE_TEMPLATE_VARIABLE_KEY = "key";
	private static final String MUSTACHE_TEMPLATE_VARIABLE_QUERY_GET_BY_KEY = "queryGetByKey";
	private Neo4jOperations neo4jTemplate;
	
	@Autowired
	public Neo4jRepository(Neo4jOperations neo4jTemplate) {
		this.neo4jTemplate = neo4jTemplate;
	}
	
	@Override
	public <T> T getObjectByKeyValue(String key, String value, Class<T> class1) {

		/*MustacheFactory mustacheFactory = new DefaultMustacheFactory();
		Mustache queryGetByKeyMustache = mustacheFactory.compile("neo4jQueryTemplate.mustache");
		Map<String,Object> mustacheVariables = new HashMap<>();
		System.out.println("ObjectBYKEYVALUE");
		mustacheVariables.put(MUSTACHE_TEMPLATE_VARIABLE_QUERY_GET_BY_KEY, new Boolean(true));
		mustacheVariables.put(MUSTACHE_TEMPLATE_VARIABLE_KEY, key);
		mustacheVariables.put(MUSTACHE_TEMPLATE_VARIABLE_VALUE, value);
		System.out.println("ObjectBYKEYVALUE");
		Writer writer = new StringWriter();*/
		//"START n = node(*) WHERE (n." + key + " = \"" + value + "\") RETURN n"
		String query = /*queryGetByKeyMustache.execute(writer, mustacheVariables).toString()*/"START n = node(*) WHERE (n." + key + " = \"" + value + "\") RETURN n";
		System.out.println(query);
		Result<Map<String, Object>> queryResult = neo4jTemplate.query(query, new HashMap<String,Object>());
		System.out.println(queryResult);
		EndResult<T> endResult = queryResult.to(class1);
/*		Neo4jPersistentEntityImpl persistentEntity = ((Neo4jTemplate)neo4jTemplate).getInfrastructure().getMappingContext().getPersistentEntity(class1);
		List<T> ret = new ArrayList<>();
		Iterator iterator = endResult.iterator();
		while(iterator.hasNext()){
			Map resultMap = (Map)iterator.next();
			RestNode a = (RestNode)resultMap.get("n");
			ret.add(((Neo4jTemplate)neo4jTemplate).getInfrastructure().getEntityPersister().
			createEntityFromState(a, class1,persistentEntity.getMappingPolicy(), (Neo4jTemplate)neo4jTemplate));
		}*/
		return endResult.singleOrNull();
	}

	@Override
	public <T> List<T> findAll(Class<T> class1) {
		Iterator<T> resultsIterator = neo4jTemplate.findAll(class1).iterator();
		List<T> resultList = new ArrayList<T>();
	    while (resultsIterator.hasNext())
	    	resultList.add((T)resultsIterator.next());
	    return resultList;
	}
	
	@Override
	public <T> T findOne(Long ID, Class<T> classOfObjectToBeFetched) {
		return neo4jTemplate.findOne(ID, classOfObjectToBeFetched);
	}	
	



	@Override
	public String save(GenericDomain objectToInsert) {
		neo4jTemplate.save(objectToInsert);
		return "success";
	}
	
	@Override
	public GenericDomain saveData(GenericDomain objectToInsert) {
		System.out.println("NEO4j SaveDATA()");
		return neo4jTemplate.save(objectToInsert);
	}
	
	@Override
	public <T> T update(T query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> void delete(T objectToDelete) {
		neo4jTemplate.delete(objectToDelete);
	}

	@Override
	public <P> P getObjectByKey(GenericDomain key, Class<P> type) {
//		neo4jTemplate.findOne(key.getKey(), type);
//		TraversalDescription traversalDescription = Traversal.description();
		
		return null;
	}

	
	public Object getObjectByKey(String key,String value) {
		// TODO Auto-generated method stub
		String query = "START n = node(*) WHERE (n." + key + " = \"" + value + "\") RETURN n";
		Result<Map<String, Object>> result = neo4jTemplate.query(query, new HashMap<String,Object>());

		//TODO: TO BE OPTIMIZED! 
//		Iterator iterator = result.iterator();
/*		while(iterator.hasNext()){
			Map resultMap = (Map)iterator.next();
			RestNode a = (RestNode)resultMap.get("n");
			a.
			System.out.println(a);
		}*/
		return result;
	}

	@Override
	public <T> Iterable<T> traverseFromNode(GenericDomain startElement,Class<T> elementClass) {
		TraversalDescription traversalDescription = Traversal.description().breadthFirst().evaluator(Evaluators.toDepth(10));
		Iterable<T> returnIterable = ((Neo4jTemplate)neo4jTemplate).traverse(startElement, elementClass,traversalDescription);
		return returnIterable;
	}
	
	//Evaluators.excludeStartPosition()
	@Override
	public <T> Iterable<T> traverseFromNodeExcludeStart(GenericDomain startElement,Class<T> elementClass) {
		TraversalDescription traversalDescription = Traversal.description().
				breadthFirst().evaluator(Evaluators.toDepth(10)).
				evaluator(Evaluators.excludeStartPosition());
		Iterable<T> returnIterable = ((Neo4jTemplate)neo4jTemplate).traverse(startElement, elementClass,traversalDescription);
		return returnIterable;
	}
	
	@Override
	public <T> Iterable<T> traverseOneLevelFromNodeExcludeStart(GenericDomain startElement,Class<T> elementClass) {
		TraversalDescription traversalDescription = Traversal.description().
				breadthFirst().evaluator(Evaluators.toDepth(1)).
				evaluator(Evaluators.excludeStartPosition());
		Iterable<T> returnIterable = ((Neo4jTemplate)neo4jTemplate).traverse(startElement, elementClass,traversalDescription);
		return returnIterable;
	}

	@Override
	public <P> P getObjectByKey(String key, String objectKey, Class<P> class1) {
		// TODO Auto-generated method stub
		return null;
	}


	
	
}
