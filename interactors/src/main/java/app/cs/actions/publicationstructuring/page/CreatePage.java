package app.cs.actions.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.chapter.IChapterRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.CreatePageRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.PublicationAssetObjectResponse;
import app.cs.model.response.ResponseModel;

/**
 * The Class ChapterService.
 */
@Component
public class CreatePage implements Interactor {

	/** The contentobject. */
	private final String CONTENTOBJECT = "MultiDimensionalObject";

	/** The chapter repository. */
	private IChapterRepository chapterRepository;
	private IPublicationAssetRepository publicationAssetRepository;

	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public CreatePage(/*IChapterRepository chapterRepository*/IPublicationAssetRepository publicationAssetRepository) {
		// TODO Auto-generated constructor stub
//		this.chapterRepository = chapterRepository;
		this.publicationAssetRepository = publicationAssetRepository;
	}

	public ResponseModel execute(RequestModel model) {

		CreatePageRequest request = (CreatePageRequest) model;
		PublicationAssetObject publicationAsset = new PublicationAssetObject();
		setPublicationAssetAttributes(request, publicationAsset);
		PublicationAssetObject page = publicationAssetRepository.save(publicationAsset);
		//TODO: Has to be optimized (while creating page add assortment in relationship and save)
		//TODO: after creation of assortment, publicationAssetObject(page object) is stale since new relationship 
		//		has been added in the page object for the newly created assortment
		PublicationAssetObject createdAssortment = createDefaultAssortmentForPage(page);
		page.addToChildren(createdAssortment);
		System.out.println("Page Name => " + page.getName());
		System.out.println("Page Type => " + page.getPageType());
		return new PublicationAssetObjectResponse(page);
	}

	private PublicationAssetObject createDefaultAssortmentForPage(
			PublicationAssetObject page) {
		PublicationAssetObject assortmentObject = new PublicationAssetObject();
		
		assortmentObject.setId(page.getName() + "_Assortment");
		assortmentObject.setPath(page.getPath() + "," + page.getId());
		assortmentObject.setName(page.getId() + "_Assortment");
		assortmentObject.setTitle(page.getId() + "_Assortment");
		assortmentObject.setIsFolder(false);
		assortmentObject.setType("Assortment");
		PublicationAssetObject createdAssortment = publicationAssetRepository.save(assortmentObject);
		return createdAssortment;
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
/*	private void setChapterAtrributes(MultiDimensionalObject chapter,
			String type, String name, String path, boolean isFolder, PageInfo pageInfo) {
		chapter.setId(name);
		chapter.setTitle(name);
		chapter.setIsFolder(isFolder);
		chapter.setPath(path);
		chapter.setName(name);
		chapter.setType(type);
		chapter.setDimensionInfo(new DimensionInfo());
		chapter.setChildren(new ArrayList<MultiDimensionalObject>());
		chapter.setPageInfo(pageInfo);

	}*/
	
	protected void setPublicationAssetAttributes(CreatePageRequest request,
			PublicationAssetObject publicationAsset) {
		//TODO : unique id to be set
		publicationAsset.setId(request.getName());
		//TODO : title and name redundant(only title needed)
		publicationAsset.setTitle(request.getName());
		publicationAsset.setName(request.getName());
		publicationAsset.setPath(request.getPath());
		publicationAsset.setType(request.getType());
		publicationAsset.setIsFolder(request.isFolder());
		publicationAsset.setFileID(request.getPageInfo().getFileID());
		publicationAsset.setPageType(request.getPageInfo().getPageType());
		publicationAsset.setRenderEngineType(request.getPageInfo().getRenderEngineType());
	}

}
