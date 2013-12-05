package app.cs.actions.contentplanning.assortment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.interfaces.assortment.IAssortmentRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.GetAllAssortmentsRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;

@Component
public class GetAllAssortments implements Interactor {

	private IPublicationAssetRepository publicationAssetRepository;

	@Autowired
	public GetAllAssortments(IPublicationAssetRepository publicationAssetRepository) {
		this.publicationAssetRepository = publicationAssetRepository;

	}

	public ResponseModel execute(RequestModel request) {
		GetAllAssortmentsRequest getAllAssortmentsRequest = (GetAllAssortmentsRequest) request;
		/*return new StringResponse(publicationAssetRepository.getAllAssortmentNames(
				getAllAssortmentsRequest.getPagePath(),
				getAllAssortmentsRequest.getLogicalPageID()));*/
		return null;
	}
}
