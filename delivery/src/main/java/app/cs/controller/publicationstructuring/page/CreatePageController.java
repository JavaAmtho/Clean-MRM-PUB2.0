package app.cs.controller.publicationstructuring.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationstructuring.page.CreatePage;
import app.cs.impl.model.PageInfo;
import app.cs.model.request.CreatePageRequest;
import app.cs.model.response.ResponseModel;

/**
 * The Class ChapterController. TODO. com.cs.business.ifacadeservices controller
 * -> common facade ->>>(|) ->i***interface call ichapter ->Impl idimension
 * ->Impl
 * @param <T>
 */
@Controller
public class CreatePageController<T> {

	/** The Constant CREATE. */
	private static final String CREATEPAGE = "/page/create/{type}/name/{name}/path/{path}/folder/{folder}";

	/** The chapter service. */
	private CreatePage createPage;

	private CreatePageRequest createPageRequestModel;

	/**
	 * Instantiates a new page controller.
	 * 
	 * @param pageService
	 *            the page service
	 * @param factory
	 *            the factory
	 */
	@Autowired
	public CreatePageController(CreatePage createPage,
			CreatePageRequest createPageRequestModel) {
		this.createPage = createPage;
		this.createPageRequestModel = createPageRequestModel;

	}

	/**
	 * Creates the.
	 * 
	 * @param type
	 *            the type
	 * @param name
	 *            the name
	 * @param path
	 *            the path
	 * @param isFolder
	 *            the is folder
	 * @return 
	 * @return the string
	 * @throws Exception 
	 */
	@RequestMapping(value = { CREATEPAGE })
	public @ResponseBody
	ResponseModel execute(@PathVariable("type") String type,
			@PathVariable("name") String name,
			@PathVariable("path") String path,
			@PathVariable("folder") boolean isFolder,
			@RequestBody PageInfo pageInfo) /*throws Exception */{

		createPageRequestModel.setPageInfo(pageInfo);
		createPageRequestModel.setFolder(isFolder);
		createPageRequestModel.setName(name);
		createPageRequestModel.setPath(path);
		createPageRequestModel.setType(type);
//		throw new Exception();
		ResponseModel response = createPage.execute(createPageRequestModel); 
		return response;
//		return name;

	}
	
/*	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	   @ExceptionHandler({Exception.class})
	   public ResponseModel handleSecurityException() {
	      return new StringResponse("DONE");
	   }
*/
}
