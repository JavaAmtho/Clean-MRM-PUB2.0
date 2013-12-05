package app.cs.controller.publicationstructuring.page;

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
import app.cs.model.response.PublicationAssetObjectResponse;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;
import app.cs.utils.CommonConstants;

@Controller
public class UpdatePageController {

	private Interactor updatePage;
	private UpdatePublicationAssetObjectRequest request;

	@Autowired
	public UpdatePageController(Interactor updatePage,
			UpdatePublicationAssetObjectRequest request) {

		this.updatePage = updatePage;
		this.request = request;
	}

	@RequestMapping(value = "/page/update/{id}")
	public @ResponseBody ResponseModel execute(@RequestBody PublicationAssetObject page) {

		request.setPublicationAssetObject(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_PAGE,page);
		ResponseModel response = updatePage.execute(request);
		return response;
	}

}
