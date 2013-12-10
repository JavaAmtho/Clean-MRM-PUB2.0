package app.cs.actions.publicationplanning.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.TagObject;
import app.cs.impl.tag.TagRepository;
import app.cs.model.request.CreateTagRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class CreateTag implements Interactor{

	private TagRepository tagRepository;
	
	@Autowired
	public CreateTag(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		CreateTagRequest request = (CreateTagRequest)requestMdel;
		TagObject tag = new TagObject(request.getTagName());
		boolean result = tagRepository.createTag(tag);
		String status = CommonConstants.FAIL_RESPONSE;
		if(result){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new EmptyResponseWithStatus(status,request.getTagName());
	}
	
}
