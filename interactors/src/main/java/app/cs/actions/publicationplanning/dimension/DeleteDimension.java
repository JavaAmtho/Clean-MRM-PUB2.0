package app.cs.actions.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.interfaces.dimension.IDimensionRepository;
import app.cs.model.request.DeleteDimensionRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class DeleteDimension implements Interactor {

	private IDimensionRepository dimensionRepository;

	@Autowired
	public DeleteDimension(DimensionRepository dimensionRepository) {
		this.dimensionRepository = dimensionRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {

		DeleteDimensionRequest request = (DeleteDimensionRequest) requestMdel;
		boolean result = dimensionRepository.delete(request.getDimension());
		return new EmptyResponseWithStatus(
				result ? CommonConstants.SUCCESS_RESPONSE : CommonConstants.FAIL_RESPONSE,
						request.getDimension().getId());
	}
}
