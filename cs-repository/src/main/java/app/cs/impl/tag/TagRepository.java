package app.cs.impl.tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.model.MarkerObject;
import app.cs.impl.model.TagObject;

import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;

@Component
public class TagRepository {

	private NoSqlRepository mongoRepository;
	
	@Autowired
	public TagRepository(NoSqlRepository mongoRepository) {
		this.mongoRepository = mongoRepository;
	}
	
	public boolean createTag(TagObject tag){
		boolean status = mongoRepository.save(tag);
		return status;
	}
	
	public List<TagObject> getAllTags(){
		return mongoRepository.findAll(TagObject.class);
	}
	
	public List<MarkerObject> getAllMarkers(){
		return mongoRepository.findAll(MarkerObject.class);
	}

	
}
