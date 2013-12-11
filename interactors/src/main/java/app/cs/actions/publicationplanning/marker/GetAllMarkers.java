package app.cs.actions.publicationplanning.marker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.interfaces.marker.IMarkerRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.response.GetAllMarkersResponse;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;
import app.cs.utils.FileUtils;

@Component
public class GetAllMarkers implements Interactor{

	private IMarkerRepository markerRepository;
	
	private FileUtils fileUtils;
	
	@Autowired
	public GetAllMarkers(IMarkerRepository markerRepository,
			FileUtils fileUtils) {
		this.markerRepository = markerRepository;
		this.fileUtils = fileUtils;
	}

	@Override
	public ResponseModel execute(RequestModel requestMdel) {
		/*List<MarkerObject> result = markerRepository.getAllMarkers();
		String status = CommonConstants.FAIL_RESPONSE;
		if(result != null){
			status = CommonConstants.SUCCESS_RESPONSE;
		}*/
		String result = null;
		try {
			result = fileUtils.getFileContents(
					"mrm" + "/markers/markersConfig.json");
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String status = CommonConstants.FAIL_RESPONSE;
		if(result != null && !result.isEmpty()){
			status = CommonConstants.SUCCESS_RESPONSE;
		}
		return new GetAllMarkersResponse(status, result);
	}
	
}
