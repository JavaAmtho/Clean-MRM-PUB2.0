package app.cs.model.response;

import java.util.List;

import app.cs.impl.model.MultiDimensionalObject;

public class TreeResponse implements TreeResponseModel {

	private List<MultiDimensionalObject> tree;
	
	private String status;

	public TreeResponse(List<MultiDimensionalObject> tree,String status) {
		super();
		this.tree = tree;
		this.status = status;
	}
	
	@Override
	public <E> List<E> getResponse() {
		return (List<E>) tree;
	}

	public void setTree(List<MultiDimensionalObject> tree) {
		this.tree = tree;
	}

	@Override
	public String getStatus() {
		return status;
	}

}
