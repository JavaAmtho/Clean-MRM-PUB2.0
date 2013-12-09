package app.cs.actions.publicationplanning.tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.TagObject;
import app.cs.impl.tag.TagRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.response.GetAllTagsReponse;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class GetAllTags implements Interactor{

	private TagRepository tagRepository;
	
	@Autowired
	public GetAllTags(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		List<TagObject> result = tagRepository.getAllTags();
		String status = CommonConstants.FAIL_RESPONSE;
		if(result != null){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new GetAllTagsReponse(status, result);
	}
	
}
