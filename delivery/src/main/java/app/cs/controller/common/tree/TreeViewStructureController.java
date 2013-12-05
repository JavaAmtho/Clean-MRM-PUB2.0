package app.cs.controller.common.tree;

import java.io.IOException;
import java.net.URISyntaxException;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.model.response.EmptyResponseWithStatus;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;
import app.cs.utils.FileUtils;

/**
 * The Class TreeViewStructureController.
 */
@Controller
public class TreeViewStructureController {

	private FileUtils utils;

	@Autowired
	public TreeViewStructureController(FileUtils utils) {
		this.utils = utils;
	}

	@RequestMapping("/treeviewstructure/{structureId}")
	public @ResponseBody
	Object get(@PathVariable String structureId) throws IOException,
			URISyntaxException, ParseException {

		JSONParser parser = new JSONParser();

		return parser.parse(utils
				.getFileContents("pub/schema/schema" + structureId + ".json")); //$NON-NLS-1$ //$NON-NLS-2$

	}

	@RequestMapping("/treeviewstructure/default")
	public @ResponseBody
	ResponseModel getDefault() throws IOException, URISyntaxException {

		return new EmptyResponseWithStatus(CommonConstants.SUCCESS_RESPONSE,utils.getFileContents("schema1.json")); //$NON-NLS-1$

	}

	@RequestMapping("/mrm/all")
	public @ResponseBody
	ResponseModel getAllForMrm() throws IOException, URISyntaxException {
		return new EmptyResponseWithStatus(CommonConstants.SUCCESS_RESPONSE,utils.getFileContents("mrm/schema/allSchema.json"));
	}

	@RequestMapping("/pub/all")
	public @ResponseBody
	ResponseModel getAllPub() throws IOException, URISyntaxException {
		return new EmptyResponseWithStatus(CommonConstants.SUCCESS_RESPONSE,utils.getFileContents("pub/schema/allSchema.json"));
	}

}
