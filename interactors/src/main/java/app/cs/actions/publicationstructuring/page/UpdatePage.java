package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.Assortment;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.assortment.IAssortmentRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdateAssortmentRequest;
import app.cs.model.request.UpdatePublicationAssetObjectRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;

@Component
public class UpdatePage implements Interactor {

	private IPublicationAssetRepository publicationAssetRepository;
	
	@Autowired
	public UpdatePage(IPublicationAssetRepository publicationRepository) {
		this.publicationAssetRepository = publicationRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {

		UpdatePublicationAssetObjectRequest updateAssortmentRequest = (UpdatePublicationAssetObjectRequest) requestModel;
		PublicationAssetObject page = updateAssortmentRequest.getPublicationAssetObject();
		publicationAssetRepository.editProperty(page);
		return new EmptyResponse();
	}

}
