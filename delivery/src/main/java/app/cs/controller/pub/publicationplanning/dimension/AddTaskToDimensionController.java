package app.cs.controller.pub.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.AddTaskToDimensionRequest;
import app.cs.model.response.ResponseModel;

@Controller
public class AddTaskToDimensionController {
	private Interactor addTaskToDimension;

	@Autowired
	public AddTaskToDimensionController(Interactor addTaskToDimension) {
		this.addTaskToDimension = addTaskToDimension;
	}

	@RequestMapping(value = "/dimension/addTask/{dimensionId}"
			, method = RequestMethod.POST)
	public @ResponseBody
           	ResponseModel execute(
           			@RequestBody AddTaskToDimensionRequest request
           			) {
		System.out.println("HELLO!!");
		ResponseModel response = addTaskToDimension.execute(request);
		return response;
	}
	
	@RequestMapping(value = "/dimension/testCase")
	public @ResponseBody
           	String execute() {
		System.out.println("HELLO!!");
//		ResponseModel response = addTaskToDimension.execute(request);
		return "HAHAHAH";
	}
}
