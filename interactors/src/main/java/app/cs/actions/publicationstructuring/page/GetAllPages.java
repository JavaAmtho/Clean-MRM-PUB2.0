package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.publicationasset.PublicationAssetRepository;
import app.cs.model.request.GetAllPagesRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.ResponseModel;

@Component
public class GetAllPages implements Interactor {

	private PublicationAssetRepository publicationAssetRepository;

	@Autowired
	public GetAllPages(PublicationAssetRepository repository) {
		this.publicationAssetRepository = repository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		GetAllPagesRequest getAllPagesRequest = (GetAllPagesRequest) requestMdel;
		/*return new TreeResponse(
				publicationAssetRepository.getAllPages(getAllPagesRequest
						.getPublicationId()));*/
		return null;
	}

}
