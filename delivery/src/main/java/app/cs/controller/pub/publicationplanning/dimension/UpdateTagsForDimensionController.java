package app.cs.controller.pub.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationplanning.dimension.EditTagsForDimension;
import app.cs.model.request.UpdateTagsRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class UpdateTagsForDimensionController {
	private EditTagsForDimension editTagsForDimension;

	@Autowired
	public UpdateTagsForDimensionController(EditTagsForDimension editTagsForDimension) {
		this.editTagsForDimension = editTagsForDimension;
	}

	@RequestMapping(value = "/dimension/updateTag/{dimensionId}")
	public @ResponseBody
           	ResponseModel execute(@RequestBody UpdateTagsRequest request) {
		ResponseModel response = editTagsForDimension.execute(request);
		return response;

	}

}
