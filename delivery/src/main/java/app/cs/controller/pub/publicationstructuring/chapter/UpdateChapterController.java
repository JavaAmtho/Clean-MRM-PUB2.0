package app.cs.controller.pub.publicationstructuring.chapter;

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
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;
import app.cs.utils.CommonConstants;

@Controller
public class UpdateChapterController {

	private Interactor updateChapter;
	private UpdatePublicationAssetObjectRequest request;

	@Autowired
	public UpdateChapterController(Interactor updateChapter,
			UpdatePublicationAssetObjectRequest request) {

		this.updateChapter = updateChapter;
		this.request = request;
	}

	@RequestMapping(value = "/chapter/update/{id}")
	public @ResponseBody ResponseModel execute(@RequestBody PublicationAssetObject chapter) {
		request.setPublicationAssetObject(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_CHAPTER,chapter);
		ResponseModel response = updateChapter.execute(request);
		return response;
	}

}
