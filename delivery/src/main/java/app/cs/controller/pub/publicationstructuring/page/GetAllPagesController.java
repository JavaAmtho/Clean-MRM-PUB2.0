package app.cs.controller.pub.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationstructuring.page.GetAllPages;
import app.cs.model.request.GetAllPagesRequest;
import app.cs.model.response.TreeResponseModel;

@Controller
public class GetAllPagesController {

	private GetAllPages getAllPages;
	private GetAllPagesRequest request;

	@Autowired
	public GetAllPagesController(GetAllPages getAllPages,
			GetAllPagesRequest request) {
		this.getAllPages = getAllPages;
		this.request = request;
	}

	@RequestMapping(value = "/page/all/{publicationId}")
	public @ResponseBody
	TreeResponseModel get(@PathVariable String publicationId) {
		request.setPublicationId(publicationId);
		//return getAllPages.execute(request);
		//TODO:: Fix this!!
		return null;

	}
}
