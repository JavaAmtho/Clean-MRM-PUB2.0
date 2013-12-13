package app.cs.actions.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.model.request.AddTaskToDimensionRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ObjectResponse;
import app.cs.model.response.ResponseModel;

@Component
public class AddTaskToDimension implements Interactor {

	private DimensionRepository dimensionRepository;

	@Autowired
	public AddTaskToDimension(DimensionRepository dimensionRepository) {
		this.dimensionRepository = dimensionRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {
		AddTaskToDimensionRequest request = (AddTaskToDimensionRequest) requestModel;
		String status = dimensionRepository.addTaskToDimension(request.getDimensionId(), request.getTask());
		return new ObjectResponse(request.getTask(),status);
	}
}
