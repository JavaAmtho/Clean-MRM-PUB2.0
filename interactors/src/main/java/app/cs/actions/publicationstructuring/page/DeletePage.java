package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.dimension.DimensionRepository;
import app.cs.interfaces.dimension.IDimensionRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.DeleteDimensionRequest;
import app.cs.model.request.DeletePublicationAssetRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;

@Component
public class DeletePage implements Interactor {

	private IPublicationAssetRepository publicationAssetRepository;

	@Autowired
	public DeletePage(IPublicationAssetRepository publicationAssetRepository) {
		this.publicationAssetRepository = publicationAssetRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {

		DeletePublicationAssetRequest request = (DeletePublicationAssetRequest) requestMdel;
		publicationAssetRepository.delete(request.getPublicationAsset());
		return new EmptyResponse();
	}
}
