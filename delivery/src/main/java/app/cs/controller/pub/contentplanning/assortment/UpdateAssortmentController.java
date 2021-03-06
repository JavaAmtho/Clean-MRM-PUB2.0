package app.cs.controller.pub.contentplanning.assortment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.Assortment;
import app.cs.model.request.UpdateAssortmentRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class UpdateAssortmentController {

	private Interactor updateAssortment;
	private UpdateAssortmentRequest request;

	@Autowired
	public UpdateAssortmentController(Interactor updateAssortment,
			UpdateAssortmentRequest request) {

		this.updateAssortment = updateAssortment;
		this.request = request;
	}

	@RequestMapping(value = "/assortment/update/{id}/{path}")
	public @ResponseBody ResponseModel execute(@RequestBody Assortment assortment,
			@PathVariable String id, @PathVariable String path) {

		request.setAssortment(assortment);
		request.setPath(path);
		request.setName(id);

		ResponseModel response = updateAssortment.execute(request);
		return response;
	}

}
