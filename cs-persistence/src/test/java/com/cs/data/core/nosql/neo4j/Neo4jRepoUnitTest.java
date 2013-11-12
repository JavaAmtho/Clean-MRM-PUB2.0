package com.cs.data.core.nosql.neo4j;

import static org.mockito.Mockito.verify;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.neo4j.support.Neo4jTemplate;

import com.cs.data.core.jpa.entities.Student;


public class Neo4jRepoUnitTest {


	@Mock
	Neo4jTemplate template;

	@Mock
	Student student;
	
	Neo4jRepository neo4jRepo;
	
	@Before
	public void setup(){
		MockitoAnnotations.initMocks(this);
		neo4jRepo = new Neo4jRepository(template);

	}
	
	
	@Test
	public void shouldSaveIntoNeo4jRepository() {
		neo4jRepo.save(student);
		verify(template).save(student);
	}
	
}
