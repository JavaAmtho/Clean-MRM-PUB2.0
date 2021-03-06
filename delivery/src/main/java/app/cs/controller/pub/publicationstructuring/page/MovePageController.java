package app.cs.controller.pub.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationstructuring.page.MovePage;
import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.MovePageRequest;
import app.cs.model.response.ResponseModel;

/**
 * The Class ChapterController. TODO. com.cs.business.ifacadeservices controller
 * -> common facade ->>>(|) ->i***interface call ichapter ->Impl idimension
 * ->Impl
 */
@Controller
public class MovePageController {

	/** The Constant MOVE. */
	private static final String MOVEPAGE = "/page/move/{type}/name/{id}/path/{path}/folder/{folder}/newpath/{newpath}";

	private MovePage movePage;
	private MovePageRequest movePageRequest;

	/**
	 * Instantiates a new page controller.
	 * 
	 * @param pageService
	 *            the page service
	 * @param factory
	 *            the factory
	 */
	@Autowired
	public MovePageController(MovePage movePage,
			MovePageRequest movePageRequest) {
		this.movePage = movePage;
		this.movePageRequest = movePageRequest;

	}

	/**
	 * Move.
	 * 
	 * @param type
	 *            the type
	 * @param name
	 *            the name
	 * @param path
	 *            the path
	 * @param isFolder
	 *            the is folder
	 * @param newPath
	 *            the new path
	 */
	@RequestMapping(value = { MOVEPAGE })
	public @ResponseBody
	ResponseModel execute(@PathVariable("type") String type,
			@PathVariable("id") String id,
			@PathVariable("path") String path,
			@PathVariable("folder") boolean isFolder,
			@PathVariable("newpath") String newpath) {

		movePageRequest.setType(type);
		movePageRequest.setId(id);
		movePageRequest.setPath(path);
		movePageRequest.setFolder(isFolder);
		movePageRequest.setNewPath(newpath);

		ResponseModel response = movePage.execute(movePageRequest);
		return response;

	}
}
