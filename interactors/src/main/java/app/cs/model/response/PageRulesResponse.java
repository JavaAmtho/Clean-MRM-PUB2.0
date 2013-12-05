package app.cs.model.response;

import java.util.List;

import org.springframework.stereotype.Component;

import com.cs.data.api.core.GenericDomain;

import app.cs.impl.model.PageRule;

@Component
public class PageRulesResponse implements ResponseModel {

	private List<PageRule> pageRules;
	private String logicalPageID;

	public List<PageRule> getPageRules() {
		return pageRules;
	}

	public void setPageRules(List<PageRule> pageRules) {
		this.pageRules = pageRules;
	}

	public String getLogicalPageID() {
		return logicalPageID;
	}

	public void setLogicalPageID(String logicalPageID) {
		this.logicalPageID = logicalPageID;
	}

	@Override
	public GenericDomain getResponse() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getStatus() {
		// TODO Auto-generated method stub
		return null;
	}

}
