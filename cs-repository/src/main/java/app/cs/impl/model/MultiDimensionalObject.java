package app.cs.impl.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.stereotype.Component;

import com.cs.data.api.core.GenericDomain;

@Component
@NodeEntity
public class MultiDimensionalObject implements Serializable, GenericDomain {

	private static final long serialVersionUID = 1L;

	private List<Assortment> assortments;

	private String budget;

	private String budgetOwner;

	private List<MultiDimensionalObject> children;
	
	private List<String> tags;
	
	private List<String> markers;
	
//	@GraphId
	private Long graphID;

	private String currency;
	private DimensionInfo dimensionInfo;
	private String endDate;
	private List<String> groupIds;
	private String id;
	private String image;
	private boolean isFolder;
	private List<MultiDimensionalObject> items;
	private String manager;
	private String name;
	private final String PAGE = "page";
	private String path;
	private List<Product> products;
	private String startDate;
	private String title;

	private String type;

	private PageInfo pageInfo;
	
	private boolean isLazy = true;
	
	public boolean getIsLazy() {
		return isLazy;
	}

	public void setIsLazy(boolean isLazy) {
		this.isLazy = isLazy;
	}

	public Long getGraphID() {
		return graphID;
	}

	public void setGraphID(Long graphID) {
		this.graphID = graphID;
	}

	public MultiDimensionalObject() {
	}

	public MultiDimensionalObject(String name, String type, String path,
			boolean isFolder) {
		this.id = name;
		this.name = name;
		this.title = name;
		this.type = type;
		this.path = path;
		this.isFolder = isFolder;
	}

	public MultiDimensionalObject(String id, String type, String path,
			String name, List<String> groupId,
			List<MultiDimensionalObject> children) {
		super();
		this.id = id;
		this.type = type;
		this.path = path;
		this.name = name;
		this.groupIds = groupId;
		this.children = children;
	}

	public MultiDimensionalObject(String id, String type, String title,
			String name, String path) {
		this.id = id;
		this.type = type;
		this.name = name;
		this.title = title;
		this.path = path;
	}
	
	public MultiDimensionalObject(String id, String type, 
			String path,List<String> groupID) {
		super();
		this.id = id;
		this.type = type;
		this.path = path;
		this.groupIds = groupID;
	}


	public void addAssortment(Assortment assortment) {
		List<Assortment> newChildren;
		if (this.assortments == null) {
			newChildren = new ArrayList<Assortment>();
			newChildren.add(assortment);
			this.assortments = newChildren;

		} else {
			this.assortments.add(assortment);
		}
	}

	public void addchild(MultiDimensionalObject contentObject) {
		List<MultiDimensionalObject> newChildren;
		if (this.children == null) {
			newChildren = new ArrayList<MultiDimensionalObject>();
			newChildren.add(contentObject);
			this.children = newChildren;

		} else {
			this.children.add(contentObject);
		}
	}

	public void addToGroupId(String groupId) {
		if (groupIds == null) {
			groupIds = new ArrayList<String>();
			groupIds.add(groupId);
		} else {

			groupIds.add(groupId);
		}

	}

	/*@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;

		MultiDimensionalObject other = (MultiDimensionalObject) obj;
		if (id.equals(other.id))
			return true;
		else
			return false;

	}*/

	@JsonProperty("previewImage")
	public String getPreviewImage() {
		return dimensionInfo.getPreviewImage();
	}

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	@JsonProperty("previewType")
	public String getPreviewType() {
		return dimensionInfo.getPreviewType();
	}

	@JsonProperty("actualImage")
	public String getActualImage() {
		return dimensionInfo.getActualImage();
	}

	public List<Assortment> getAssortment() {
		return assortments;
	}

	public List<Assortment> getAssortments() {
		return assortments;
	}

	public String getBudget() {
		return dimensionInfo.getBudget();
	}

	public String getBudgetOwner() {
		return dimensionInfo.getBudgetOwner();
	}

	public List<MultiDimensionalObject> getChildren() {
		return children;
	}

	public String getCurrency() {
		return dimensionInfo.getCurrency();
	}

	public DimensionInfo getDimensionInfo() {
		return dimensionInfo;
	}

	public String getEndDate() {
		return dimensionInfo.getEndDate();
	}

	public List<String> getGroupId() {
		return groupIds;
	}

	public String getId() {
		return id;
	}

	public String getImageUrl() {
		return image;
	}

	public boolean getIsFolder() {
		return isFolder;
	}

	@JsonProperty("Items")
	public List<MultiDimensionalObject> getItems() {
		return children;
	}

	@Override
	public String getKey() {
		return getId();
	}

	public String getManager() {
		return dimensionInfo.getManagerName();
	}

	public String getName() {
		return name;
	}

	@Override
	public String getObjectKey() {
		return "DIMENSION";
	}

	public String getPath() {
		return path;
	}

	public List<Product> getProducts() {
		return products;
	}

	public String getStartDate() {
		return dimensionInfo.getStartDate();
	}

	public String getTitle() {
		return title;
	}

	public String getType() {
		return type;
	}

	public boolean hasChildren() {
		return this.children == null ? false : true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((PAGE == null) ? 0 : PAGE.hashCode());
		result = prime * result
				+ ((children == null) ? 0 : children.hashCode());
		result = prime * result
				+ ((groupIds == null) ? 0 : groupIds.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());

		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((path == null) ? 0 : path.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	public boolean isPage() {
		return type == PAGE ? true : false;
	}

	public boolean isRoot() {
		return path == "-1" ? true : false;
	}

	public void removeChild(MultiDimensionalObject contentObject) {
		if (children != null) {
			this.children.remove(contentObject);
		}

	}

	public void setAssortment(List<Assortment> assortment) {
		this.assortments = assortment;
	}

	public void setAssortments(List<Assortment> assortments) {
		this.assortments = assortments;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public void setChildren(List<MultiDimensionalObject> children) {
		this.children = children;
	}

	public void setDimensionInfo(DimensionInfo dimensionInfo) {
		this.dimensionInfo = dimensionInfo;
	}

	public void setGroupId(List<String> groupId) {
		this.groupIds = groupId;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setImage(String image) {
		this.image = image;

	}

	public void setIsFolder(boolean isFolder) {
		this.isFolder = isFolder;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setType(String type) {
		this.type = type;
	}


	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	

	public List<String> getMarkers() {
		return markers;
	}

	public void setMarkers(List<String> markers) {
		this.markers = markers;
	}
	
	@Override
	public String toString() {
		return "DimensionModel [id=" + id + ", type=" + type + ", path=" + path
				+ ", title=" + title + ", name=" + name + ", groupIds="
				+ groupIds + ", children=" + children + "]";
	}
}
