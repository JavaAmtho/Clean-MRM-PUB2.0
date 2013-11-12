package com.cs.integration;

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
		
		GraphSampleData amar = new GraphSampleData(new Long(100), "HELLO!");
		
		GenericDomain ret = neo4jRepo.saveData(amar);
		if(ret instanceof GraphSampleData){
			System.out.println("HELLO!");
		}
	}
	
	@Test
	public void shouldRetrieveFromNeo4jRepository(){
		
	}
	
}
