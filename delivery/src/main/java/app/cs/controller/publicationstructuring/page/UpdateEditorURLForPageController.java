package app.cs.controller.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.UpdatePageEditorURLRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;

@Controller
public class UpdateEditorURLForPageController {

	private Interactor updateEditUrlOfPage;

	@Autowired
	public UpdateEditorURLForPageController(Interactor updateEditUrlOfPage) {

		this.updateEditUrlOfPage = updateEditUrlOfPage;
	}

	@RequestMapping(value = "/page/updateEditorURL/{pageId}")
	public @ResponseBody ResponseModel execute(@RequestBody UpdatePageEditorURLRequest request) {

		ResponseModel response = updateEditUrlOfPage.execute(request);
		return response;
	}

}
