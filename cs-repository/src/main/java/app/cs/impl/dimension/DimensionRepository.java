package app.cs.impl.dimension;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.impl.delegate.factory.DomainFactory;
import app.cs.impl.inmemory.InMemoryViewStructure;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.dimension.IDimensionRepository;
import app.cs.interfaces.dimension.IInMemoryDimensionGroup;
import app.cs.utils.CommonConstants;
import app.cs.utils.FileUtils;

import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;
import com.cs.data.api.core.nosql.neo4j.NoSqlNeo4jRepository;

/**
 * The Class DimensionRepository
 */
@Component
public class DimensionRepository implements IDimensionRepository {

	private static final String HIPHEN = "-";

	private FileUtils fileUtils;

	private IInMemoryDimensionGroup groupCache;

	private InMemoryViewStructure viewStructure;

	private NoSqlRepository mongoRepository;
	
	private NoSqlNeo4jRepository neo4jRepository;

	private DomainFactory factory;

	private final String TYPE = "type";

	private final String GROUPIDS = "groupIds";

	private ImageLookup imageLookup;

	/**
	 * Instantiates a new dimension repository.
	 * 
	 * @param fileUtils
	 *            the file utils
	 * @param groupCache
	 *            the group cache
	 * @param noSqlTemplateforMongo
	 *            the no sql templatefor mongo
	 */
	@Autowired
	public DimensionRepository(FileUtils fileUtils,
			IInMemoryDimensionGroup groupCache,
			NoSqlRepository noSqlRepository, DomainFactory factory,
			InMemoryViewStructure viewStructure, ImageLookup imageLookup,
			NoSqlNeo4jRepository noSqlNeo4jRepository) {
		this.fileUtils = fileUtils;
		this.groupCache = groupCache;
		this.mongoRepository = noSqlRepository;
		this.neo4jRepository = noSqlNeo4jRepository;
		this.factory = factory;
		this.viewStructure = viewStructure;
		this.imageLookup = imageLookup;
	}

	@Override
	public MultiDimensionalObject createDimension(
			MultiDimensionalObject dimension) {
		if (dimensionAlreadyExists(dimension))
			return null;
		return create(dimension);
	}
	
	@Override
	public String editProperty(MultiDimensionalObject objectToEdit){
		MultiDimensionalObject currentObject = mongoRepository.find(objectToEdit.getId(), MultiDimensionalObject.class);
		currentObject.setTitle(objectToEdit.getTitle());
		if(objectToEdit.getDimensionInfo() != null){
			currentObject.setDimensionInfo(objectToEdit.getDimensionInfo());
		}
		save(currentObject);
//		mongoRepository.updateByIdSetProperty(objectToEdit.getId(), "name", objectToEdit.getTitle(), objectToEdit.getClass());
		return CommonConstants.SUCCESS_RESPONSE;
	}

	private MultiDimensionalObject create(MultiDimensionalObject dimension) {
		String groupId = getDimensionGroupId(dimension.getPath());
		if (groupCache.ifGroupIdExistsFor(dimension.getPath())) {
			createDimensionWithExistingGroupId(dimension, groupId);
		} else {
			createDimensionWithNewGroupId(dimension);
		}

		return dimension;
	}

	private boolean dimensionAlreadyExists(MultiDimensionalObject dimension) {
		return mongoRepository.getObjectByKey(dimension, dimension.getClass()) != null;
	}

	private void createDimensionWithNewGroupId(MultiDimensionalObject dimension) {
		String groupId;
		groupId = UUID.randomUUID().toString();
		groupCache.addNewGroup(dimension, groupId);
		updateGroupIdForAllAncestor(dimension.getPath(), groupId);
		dimension.addToGroupId(groupId);
		save(dimension);
	}

	public void save(MultiDimensionalObject dimension) {
		mongoRepository.save(dimension);
		if(dimension.getType().equalsIgnoreCase(CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION)){
			PublicationAssetObject partialDataForNeo4j = new PublicationAssetObject();
			partialDataForNeo4j.setId(dimension.getId());
			partialDataForNeo4j.setType(dimension.getType());
//			partialDataForNeo4j.setTitle(dimension.getTitle());
			neo4jRepository.saveData(partialDataForNeo4j);
		}
	}

	private void createDimensionWithExistingGroupId(
			MultiDimensionalObject dimension, String groupId) {
		dimension.addToGroupId(groupId);
		save(dimension);
		groupCache.updateCache(dimension, groupId);
	}

	private void updateGroupIdForAllAncestor(String path, String groupId) {
		String[] paths = path.split(",");
		for (String singlePath : paths) {
			mongoRepository.updateByIdPushIntoProperty(singlePath, GROUPIDS, groupId,
					MultiDimensionalObject.class);
		}

	}

