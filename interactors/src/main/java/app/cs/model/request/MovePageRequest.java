package app.cs.model.request;

import org.springframework.stereotype.Component;

@Component
public class MovePageRequest implements RequestModel {

	private String type;
	private String id;
	private String path;
	private String newPath;
	
	public MovePageRequest(){
		
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String name) {
		this.id = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getNewPath() {
		return newPath;
	}

	public void setNewPath(String newPath) {
		this.newPath = newPath;
	}

	public boolean isFolder() {
		return isFolder;
	}

	public void setFolder(boolean isFolder) {
		this.isFolder = isFolder;
	}

	private boolean isFolder;

	public MovePageRequest(String type, String name, String path,
			boolean isFolder, String newPath) {
		super();
		this.type = type;
		this.id = name;
		this.path = path;
		this.isFolder = isFolder;
		this.newPath = newPath;
	}

}
