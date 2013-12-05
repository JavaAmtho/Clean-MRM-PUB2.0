package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.chapter.IChapterRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.MovePageRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;
import app.cs.utils.CommonConstants;

/**
 * The Class ChapterService.
 */
@Component
public class MovePage implements Interactor {

	/** The contentobject. */
	private final String CONTENTOBJECT = "MultiDimensionalObject";

	private IPublicationAssetRepository publicationAssetRepository;

	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public MovePage(IPublicationAssetRepository publicationAssetRepository) {
		this.publicationAssetRepository = publicationAssetRepository;
	}

	public ResponseModel execute(RequestModel model) {
		MovePageRequest request = (MovePageRequest) model;

		PublicationAssetObject page = new PublicationAssetObject();
		setPageAtrributes(page, request.getType(), request.getId(),
				request.getPath(), request.isFolder());
		boolean response = publicationAssetRepository.move(page, request.getNewPath());
		return new EmptyResponseWithStatus(response ? CommonConstants.SUCCESS_RESPONSE : CommonConstants.FAIL_RESPONSE,request.getId());

	}

	/**
	 * Sets the chapter atrributes.
	 * 
	 * @param page
	 *            the chapter
	 * @param type
	 *            the type
	 * @param id
	 *            the name
	 * @param path
	 *            the path
	 * @param isFolder
	 *            the is folder
	 */
	private void setPageAtrributes(PublicationAssetObject page,
			String type, String id, String path, boolean isFolder) {
		page.setId(id);
		page.setIsFolder(isFolder);
		page.setPath(path);
		page.setType(type);
	}

}
