package app.cs.controller.publicationplanning.marker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.CreateTagRequest;
import app.cs.model.request.EmptyRequest;
import app.cs.model.response.ResponseModel;


@Controller
public class GetAllMarkersController {

	/** The Constant CREATE. */
	private static final String GET = "/marker/getAll";
	
	private Interactor getAllMarkers;
	
	@Autowired
	public GetAllMarkersController(Interactor getAllMarkers) {
		this.getAllMarkers = getAllMarkers;
	}
	
	
	@RequestMapping(value = { GET })
	public @ResponseBody
	ResponseModel create() {
		return getAllMarkers.execute(new EmptyRequest());
	}
	
}
