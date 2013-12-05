package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdatePageEditorURLRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

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
		boolean result = publicationAssetRepository.updateEditURLOfPage(updatePageEditorURLRequest.getPageId(),
				updatePageEditorURLRequest.getEditorUrl(), updatePageEditorURLRequest.getMamFileId());
		return new EmptyResponseWithStatus(
				result ? CommonConstants.SUCCESS_RESPONSE : CommonConstants.FAIL_RESPONSE);
	}
	

}
