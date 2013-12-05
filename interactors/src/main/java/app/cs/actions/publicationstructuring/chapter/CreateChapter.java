package app.cs.actions.publicationstructuring.chapter;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.inmemory.InMemoryUniqueId;
import app.cs.impl.model.DimensionInfo;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.chapter.IChapterRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.CreateChapterRequest;
import app.cs.model.request.CreateDimensionRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.PublicationAssetObjectResponse;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;
import app.cs.utils.CommonConstants;

/**
 * The Class ChapterService.
 */
@Component
public class CreateChapter implements Interactor {

	/** The contentobject. */
	private final String CONTENTOBJECT = "MultiDimensionalObject";

	private IPublicationAssetRepository publicationAssetRepository;
	
	private InMemoryUniqueId inMemoryUniqueId;
	
	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public CreateChapter(IPublicationAssetRepository publicationAssetRepository,
			InMemoryUniqueId inMemoryUniqueId) {
		this.publicationAssetRepository = publicationAssetRepository;
		this.inMemoryUniqueId = inMemoryUniqueId;
	}

	public ResponseModel execute(RequestModel model) {

		String status = CommonConstants.FAIL_RESPONSE;
		CreateChapterRequest request = (CreateChapterRequest) model;
		PublicationAssetObject publicationAsset = new PublicationAssetObject();
		setPublicationAssetAttributes(request, publicationAsset);
		PublicationAssetObject response = publicationAssetRepository.save(publicationAsset);
		if(response != null){
			status  = CommonConstants.SUCCESS_RESPONSE;
		}
		return new PublicationAssetObjectResponse(response,status);
	}

	/**
	 * Sets the chapter atrributes.
	 * 
	 * @param chapter
	 *            the chapter
	 * @param type
	 *            the type
	 * @param name
	 *            the name
	 * @param path
	 *            the path
	 * @param isFolder
	 *            the is folder
	 */
	protected void setPublicationAssetAttributes(CreateChapterRequest request,
			PublicationAssetObject publicationAsset) {
		publicationAsset.setId(inMemoryUniqueId.getUniqueIDForDimensions());
		publicationAsset.setTitle(request.getName());
		publicationAsset.setPath(request.getPath());
		publicationAsset.setType(request.getType());
		publicationAsset.setIsFolder(request.isFolder());
	}

}
