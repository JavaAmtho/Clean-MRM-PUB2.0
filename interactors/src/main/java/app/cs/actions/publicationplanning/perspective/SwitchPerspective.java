package app.cs.actions.publicationplanning.perspective;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.inmemory.IInMemoryViewStructure;
import app.cs.interfaces.slicingdicing.ITreeBuilder;
import app.cs.model.request.RequestModel;
import app.cs.model.request.StringRequest;
import app.cs.model.request.SwitchPerspectiveRequest;
import app.cs.model.response.LazyTreePublicationAssetResponse;
import app.cs.model.response.ResponseModel;
import app.cs.model.response.TreeResponse;
import app.cs.model.response.TreeResponseModel;
import app.cs.utils.CommonConstants;

/**
 * The Class DimensionService.
 */
//TODO : removed interactor implementation!!!!CHECK AND CHANGE!!!
@Component
public class SwitchPerspective{

	/** The tree builder. */
	private ITreeBuilder treeBuilder;

	/** The ViewStructure cache. */
	private IInMemoryViewStructure cache;

	/** The Constant KEY. */
	private static final String KEY = "view";

	/**
	 * Instantiates a new dimension service.
	 * 
	 * @param dimensionRepository
	 *            the dimension repository
	 * @param treeBuilder
	 *            the tree builder
	 */
	@Autowired
	public SwitchPerspective(ITreeBuilder treeBuilder,
			IInMemoryViewStructure cache) {

		this.treeBuilder = treeBuilder;
		this.cache = cache;

	}

	public TreeResponseModel execute(RequestModel model) {
		if(model instanceof StringRequest){
			StringRequest request = (StringRequest) model;
			setCurrentViewStructure(request.getStringRequest());
			List<MultiDimensionalObject> response = treeBuilder.buildTree(request.getStringRequest());
			String status = CommonConstants.FAIL_RESPONSE;
			if(response != null){
				status = CommonConstants.SUCCESS_RESPONSE;
			}
			return new TreeResponse(response,status);

		}
		else if(model instanceof SwitchPerspectiveRequest){
			SwitchPerspectiveRequest request = (SwitchPerspectiveRequest)model;
			setCurrentViewStructure(request.getStructure());
			if(CommonConstants.PUBLICATION_ASSETS_TYPE_ARRAY.contains(request.getType()) || 
					CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION.equals(request.getType())){
				
				PublicationAssetObject parentLevel = new PublicationAssetObject(request.getId(), request.getType(), request.getPath());
				List<PublicationAssetObject> response = treeBuilder.getLazyLoadObjectForPublicationAssets(parentLevel);
				String status = CommonConstants.FAIL_RESPONSE;
				if(response != null){
					status = CommonConstants.SUCCESS_RESPONSE;
				}
				return new LazyTreePublicationAssetResponse(response,status);
			}
			else{
				MultiDimensionalObject parentLevel = new MultiDimensionalObject(request.getId(), request.getType(), request.getPath(), request.getGroupID());
				List<MultiDimensionalObject> response = treeBuilder.getLazyLoadLevelForDimensions(parentLevel, request.getStructure());
				String status = CommonConstants.FAIL_RESPONSE;
				if(response != null){
					status = CommonConstants.SUCCESS_RESPONSE;
				}
				return new TreeResponse(response,status);
			}
		}
		return null;
		
	}

	public void setCurrentViewStructure(String currentViewStructure) {
		cache.setCurrentViewStructure(KEY, currentViewStructure);

	}

}
