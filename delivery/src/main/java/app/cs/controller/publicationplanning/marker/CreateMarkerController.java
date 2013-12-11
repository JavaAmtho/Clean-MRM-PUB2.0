package app.cs.controller.publicationplanning.marker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.CreateMarkerRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class CreateMarkerController {

	/** The Constant CREATE. */
	private static final String CREATE = "/marker/create/{name}";
	
	private CreateMarkerRequest createMarkerRequest;
	private Interactor createMarker;
	
	@Autowired
	public CreateMarkerController(Interactor createMarker, 
			CreateMarkerRequest createMarkerRequest) {
		this.createMarker = createMarker;
		this.createMarkerRequest = createMarkerRequest;
	}
	
	
	@RequestMapping(value = { CREATE })
	public @ResponseBody
	ResponseModel create(@PathVariable("name") String markerName) {
		createMarkerRequest.setMarkerName(markerName);
		return createMarker.execute(createMarkerRequest);
	}
	
}
