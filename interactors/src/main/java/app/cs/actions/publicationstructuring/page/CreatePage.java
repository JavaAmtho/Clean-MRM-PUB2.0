package app.cs.actions.publicationstructuring.page;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.actions.contentplanning.assortment.CreateAssortment;
import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.Assortment;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.CreateAssortmentRequest;
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
//	private IChapterRepository chapterRepository;
	private IPublicationAssetRepository publicationAssetRepository;
	
	private CreateAssortment createAssortment;

	/**
	 * Instantiates a new chapter service.
	 * 
	 * @param chapterRepository
	 *            the chapter repository
	 * @param factory
	 */
	@Autowired
	public CreatePage(/*IChapterRepository chapterRepository*/IPublicationAssetRepository publicationAssetRepository,
			CreateAssortment createAssortment) {
		// TODO Auto-generated constructor stub
//		this.chapterRepository = chapterRepository;
		this.publicationAssetRepository = publicationAssetRepository;
		this.createAssortment = createAssortment;
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
		return new PublicationAssetObjectResponse(page);
	}

	private PublicationAssetObject createDefaultAssortmentForPage(
			PublicationAssetObject page) {
		PublicationAssetObject assortmentObject = new PublicationAssetObject();
		
		CreateAssortmentRequest assortmentRequest = new CreateAssortmentRequest();
		assortmentRequest.setPath(page.getPath() + "," + page.getId());
		assortmentRequest.setName(page.getId() + "_Assortment");
		Assortment assortment = new Assortment();
		assortmentRequest.setAssortment(assortment);
		
		PublicationAssetObjectResponse assortmentResponse = (PublicationAssetObjectResponse)createAssortment.execute(assortmentRequest);
		
//		assortmentObject.setProducts(productsList);
//		PublicationAssetObject createdAssortment = publicationAssetRepository.save(assortmentObject);
		return assortmentResponse.getResponse();
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
