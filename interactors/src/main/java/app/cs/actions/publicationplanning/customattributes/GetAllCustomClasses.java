package app.cs.actions.publicationplanning.customattributes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.RequestModel;
import app.cs.model.response.GetAllCustomClassesResponse;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;
import app.cs.utils.FileUtils;

@Component
public class GetAllCustomClasses implements Interactor {

	private FileUtils fileUtils;
	
	@Autowired
	public GetAllCustomClasses(FileUtils fileUtils) {
		this.fileUtils = fileUtils;
	}
	
	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		String result = null;
		try {
			result = fileUtils.getFileContents(
					"mrm" + "/customClasses/allClasses.json");
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String status = CommonConstants.FAIL_RESPONSE;
		if(result != null && !result.isEmpty()){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new GetAllCustomClassesResponse(status, result);
	}

}
