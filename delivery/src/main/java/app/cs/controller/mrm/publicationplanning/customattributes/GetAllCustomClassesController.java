package app.cs.controller.mrm.publicationplanning.customattributes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.EmptyRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class GetAllCustomClassesController {

	/** The Constant CREATE. */
	private static final String GET = "/customClasses/getAll";
	
	private Interactor getAllCustomClasses;
	
	@Autowired
	public GetAllCustomClassesController(Interactor getAllCustomClasses) {
		this.getAllCustomClasses = getAllCustomClasses;
	}
	
	
	@RequestMapping(value = { GET })
	public @ResponseBody
	ResponseModel create() {
		return getAllCustomClasses.execute(new EmptyRequest());
	}
	
}
