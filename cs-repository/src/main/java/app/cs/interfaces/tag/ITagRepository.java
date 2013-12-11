package app.cs.interfaces.tag;

import java.util.List;

import app.cs.impl.model.TagObject;

public interface ITagRepository {

	public boolean createTag(TagObject tag);

	public List<TagObject> getAllTags();

}
