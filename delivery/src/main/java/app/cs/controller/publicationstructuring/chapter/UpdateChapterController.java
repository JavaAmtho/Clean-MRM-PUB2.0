package app.cs.controller.publicationstructuring.chapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.Assortment;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.model.request.UpdateAssortmentRequest;
import app.cs.model.request.UpdatePublicationAssetObjectRequest;

@Controller
public class UpdateChapterController {

	private Interactor updateChapter;
	private UpdatePublicationAssetObjectRequest request;

	@Autowired
	public UpdateChapterController(Interactor updateAssortment,
			UpdatePublicationAssetObjectRequest request) {

		this.updateChapter = updateAssortment;
		this.request = request;
	}

	@RequestMapping(value = "/assortment/update/{id}")
	public @ResponseBody String execute(@RequestBody PublicationAssetObject chapter) {

		request.setPublicationAssetObject(chapter);

		updateChapter.execute(request);
		return "Updated";
	}

}
