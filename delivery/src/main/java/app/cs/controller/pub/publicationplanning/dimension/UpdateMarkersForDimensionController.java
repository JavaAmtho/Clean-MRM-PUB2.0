package app.cs.controller.pub.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.UpdateMarkersRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class UpdateMarkersForDimensionController {
	private Interactor updateMarkersForDimension;

	@Autowired
	public UpdateMarkersForDimensionController(Interactor updateMarkersForDimension) {
		this.updateMarkersForDimension = updateMarkersForDimension;
	}

	@RequestMapping(value = "/dimension/updateMarker/{dimensionId}")
	public @ResponseBody
           	ResponseModel execute(@RequestBody UpdateMarkersRequest request) {
		ResponseModel response = updateMarkersForDimension.execute(request);
		return response;

	}

}
