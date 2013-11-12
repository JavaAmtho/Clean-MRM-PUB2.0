package com.cs.data.core.nosql.neo4j;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.mapping.Neo4jEntityConverter;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.stereotype.Repository;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

@Repository
public class Neo4jRepository implements NoSqlNeo4jRepository {
	
	private Neo4jOperations neo4jTemplate;
	
	@Autowired
	public Neo4jRepository(Neo4jOperations neo4jTemplate) {
		this.neo4jTemplate = neo4jTemplate;
	}
	
	@Override
	public <P> P getObjectByKey(String key, String objectKey, Class<P> class1) {
		// TODO Auto-generated method stub
		return null;
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
	public String save(GenericDomain objectToInsert) {
		neo4jTemplate.save(objectToInsert);
		return "inserted";
	}
	
	public GenericDomain saveData(GenericDomain objectToInsert) {
		return neo4jTemplate.save(objectToInsert);
	}

	@Override
	public <T> T update(T query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> void delete(T objectToDelete) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <P> P getObjectByKey(GenericDomain key, Class<P> type) {
//		neo4jTemplate.findOne(key.getKey(), type);
		return null;
	}	
	
	
	
}
