package app.cs.model.request;

import org.springframework.stereotype.Component;

import app.cs.impl.model.Assortment;
import app.cs.impl.model.PublicationAssetObject;

@Component
public class UpdatePageEditorURLRequest implements RequestModel {

	private String pageId;
	
	private String editorUrl;
	
	private String mamFileId;

	public String getPageId() {
		return pageId;
	}

	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	public String getEditorUrl() {
		return editorUrl;
	}

	public void setEditorUrl(String editorUrl) {
		this.editorUrl = editorUrl;
	}

	public String getMamFileId() {
		return mamFileId;
	}

	public void setMamFileId(String mamFileId) {
		this.mamFileId = mamFileId;
	}

	
	
}
