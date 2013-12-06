package app.cs.actions.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.model.request.EditDimensionRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdateTagsRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;

@Component
public class EditTagsForDimension implements Interactor {

	private DimensionRepository dimensionRepository;

	@Autowired
	public EditTagsForDimension(DimensionRepository dimensionRepository) {
		this.dimensionRepository = dimensionRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {
		UpdateTagsRequest request = (UpdateTagsRequest) requestModel;
		String status = dimensionRepository.updateTags(request.getId(), request.getTags());
		return new EmptyResponseWithStatus(status, request.getId());
	}
}
