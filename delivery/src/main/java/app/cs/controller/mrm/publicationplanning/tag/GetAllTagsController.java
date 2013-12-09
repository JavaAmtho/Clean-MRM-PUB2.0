package app.cs.controller.mrm.publicationplanning.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.CreateTagRequest;
import app.cs.model.request.EmptyRequest;
import app.cs.model.response.ResponseModel;


@Controller
public class GetAllTagsController {

	/** The Constant CREATE. */
	private static final String GET = "/tag/getAll";
	
	private Interactor getAllTags;
	
	@Autowired
	public GetAllTagsController(Interactor getAllTags) {
		this.getAllTags = getAllTags;
	}
	
	
	@RequestMapping(value = { GET })
	public @ResponseBody
	ResponseModel create() {
		return getAllTags.execute(new EmptyRequest());
	}
	
}
