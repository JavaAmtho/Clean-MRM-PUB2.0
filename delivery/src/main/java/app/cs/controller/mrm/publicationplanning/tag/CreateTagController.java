package app.cs.controller.mrm.publicationplanning.tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.DimensionInfo;
import app.cs.model.request.CreateDimensionRequest;
import app.cs.model.request.CreateTagRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class CreateTagController {

	/** The Constant CREATE. */
	private static final String CREATE = "/tag/create/{name}";
	
	private CreateTagRequest createTagRequest;
	private Interactor createTag;
	
	@Autowired
	public CreateTagController(Interactor createTag, 
			CreateTagRequest createTagRequest) {
		this.createTag = createTag;
		this.createTagRequest = createTagRequest;
	}
	
	
	@RequestMapping(value = { CREATE })
	public @ResponseBody
	ResponseModel create(@PathVariable("name") String tagName) {
		createTagRequest.setTagName(tagName);
		return createTag.execute(createTagRequest);

	}
	
}
