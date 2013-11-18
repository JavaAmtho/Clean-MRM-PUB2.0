package app.cs.model.request;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class SwitchPerspectiveRequest implements RequestModel{

	String id;
	String type;
	String path;
	String structure;
	List<String> groupID;
	
	public SwitchPerspectiveRequest() {
		// TODO Auto-generated constructor stub
	}
	
	public SwitchPerspectiveRequest(String id, String type,String path,
			String structure, List<String> groupID){
		this.id = id;
		this.type = type;
		this.path = path;
		this.structure = structure;
		this.groupID = groupID;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getStructure() {
		return structure;
	}
	public void setStructure(String structure) {
		this.structure = structure;
	}
	public List<String> getGroupID() {
		return groupID;
	}
	public void setGroupID(List<String> groupID) {
		this.groupID = groupID;
	}
	
}
