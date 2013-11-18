package com.cs.integration;

import java.util.Iterator;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.data.neo4j.conversion.EndResult;
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
		
		GraphSampleData created = (GraphSampleData)neo4jRepo.saveData(given);
		GraphSampleData nodeFromDB = neo4jRepo.findOne(new Long(created.getNodeID()),GraphSampleData.class);
		Assert.assertEquals(given, nodeFromDB);
	}
	
	@Test
	public void shouldTraverseThroughTree() {
		GraphSampleData parent = new GraphSampleData(new Long(01), "Parent");
		GraphSampleData parentChild1 = new GraphSampleData(new Long(02), "Parent->Child1");
		GraphSampleData parentChild2 = new GraphSampleData(new Long(03), "Parent->Child2");
		GraphSampleData child1Child1 = new GraphSampleData(new Long(03), "Child1->Child1");

		GenericDomain createdParent = neo4jRepo.saveData(parent);
		GenericDomain sampleDataRelationship = parentChild1.isChildOf(createdParent, "Son");
		GenericDomain createdParentChild1 = neo4jRepo.saveData(parentChild1);
		GenericDomain createdRelation = neo4jRepo.saveData(sampleDataRelationship);
		sampleDataRelationship = parentChild2.isChildOf(createdParent, "Son");
		GenericDomain createdParentChild2 = neo4jRepo.saveData(parentChild2);
		createdRelation = neo4jRepo.saveData(sampleDataRelationship);
		sampleDataRelationship = child1Child1.isChildOf(createdParentChild1, "Daughter");
		GenericDomain createdChild1Child2 = neo4jRepo.saveData(child1Child1);
		createdRelation = neo4jRepo.saveData(sampleDataRelationship);
		
		
		Iterable nodeList = neo4jRepo.traverseFromNode(parent,GraphSampleData.class);
		Iterator nodeListIterator = nodeList.iterator();
		while(nodeListIterator.hasNext()){
			GraphSampleData node = (GraphSampleData)nodeListIterator.next();
			System.out.println(node);
		}
	}
	
	@Test
	public void shouldFindByName(){
		GraphSampleData given = new GraphSampleData(new Long(100), "Finding By This Name");
		
		GraphSampleData created = (GraphSampleData)neo4jRepo.saveData(given);
		GraphSampleData result = neo4jRepo.getObjectByKeyValue("name", created.getName(),GraphSampleData.class);
//		Iterator<GraphSampleData> resultIterator = result.iterator();
//		while(resultIterator.hasNext()){
//			GraphSampleData resultValue = resultIterator.next();
			Assert.assertEquals(given, result);
//		}

	}
	
	@Test
	public void shouldUpdateDataInNeo4jRepository() {
		GraphSampleData initialData = new GraphSampleData(new Long(100), "I am to be renamed!");
		
		GraphSampleData created = (GraphSampleData)neo4jRepo.saveData(initialData);
		GraphSampleData updated = created;
		updated.setName("My New Name!!");
		neo4jRepo.saveData(updated);
		GraphSampleData nodeFromDB = neo4jRepo.findOne(new Long(created.getNodeID()),GraphSampleData.class);
		Assert.assertEquals(updated.getName(), nodeFromDB.getName());
	}
	
	
	@Test
	public void shouldSaveRelationIntoRepository(){
	
		GraphSampleData parent = new GraphSampleData(new Long(01), "Parent");
		GraphSampleData child1 = new GraphSampleData(new Long(02), "Child1");

		GenericDomain createdParent = neo4jRepo.saveData(parent);
		GenericDomain sampleDataRelationship = child1.isChildOf(createdParent, "Son");
		GenericDomain createdChild1 = neo4jRepo.saveData(child1);
		GenericDomain createdRelation = neo4jRepo.saveData(sampleDataRelationship);
		
		Assert.assertEquals(createdParent, parent);
		Assert.assertEquals(createdChild1, child1);
	}
	
	@Test(expected=DataRetrievalFailureException.class)	//Should throw exception since data is not found
	public void shouldDeleteFromNeo4jRepository() {
		GraphSampleData node1 = new GraphSampleData(new Long(001), "Node1");
		GraphSampleData node2 = new GraphSampleData(new Long(002), "Node2");
		GraphSampleData node3 = new GraphSampleData(new Long(003), "Node3");
		GraphSampleData created = (GraphSampleData)neo4jRepo.saveData(node1);
		created = (GraphSampleData)neo4jRepo.saveData(node2);
		created = (GraphSampleData)neo4jRepo.saveData(node3);
		
		neo4jRepo.delete(created);
		GraphSampleData nodeFromDB = neo4jRepo.findOne(new Long(created.getNodeID()),GraphSampleData.class);
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
