package app.cs.actions.publicationstructuring.chapter;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
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
	
	/** The chapter repository. */
	private IChapterRepository chapterRepository;

	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public CreateChapter(/*IChapterRepository chapterRepository*/IPublicationAssetRepository publicationAssetRepository) {
		// TODO Auto-generated constructor stub
//		this.chapterRepository = chapterRepository;
		this.publicationAssetRepository = publicationAssetRepository;
	}

	public ResponseModel execute(RequestModel model) {

		CreateChapterRequest request = (CreateChapterRequest) model;
		/*MultiDimensionalObject chapter = (MultiDimensionalObject) chapterRepository
				.getDomain(CONTENTOBJECT);*/
		/*setChapterAtrributes(chapter, request.getType(), request.getName(),
				request.getPath(), request.isFolder());*/
//		return new StringResponse(chapterRepository.save(chapter));
			System.out.println("pub assets create dim");
			PublicationAssetObject publicationAsset = new PublicationAssetObject();
			setPublicationAssetAttributes(request, publicationAsset);
			return new PublicationAssetObjectResponse(
					publicationAssetRepository.save(publicationAsset));
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
	private void setChapterAtrributes(MultiDimensionalObject chapter,
			String type, String name, String path, boolean isFolder) {
		chapter.setId(name);
		chapter.setTitle(name);
		chapter.setIsFolder(isFolder);
		chapter.setPath(path);
		chapter.setName(name);
		chapter.setType(type);
		chapter.setDimensionInfo(new DimensionInfo());
		chapter.setChildren(new ArrayList<MultiDimensionalObject>());

	}
	
	protected void setPublicationAssetAttributes(CreateChapterRequest request,
			PublicationAssetObject publicationAsset) {
		publicationAsset.setName(request.getName());
		publicationAsset.setPath(request.getPath());
		publicationAsset.setType(request.getType());
		publicationAsset.setFolder(request.isFolder());
	}

}
