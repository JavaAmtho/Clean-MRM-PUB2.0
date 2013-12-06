package app.cs.actions.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.model.request.EditDimensionRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdateMarkersRequest;
import app.cs.model.request.UpdateTagsRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;

@Component
public class UpdateMarkersForDimension implements Interactor {

	private DimensionRepository dimensionRepository;

	@Autowired
	public UpdateMarkersForDimension(DimensionRepository dimensionRepository) {
		this.dimensionRepository = dimensionRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {
		UpdateMarkersRequest request = (UpdateMarkersRequest) requestModel;
		String status = dimensionRepository.updateMarkers(request.getId(), request.getMarkers());
		return new EmptyResponseWithStatus(status, request.getId());
	}
}
