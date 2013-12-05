package app.cs.model.response;

import java.util.List;

import org.springframework.stereotype.Component;

import com.cs.data.api.core.GenericDomain;

import app.cs.impl.model.PageRules;

@Component
public class AllPageRulesResponse implements ResponseModel {

	private List<PageRules> listOfPageRules;

	public List<PageRules> getListOfPageRules() {
		return listOfPageRules;
	}

	public void setListOfPageRules(List<PageRules> listOfPageRules) {
		this.listOfPageRules = listOfPageRules;
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
