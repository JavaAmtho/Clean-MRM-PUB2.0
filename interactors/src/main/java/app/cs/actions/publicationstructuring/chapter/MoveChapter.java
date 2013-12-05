package app.cs.actions.publicationstructuring.chapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.chapter.IChapterRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.MoveChapterRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

/**
 * The Class ChapterService.
 */
@Component
public class MoveChapter implements Interactor {

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
	public MoveChapter(IPublicationAssetRepository publicationAssetRepository) {
		this.publicationAssetRepository = publicationAssetRepository;
	}

	public ResponseModel execute(RequestModel model) {
		MoveChapterRequest request = (MoveChapterRequest) model;

		PublicationAssetObject chapter = new PublicationAssetObject();
		setChapterAtrributes(chapter, request.getType(), request.getId(),
				request.getPath(), request.isFolder());
		boolean result = publicationAssetRepository.move(chapter, request.getNewPath());
		return new EmptyResponseWithStatus(
				result ? CommonConstants.SUCCESS_RESPONSE : CommonConstants.FAIL_RESPONSE, 
						request.getId());

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
	private void setChapterAtrributes(PublicationAssetObject chapter,
			String type, String id, String path, boolean isFolder) {
		chapter.setId(id);
		chapter.setIsFolder(isFolder);
		chapter.setPath(path);
		chapter.setType(type);

	}

}
