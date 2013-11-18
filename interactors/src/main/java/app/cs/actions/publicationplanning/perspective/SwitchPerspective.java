package app.cs.actions.publicationplanning.perspective;

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
import app.cs.utils.CommonConstants;

/**
 * The Class DimensionService.
 */
@Component
public class SwitchPerspective implements Interactor{

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

	public ResponseModel execute(RequestModel model) {
		if(model instanceof StringRequest){
			StringRequest request = (StringRequest) model;
			setCurrentViewStructure(request.getStringRequest());
			return new TreeResponse(treeBuilder.buildTree(request
					.getStringRequest()));

		}
		else if(model instanceof SwitchPerspectiveRequest){
			SwitchPerspectiveRequest request = (SwitchPerspectiveRequest)model;
			if(CommonConstants.DIMENSIONS_TYPE_ARRAY.
					contains(request.getType())){
				PublicationAssetObject parentLevel = new PublicationAssetObject(request.getId(), request.getType(), request.getPath());
				return new LazyTreePublicationAssetResponse(treeBuilder.getLazyLoadObjectForPublicationAssets(parentLevel));
			}
			else{
				MultiDimensionalObject parentLevel = new MultiDimensionalObject(request.getId(), request.getType(), request.getPath(), request.getGroupID());
				return new TreeResponse(treeBuilder.getLazyLoadLevelForDimensions(parentLevel, request.getStructure()));
			}
		}
		return null;
		
	}

	public void setCurrentViewStructure(String currentViewStructure) {
		cache.setCurrentViewStructure(KEY, currentViewStructure);

	}

}
