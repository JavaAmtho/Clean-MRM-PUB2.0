package app.cs.actions.publicationplanning.dimension;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.interfaces.dimension.IDimensionRepository;
import app.cs.model.request.GetDimensionByIdRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.TreeResponse;
import app.cs.model.response.TreeResponseModel;
import app.cs.utils.CommonConstants;


//TODO:::REMOVED INTERACTOR IMPLEMENTAION!!!PLEASE CHECK AND CHAGNGE!!
@Component
public class GetPublicationsForGivenChannel implements Interactor{

	private IDimensionRepository dimensionRepository;

	@Autowired
	public GetPublicationsForGivenChannel(
			DimensionRepository dimensionRepository) {
		this.dimensionRepository = dimensionRepository;
	}

	public ResponseModel execute(RequestModel model) {
		GetDimensionByIdRequest dimensionByIdRequest = (GetDimensionByIdRequest) model;
		String status = CommonConstants.FAIL_RESPONSE;
		List<MultiDimensionalObject> response = dimensionRepository.getDimensionsBy(
				"Publication", dimensionByIdRequest.groupIds);
		if(response != null){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new EmptyResponse();
	}

}
