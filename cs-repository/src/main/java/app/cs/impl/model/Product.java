package app.cs.impl.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class Product implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@GraphId
	private Long graphID;
	private String id;
	private String label;
	private String title;
	private String isfolder;
	private String type;
	private String image;
	private String description;
	private String service;
	private String isLazy;
	private String isFolder;
	private String key;
	private String rendererTemplateId;
	private String rendererTemplateName;
	private String response;
	private String myId;
	

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	@Override
	public String toString() {
		return "{id:\"" + this.id + "\",label:\"" + this.label + "\",title:\"" + this.title + "\""
				+ ",type:\"" + this.type + "\",image:\"" + this.image + "\""
				+ ",description:\"" + this.description + "\",service:\"" + this.service + "\",isFolder:" + this.isFolder+ ""
				+ ",__type__:\"Product\",rendererTemplateId:\"" + this.rendererTemplateId + "\""
				+ ",rendererTemplateName:\"" + this.rendererTemplateName + "\",myId:\"" + this.myId + "\"}";
	}
	
	public Product() {

	}

	public Product(String productId, String productName, String service) {
		this.id = productId;
		this.title = productName;
		this.service = service;
	}
	
	public Long getGraphID() {
		return graphID;
	}

	public void setGraphID(Long graphID) {
		this.graphID = graphID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIsfolder() {
		return isfolder;
	}

	public void setIsfolder(String isfolder) {
		this.isfolder = isfolder;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getIsLazy() {
		return isLazy;
	}

	public void setIsLazy(String isLazy) {
		this.isLazy = isLazy;
	}

	public String getIsFolder() {
		return isFolder;
	}

	public void setIsFolder(String isFolder) {
		this.isFolder = isFolder;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	public String getRendererTemplateId() {
		return rendererTemplateId;
	}

	public void setRendererTemplateId(String rendererTemplateId) {
		this.rendererTemplateId = rendererTemplateId;
	}

	public String getRendererTemplateName() {
		return rendererTemplateName;
	}

	public void setRendererTemplateName(String rendererTemplateName) {
		this.rendererTemplateName = rendererTemplateName;
	}
	
	public String getMyId() {
		  return myId;
		 }

		 public void setMyId(String myId) {
		  this.myId = myId;
		 }
		
	
}
