package com.cs.data.core.nosql.neo4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.RelationshipType;
import org.neo4j.graphdb.traversal.Evaluators;
import org.neo4j.graphdb.traversal.TraversalDescription;
import org.neo4j.kernel.Traversal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.EndResult;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.stereotype.Repository;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

@Repository
public class Neo4jRepository implements NoSqlNeo4jRepository {
	
	private enum Rels implements RelationshipType
	{
	    CHILD_OF
	}
	
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
		String query = /*queryGetByKeyMustache.execute(writer, mustacheVariables).toString()*/"START n = node(*) WHERE (HAS(n."+key+") and n." + key + " = \"" + value + "\") RETURN n";
		Result<Map<String, Object>> queryResult = neo4jTemplate.query(query, new HashMap<String,Object>());
		EndResult<T> endResult = queryResult.to(class1);
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
		return neo4jTemplate.save(objectToInsert);
	}
	
	@Override
	public <T> T update(T query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteSelfAndAllItsChildren(String key,String value) {
//		neo4jTemplate.delete(objectToDelete);
		String query = "START parentNode = node(*) "
						+ "MATCH parentNode<-[incomingRelationships?*]-child, "
								+ "parentNode-[outgoingRelationships?]->parent "
						+ "WHERE ("
						+ "HAS(parentNode." + key + ") "
						+ "AND parentNode." + key + " = \"" + value + "\""
						+ ") "
						+ "foreach(relation in incomingRelationships:delete relation) "
						+ "DELETE outgoingRelationships,child,parentNode";
		
		System.out.println(query);
		String response;
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
			System.out.println("SUCCESS");
			response = "success";
		}
		catch(Exception e){
			System.out.println("Failed" + e.getMessage());
			response = "failed";
		}
		return response;
	
	}
	
