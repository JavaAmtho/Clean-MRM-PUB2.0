package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdatePageEditorURLRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;

@Component
public class UpdateEditUrlOfPage implements Interactor {

	private IPublicationAssetRepository publicationAssetRepository;
	
	@Autowired
	public UpdateEditUrlOfPage(IPublicationAssetRepository publicationRepository) {
		this.publicationAssetRepository = publicationRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {

		UpdatePageEditorURLRequest updatePageEditorURLRequest = (UpdatePageEditorURLRequest) requestModel;
		publicationAssetRepository.updateEditURLOfPage(updatePageEditorURLRequest.getPageId(),
				updatePageEditorURLRequest.getEditorUrl());
		return new EmptyResponse();
	}
	

}
