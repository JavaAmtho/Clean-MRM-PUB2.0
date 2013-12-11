package app.cs.actions.publicationplanning.marker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.marker.MarkerRepository;
import app.cs.impl.model.MarkerObject;
import app.cs.impl.model.TagObject;
import app.cs.impl.tag.TagRepository;
import app.cs.model.request.CreateMarkerRequest;
import app.cs.model.request.CreateTagRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class CreateMarker implements Interactor{

	private MarkerRepository markerRepository;
	
	@Autowired
	public CreateMarker(MarkerRepository markerRepository) {
		this.markerRepository = markerRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		CreateMarkerRequest request = (CreateMarkerRequest)requestMdel;
		MarkerObject marker = new MarkerObject(request.getMarkerName());
		boolean result = markerRepository.createMarker(marker);
		String status = CommonConstants.FAIL_RESPONSE;
		if(result){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new EmptyResponseWithStatus(status,request.getMarkerName());
	}
	
}