/*	@Override
	public String deleteMultipleNodesAndAllItsChildren(String key,String value) {
//		neo4jTemplate.delete(objectToDelete);
		String query = "START parentNode = node(*) "
						+ "MATCH parentNode<-[incomingRelationships*]-child, "
								+ "parentNode-[outgoingRelationships?]->parent "
						+ "WHERE ("
						+ "HAS(parentNode." + key + ") "
						+ "AND parentNode." + key + " = \"" + value + "\""
						+ ") "
						+ "foreach(relation in incomingRelationships:delete relation) "
						+ "DELETE outgoingRelationships,child,parentNode";
		
		System.out.println(query);
		String response;
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
			System.out.println("SUCCESS");
			response = "success";
		}
		catch(Exception e){
			System.out.println("Failed" + e.getMessage());
			response = "failed";
		}
		return response;
	
	}*/

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
	public <T> Iterator traverseIncomingRelationships(String key, String value,String relationship,Class<T> elementClass) {
		/*TraversalDescription traversalDescription = Traversal.description().
				breadthFirst().evaluator(Evaluators.toDepth(10)).
				evaluator(Evaluators.excludeStartPosition());
		Iterable<T> returnIterable = ((Neo4jTemplate)neo4jTemplate).traverse(startElement, elementClass,traversalDescription);*/
		String query = "START parentNode = node(*) "
						+ "MATCH parentNode<-[:" + relationship + "]-child "
						+ "WHERE ("
						+ "HAS(parentNode." + key + ") "
						+ "AND parentNode." + key + " = \"" + value + "\""
						+ ") "
						+ "RETURN child";
		
		EndResult<T> endResult = null;
		try{
			Result<Map<String, Object>> queryResult = neo4jTemplate.query(query, new HashMap<String,Object>());
			endResult = queryResult.to(elementClass);
		}
		catch(Exception e){
			System.out.println("Failed" + e.getMessage());
			return null;
		}
		System.out.println("return success");
		return endResult.iterator();
	}	
	
	@Override
	public String editProperties(String findKey, String findValue,Map<String,String> properties) {
		String query = "START parentNode = node(*) "
						+ "WHERE ("
						+ "HAS(parentNode." + findKey + ") "
						+ "AND parentNode." + findKey + " = \"" + findValue + "\""
//						+ "AND HAS(parentNode." + propertyName + ")"
						+ ") "
						+ "SET ";
		
		Set<String> entrySet = properties.keySet();
		for (String property : entrySet) {
			query += "parentNode." + property + " = \"" + properties.get(property) + "\",";
		}
		query = query.substring(0, query.length()-1);
		
		System.out.println(query);
		String response = "failed";
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
			response = "success";
			System.out.println("return success");
		}
		
		catch(Exception e){
			System.out.println("Failed" + e.getMessage());
		}
		return response;
	}	
	
	@Override
	public <T> Iterable<T> traverseOneLevelFromNodeExcludeStart(GenericDomain startElement,Class<T> elementClass) {
		TraversalDescription traversalDescription = Traversal.description().
				breadthFirst().evaluator(Evaluators.toDepth(1)).relationships(Rels.CHILD_OF,Direction.INCOMING ).
				evaluator(Evaluators.excludeStartPosition());
		Iterable<T> returnIterable = null;

		returnIterable = ((Neo4jTemplate)neo4jTemplate).traverse(startElement, elementClass,traversalDescription);

		return returnIterable;
	}
	
	@Override
	public String deleteAllNodesByRelationship(String parentKey,String parentValue, String relationship) {
		
		String query = "START parentNode = node(*) "
				+ "MATCH parentNode<-[relation:" + relationship + "]-childNode "
				+ "WHERE ("
					+ "HAS(parentNode." + parentKey + ") "
					+ "AND parentNode." + parentKey + " = \"" + parentValue + "\""
				+ ")"
				+ "DELETE relation,childNode";
		
		
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
		}
		catch(Exception e){
			System.out.println("return Failed");
			return "failed";
		}
		System.out.println("return success");
		return "success";
	}
	
	@Override
	public <E, T> String createMultipleRelationships(String parentKey,String parentValue,List<E> childNodes,String relationship) {
		
		String query = "START parentNode = node(*) "
				+ "WHERE ("
					+ "HAS(parentNode." + parentKey + ") "
					+ "AND parentNode." + parentKey + " = \"" + parentValue + "\""
				+ ")"
				+ "CREATE ";
		for (E node : childNodes) {
			query += "parentNode<-[:" + relationship.toUpperCase() + "]-(" + node.toString() + "),";
		}
		query = query.substring(0, query.length()-1);
		
		
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
		}
		catch(Exception e){
			System.out.println("Failed");
			return "failed";
		}
		System.out.println("return success");
		return "success";
	}
	
	@Override
	public String changeRelationship(String keyToFindNode, String valueOfKey, String newParentValueOfKey, String newRelationshipType){
		
		String query = "START modifyNode = node(*), newParentNode = node(*) "
				+ "MATCH oldParentNode<-[r]-modifyNode "
				+ "WHERE ("
				+ "(HAS(modifyNode." + keyToFindNode + ") "
				+ "AND modifyNode." + keyToFindNode + " = \"" + valueOfKey + "\") AND "
				+ "(HAS(newParentNode." + keyToFindNode + ") "
				+ "AND newParentNode." + keyToFindNode + " = \"" + newParentValueOfKey + "\")"
				+ ") "
				+ "CREATE newParentNode<-[:" + newRelationshipType + "]-modifyNode "
				+ "DELETE r";
		
		System.out.println(query);
		try{
			neo4jTemplate.query(query, new HashMap<String,Object>());
		}
		catch(Exception e){
			System.out.println("Failed");
			return "failed";
		}
		System.out.println("return success");
		return "success";
		
	}
	
/*	public <T> Iterator getAllChildren(String key, String value, Class<T> class1) {

		String query = queryGetByKeyMustache.execute(writer, mustacheVariables).toString()"START n = node(*) WHERE (HAS(n."+key+") and n." + key + " = \"" + value + "\") RETURN n";
		Result<Map<String, Object>> queryResult = neo4jTemplate.query(query, new HashMap<String,Object>());
		EndResult<T> endResult = queryResult.to(class1);
		return endResult.iterator();

	}*/
	
	@Override
	public <T> Iterator<T> getChildrenUnderParentByType(String parentId,String type,Class<T> entityClass){
		//TODO: make generic types to search
		String query = "START parentNode = node(*) "
				+ "MATCH parentNode<-[]-child "
				+ "WHERE ("
				+ "(HAS(parentNode.id) "
				+ "AND parentNode.id = \"" + parentId + "\") "
				+ "AND "
				+ "(HAS(child.type) "
				+ "AND child.type = \"" + type + "\")"
				+ ") "
				+ "RETURN child";

		EndResult<T> endResult = null;
		try{
			Result<Map<String, Object>> queryResult = neo4jTemplate.query(query, new HashMap<String,Object>());
			endResult = queryResult.to(entityClass);
		}
		catch(Exception e){
			System.out.println("Failed" + e.getMessage());
			return null;
		}
		System.out.println("return success");
		return endResult.iterator();
	}

	@Override
	public <P> P getObjectByKey(String key, String objectKey, Class<P> class1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> void delete(T objectToDelete) {
		// TODO Auto-generated method stub
	}
}
