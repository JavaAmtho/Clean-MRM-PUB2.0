package app.cs.impl.slicingdicing;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.impl.publicationasset.PublicationAssetRepository;
import app.cs.interfaces.dimension.IDimensionRepository;
import app.cs.interfaces.slicingdicing.ITreeBuilder;
import app.cs.utils.ArrayUtils;

/**
 * The Class TreeBuilder.
 */
@Component
public class TreeBuilder implements ITreeBuilder {

	/** The cache. */

	/** The repository. */
	private IDimensionRepository repository;
	
	private PublicationAssetRepository publicationAssetRepository; 

	/** The utils. */
	private ArrayUtils utils;

	/** The delimeter. */
	private final String DELIMETER = "-";

	/**
	 * Instantiates a new tree builder.
	 * 
	 * @param cache
	 *            the cache
	 * @param repository
	 *            the repository
	 */
	@Autowired
	public TreeBuilder(IDimensionRepository repository,
			PublicationAssetRepository publicationAssetRepository) {
		this.repository = repository;
		this.publicationAssetRepository = publicationAssetRepository;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.cs.data.business.builder.ITreeBuilder#buildTree(java.lang.String)
	 */
	@Override
	public List<MultiDimensionalObject> buildTree(String structure) {
		String[] orderedTypes = getTypes(structure);
		List<MultiDimensionalObject> rootNodes = getAllSeparatedTrees(orderedTypes[0]);
		for (MultiDimensionalObject dimension : rootNodes) {

			dimension.setPath("-1");
			buildTreeForRootNode(dimension, orderedTypes, null);
		}

		return rootNodes;
	}
	
	public List<PublicationAssetObject> getPublicationAssets(PublicationAssetObject parent){
		
		return publicationAssetRepository.getPublicationAssetsUnderParent(parent);
		
	}

	/**
	 * Gets the types.
	 * 
	 * @param structure
	 *            the structure
	 * @return the types
	 */
	public String[] getTypes(String structure) {
		// TODO Auto-generated method stub
		return structure.split(DELIMETER);
	}

	/**
	 * Gets the all separated trees.
	 * 
	 * @param type
	 *            the type
	 * @return the all separated trees
	 */
	public List<MultiDimensionalObject> getAllSeparatedTrees(String type) {
		return repository.getDimensionsOfType(type);

	}

	/**
	 * Builds the tree for the given structure provided.
	 * 
	 * @param root
	 *            the root
	 * @param orderTypes
	 *            the order types
	 * @param groupIdsRequiredForCurrentIteration
	 *            the group ids required for current iteration
	 */
	public void buildTreeForRootNode(MultiDimensionalObject root,
			String[] orderTypes,
			List<String> groupIdsRequiredForCurrentIteration) {
		List<String> groupIds = null;
		MultiDimensionalObject currentRoot = root;
		if (groupIdsRequiredForCurrentIteration == null) {
			groupIds = currentRoot.getGroupId();
		} else {
			groupIds = intersectGroupIds(currentRoot.getGroupId(),
					groupIdsRequiredForCurrentIteration);

		}
		String[] typesOfDimensions = skipFirstOrderType(orderTypes);
		if (typesOfDimensions.length <= 0)
			return;
		
		List<MultiDimensionalObject> childrenOfCurrentLevel;
			childrenOfCurrentLevel = getAllChildrenOfCurrentRoot(
					groupIds, typesOfDimensions[0]);
		
		currentRoot.setChildren(childrenOfCurrentLevel);
		
		for (MultiDimensionalObject child : childrenOfCurrentLevel) {

			child.setPath(removeMinusOne(currentRoot.getPath()) + ","
					+ currentRoot.getId());

			buildTreeForRootNode(child, typesOfDimensions, groupIds);

		}

	}
	
	@Override
	public List<MultiDimensionalObject> getLazyLoadLevelForDimensions(MultiDimensionalObject parentLevel, String structure) {
		
		List<MultiDimensionalObject> childrenOfCurrentLevel = new ArrayList<MultiDimensionalObject>();
		String currentLevel = parentLevel.getType();
		String[] orderedTypes = getTypes(structure);
		if(!currentLevel.isEmpty()){
			String nextLevel = getNextLevel(currentLevel, orderedTypes);
			MultiDimensionalObject currentRoot = parentLevel;
			List<String>groupIds = currentRoot.getGroupId();
			childrenOfCurrentLevel = getAllChildrenOfCurrentRoot(groupIds, nextLevel);
			for (MultiDimensionalObject child : childrenOfCurrentLevel) {
	
				child.setPath(removeMinusOne(currentRoot.getPath()) + "," + currentRoot.getId());
	
			}
		}
		else{
			childrenOfCurrentLevel = getAllSeparatedTrees(orderedTypes[0]);
			for (MultiDimensionalObject dimension : childrenOfCurrentLevel) {
				dimension.setPath("-1");
			}
		}
		
		return childrenOfCurrentLevel;

	}
	
	@Override
	public List<PublicationAssetObject> getLazyLoadObjectForPublicationAssets(PublicationAssetObject parentLevel){
		PublicationAssetObject currentRoot = parentLevel;
		List<PublicationAssetObject> childrenOfCurrentLevel = getPublicationAssets(currentRoot);
		for (PublicationAssetObject child : childrenOfCurrentLevel) {

			child.setPath(removeMinusOne(currentRoot.getPath()) + "," + currentRoot.getId());

		}
		return childrenOfCurrentLevel;
	}
	

	private String getNextLevel(String currentLevel, String[] orderedTypes) {
		String nextLevel = "";
		for (int i = 0 ; i < orderedTypes.length ; i++) {
			if(orderedTypes[i].equals(currentLevel)){
				nextLevel = orderedTypes[i+1]; 
			}
		}
		return nextLevel;
	}
	

	
	
	 

	protected String removeMinusOne(String path) {
		path = path.startsWith("-1") && path.length() > 2 ? path.substring(3)
				: path;

		return path;
	}

	/**
	 * Gets the all children of current root.
	 * 
	 * @param groupIds
	 *            the group ids
	 * @param type
	 *            the type
	 * @return the all children of current root
	 */
	public List<MultiDimensionalObject> getAllChildrenOfCurrentRoot(
			List<String> groupIds, String type) {
		return repository.getDimensionsBy(type, groupIds);
	}

	/**
	 * Skip first order type.
	 * 
	 * @param orderTypes
	 *            the order types
	 * @return the string[]
	 */
	private String[] skipFirstOrderType(String[] orderTypes) {
		utils = new ArrayUtils();
		orderTypes = utils.skip(orderTypes, 1);
		return orderTypes;
	}

	/**
	 * Intersect group ids.
	 * 
	 * @param groupIds
	 *            the group ids
	 * @param groupIdsRequiredForCurrentIteration
	 *            the group ids required for current iteration
	 * @return the list
	 */
	private List<String> intersectGroupIds(List<String> groupIds,
			List<String> groupIdsRequiredForCurrentIteration) {
		utils = new ArrayUtils();

		return utils
				.intersection(groupIds, groupIdsRequiredForCurrentIteration);

	}

}
