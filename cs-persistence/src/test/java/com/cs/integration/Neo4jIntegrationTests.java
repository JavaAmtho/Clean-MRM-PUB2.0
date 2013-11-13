package com.cs.integration;

import java.util.Iterator;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.cs.data.api.core.GenericDomain;
import com.cs.data.core.jpa.entities.GraphSampleData;
import com.cs.data.core.nosql.neo4j.Neo4jRepository;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:application-context-test.xml")
public class Neo4jIntegrationTests {

	@Autowired
	Neo4jTemplate neo4jTemplate;

	Neo4jRepository neo4jRepo;
	
	@Before
	public void setup(){
		neo4jRepo = new Neo4jRepository(neo4jTemplate);

	}
	
	
	@Test
	public void shouldSaveIntoNeo4jRepository() {
		GraphSampleData given = new GraphSampleData(new Long(100), "HELLO!");
		
		GenericDomain created = neo4jRepo.saveData(given);
		Assert.assertEquals(given, created);
	}
	
	@Test
	public void shouldSaveRelationIntoRepository(){
	
		GraphSampleData parent = new GraphSampleData(new Long(01), "Parent");
		GraphSampleData child1 = new GraphSampleData(new Long(01), "Child1");
//		GraphSampleData given = new GraphSampleData(new Long(01), "Child2");
		

		GenericDomain createdParent = neo4jRepo.saveData(parent);
		GenericDomain sampleDataRelationship = child1.isChildOf(createdParent, "Son");
		GenericDomain createdChild1 = neo4jRepo.saveData(child1);
		GenericDomain createdRelation = neo4jRepo.saveData(sampleDataRelationship);
		Assert.assertEquals(createdParent, parent);
		Assert.assertEquals(createdChild1, child1);
		Assert.assertEquals(createdRelation, sampleDataRelationship);
	
	
	}
	
	@Test
	public void shouldRetrieveAllFromNeo4jRepository(){
		 //System.out.println(neo4jRepo.findAll(GraphSampleData.class));
		 Iterator<GraphSampleData> resultsIterator = neo4jTemplate.findAll(GraphSampleData.class).iterator();
		    while (resultsIterator.hasNext()){
		    	GraphSampleData graphSampleData = resultsIterator.next();
		    	//System.out.println(graphSampleData.getNodeID()+"--"+graphSampleData.getId()+"--"+graphSampleData.getName());
		    }
	}
	
	@Test
	public void shouldRetrieveFromNeo4jRepository(){
		GraphSampleData graphSampleData = neo4jRepo.findOne(new Long(22),GraphSampleData.class);
		System.out.println(graphSampleData.getNodeID()+"--"+graphSampleData.getId()+"--"+graphSampleData.getName());
		 
	}
	
}
