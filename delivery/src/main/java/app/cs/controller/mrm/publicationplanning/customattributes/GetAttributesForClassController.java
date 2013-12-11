package app.cs.controller.mrm.publicationplanning.customattributes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.EmptyRequest;
import app.cs.model.request.GetAttributesForClassRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class GetAttributesForClassController {

	/** The Constant CREATE. */
	private static final String GET = "/customClasses/getAttributes/{classId}";
	
	private Interactor getAttributesForClass;
	
	@Autowired
	public GetAttributesForClassController(Interactor getAttributesForClass) {
		this.getAttributesForClass = getAttributesForClass;
	}
	
	
	@RequestMapping(value = { GET })
	public @ResponseBody
	ResponseModel create(@PathVariable String classId) {
		return getAttributesForClass.execute(new GetAttributesForClassRequest(classId));
	}
	
}
