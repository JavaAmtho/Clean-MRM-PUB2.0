package app.cs.actions.publicationplanning.marker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.MarkerObject;
import app.cs.impl.tag.TagRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.response.GetAllMarkersResponse;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class GetAllMarkers implements Interactor{

	private TagRepository tagRepository;
	
	@Autowired
	public GetAllMarkers(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		List<MarkerObject> result = tagRepository.getAllMarkers();
		String status = CommonConstants.FAIL_RESPONSE;
		if(result != null){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new GetAllMarkersResponse(status, result);
	}
	
}