	private String getDimensionGroupId(String path) {

		return groupCache.getDimensionGroupIdFor(path);
	}

	@Override
	public MultiDimensionalObject getDomain(String type) {

		return factory.getDomainObject(type);
	}

	@Override
	public String getAllDimensions() throws IOException, URISyntaxException {
		return fileUtils.getFileContents("dimensions.json");
	}

	@Override
	public List<MultiDimensionalObject> getDimensions() {

		return mongoRepository.findAll(MultiDimensionalObject.class);
	}

	@Override
	public List<MultiDimensionalObject> getDimensionsOfType(String type) {
		try{
			return mongoRepository.getObjectsBy(TYPE, type,
					MultiDimensionalObject.class);
		}
		catch(Throwable e){
			return null;
		}
	}

	@Override
	public List<MultiDimensionalObject> getDimensionsBy(String type2,
			List<String> groupIds) {
		return mongoRepository.getObjectForAndCriteria(TYPE, type2, GROUPIDS,
				groupIds, MultiDimensionalObject.class);

	}

	@Override
	public boolean delete(MultiDimensionalObject dimension) {
		List<String> possibleDeleteTypes = getPossibleTypesWhichAreGoingToAffected(dimension
				.getType());
		MultiDimensionalObject dimensionToBeDeleted = mongoRepository.find(dimension.getId(), MultiDimensionalObject.class);
		if(possibleDeleteTypes.contains(CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION)){
			List<MultiDimensionalObject> publicationsUnderNode = 
					mongoRepository.getObjectForAndCriteria("type",CommonConstants.Dimension.DIMENSION_TYPE_PUBLICATION, 
					"groupIds", dimensionToBeDeleted.getGroupId(),MultiDimensionalObject.class);
			for (MultiDimensionalObject multiDimensionalObject : publicationsUnderNode) {
				System.out.println("ID => " +  multiDimensionalObject.getId());
				neo4jRepository.deleteSelfAndAllItsChildren("id", multiDimensionalObject.getId());
			}
		}
		return mongoRepository.delete("groupIds", "type", dimensionToBeDeleted.getGroupId(),
				possibleDeleteTypes, dimension.getClass());
	}

	public List<String> getPossibleTypesWhichAreGoingToAffected(
			String currentNodeType) {
		List<String> types = splitViewStructure();
		return types.subList(types.indexOf(currentNodeType), types.size());
	}

	@Override
	public MultiDimensionalObject move(String oldPath, String newPath,
			MultiDimensionalObject objectInMove) {
		moveDimensionWithAllItsChildren(newPath, objectInMove);
		return mongoRepository.getObjectByKey(objectInMove,
				MultiDimensionalObject.class);
	}

	private void moveDimensionWithAllItsChildren(String newPath,
			MultiDimensionalObject objectInMove) {
		String localNewPath = newPath;
		List<String> groupIds = objectInMove.getGroupId();
		objectInMove.setGroupId(new ArrayList<String>());
		objectInMove.setPath(localNewPath);
		create(objectInMove);
		if (objectInMove.getType().equals(getLastTypeInCurrentViewStructure()))
			return;
		List<MultiDimensionalObject> children = getDimensionsBy(
				getNextType(objectInMove), groupIds);
		newPath = objectInMove.getPath() + "," + objectInMove.getName();

		for (MultiDimensionalObject multiDimensionalObject : children) {
			moveDimensionWithAllItsChildren(newPath, multiDimensionalObject);
		}

	}

	private String getLastTypeInCurrentViewStructure() {
		List<String> types = splitViewStructure();
		return types.get(types.size() - 1);

	}

	private String getNextType(MultiDimensionalObject objectInMove) {
		List<String> types = splitViewStructure();
		return types.get(types.indexOf(objectInMove.getType()) + 1);

	}

	private List<String> splitViewStructure() {
		String[] alltypes = viewStructure.getCurrentViewStructure().split(
				HIPHEN);
		List<String> types = Arrays.asList(alltypes);
		return types;
	}
	
	@Override
	public String updateTags(String id, List<String> tags){
		
		MultiDimensionalObject currentObject = mongoRepository.find(id, MultiDimensionalObject.class);
		currentObject.setTags(tags);
		save(currentObject);
		return CommonConstants.SUCCESS_RESPONSE;
		
	}
	
	@Override
	public String updateMarkers(String id, List<String> markers){
		
		MultiDimensionalObject currentObject = mongoRepository.find(id, MultiDimensionalObject.class);
		currentObject.setTags(markers);
		save(currentObject);
		return CommonConstants.SUCCESS_RESPONSE;
		
	}

}
