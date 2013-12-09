
package app.cs.controller.pub.publicationstructuring.chapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.model.request.DeleteDimensionRequest;
import app.cs.model.request.DeletePublicationAssetRequest;
import app.cs.model.response.ResponseModel;

/**
 * The Class NodeController.
 */
@Controller
public class DeleteChapterController {

	/** The Constant CREATE. */
	private static final String DELETE = "/chapter/delete/Chapter/{name}";

	/** The dimension service. */
	private Interactor deleteChapter;

	private DeletePublicationAssetRequest deleteChapterRequest;

	/**
	 * Instantiates a new node controller.
	 * 
	 * @param dimensionService
	 *            the dimension service
	 * @param factory
	 *            the factory
	 * @param cache
	 *            the cache
	 */
	@Autowired
	public DeleteChapterController(Interactor deleteChapter,
			DeletePublicationAssetRequest deleteChapterRequest) {
		this.deleteChapter = deleteChapter;
		this.deleteChapterRequest = deleteChapterRequest;

	}

	/**
	 * deletes the Dimension Model.
	 * 
	 * @param type
	 *            the type
	 * @param name
	 *            the name
	 * @param path
	 *            the path
	 * @param isFolder
	 *            the is folder
	 * @return the string
	 */
	@RequestMapping(value = { DELETE })
	public @ResponseBody
	ResponseModel delete(@RequestBody PublicationAssetObject chapterToBeDeleted) {


		deleteChapterRequest.setPublicationAsset(chapterToBeDeleted);
		ResponseModel response = deleteChapter.execute(deleteChapterRequest);
		return response;

	}
}