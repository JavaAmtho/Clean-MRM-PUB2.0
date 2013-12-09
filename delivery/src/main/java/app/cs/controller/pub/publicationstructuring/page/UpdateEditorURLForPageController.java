package app.cs.controller.pub.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationstructuring.page.UpdateEditUrlOfPage;
import app.cs.model.request.UpdatePageEditorURLRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class UpdateEditorURLForPageController {

	private UpdateEditUrlOfPage updateEditUrlOfPage;

	@Autowired
	public UpdateEditorURLForPageController(UpdateEditUrlOfPage updateEditUrlOfPage) {

		this.updateEditUrlOfPage = updateEditUrlOfPage;
	}

	@RequestMapping(value = "/page/updateEditorURL/{pageId}")
	public @ResponseBody ResponseModel execute(@RequestBody UpdatePageEditorURLRequest request) {

		ResponseModel response = updateEditUrlOfPage.execute(request);
		return response;
	}

}
