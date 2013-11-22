
package app.cs.controller.publicationstructuring.page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.model.request.DeleteDimensionRequest;
import app.cs.model.request.DeletePublicationAssetRequest;

/**
 * The Class NodeController.
 */
@Controller
public class DeletePageController {

	/** The Constant CREATE. */
	private static final String DELETE = "/page/delete/Page/{name}";

	/** The dimension service. */
	private Interactor deletePage;

	private DeletePublicationAssetRequest deletePageRequest;

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
	public DeletePageController(Interactor deletePage,
			DeletePublicationAssetRequest deletePageRequest) {
		this.deletePage = deletePage;
		this.deletePageRequest = deletePageRequest;

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
	String delete(@RequestBody PublicationAssetObject pageToBeDeleted) {


		deletePageRequest.setPublicationAsset(pageToBeDeleted);
		deletePage.execute(deletePageRequest);
		return pageToBeDeleted.getId();

	}
}