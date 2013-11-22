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
import app.cs.model.response.ResponseModel;
import app.cs.model.response.StringResponse;

/**
 * The Class ChapterService.
 */
@Component
public class MovePage implements Interactor {

	/** The contentobject. */
	private final String CONTENTOBJECT = "MultiDimensionalObject";

	/** The chapter repository. */
//	private IChapterRepository chapterRepository;
	private IPublicationAssetRepository publicationAssetRepository;

	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public MovePage(/*IChapterRepository chapterRepository*/IPublicationAssetRepository publicationAssetRepository) {
		// TODO Auto-generated constructor stub
//		this.chapterRepository = chapterRepository;
		this.publicationAssetRepository = publicationAssetRepository;
	}

	public ResponseModel execute(RequestModel model) {
		MovePageRequest request = (MovePageRequest) model;

		/*MultiDimensionalObject chapter = chapterRepository
				.getDomain(CONTENTOBJECT);*/
		PublicationAssetObject page = new PublicationAssetObject();
		setPageAtrributes(page, request.getType(), request.getId(),
				request.getPath(), request.isFolder());
		return new StringResponse(publicationAssetRepository.move(page, request.getNewPath()));

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
