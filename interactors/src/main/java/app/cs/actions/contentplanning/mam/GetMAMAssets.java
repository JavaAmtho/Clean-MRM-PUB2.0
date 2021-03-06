package app.cs.actions.contentplanning.mam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.interfaces.mam.AssetsRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.request.StringRequest;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;

/**
 * @author Amar
 *
 */
@Component
public class GetMAMAssets implements Interactor {

	private AssetsRepository mamRepository;

	@Autowired
	public GetMAMAssets(AssetsRepository mamRepository) {
		this.mamRepository = mamRepository;
	}

	public ResponseModel execute(RequestModel model) {
		StringRequest request = (StringRequest) model;
		return new StringResponse(mamRepository.getAssetsFor(request
				.getStringRequest()));

	}

}