package app.cs.impl.tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.model.MarkerObject;
import app.cs.impl.model.TagObject;
import app.cs.interfaces.tag.ITagRepository;

import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;

@Component
public class TagRepository implements ITagRepository{

	private NoSqlRepository mongoRepository;
	
	@Autowired
	public TagRepository(NoSqlRepository mongoRepository) {
		this.mongoRepository = mongoRepository;
	}
	
	@Override
	public boolean createTag(TagObject tag){
		boolean status = mongoRepository.save(tag);
		return status;
	}
	
	@Override
	public List<TagObject> getAllTags(){
		return mongoRepository.findAll(TagObject.class);
	}
}
