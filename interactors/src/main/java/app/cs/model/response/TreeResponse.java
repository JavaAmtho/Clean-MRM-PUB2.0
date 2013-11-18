package app.cs.model.response;

import java.util.List;

import com.cs.data.api.core.GenericDomain;

import app.cs.impl.model.MultiDimensionalObject;

public class TreeResponse implements ResponseModel,TreeModel {
	
	public TreeResponse(List<MultiDimensionalObject> tree) {
		super();
		this.tree = tree;
	}

	List<MultiDimensionalObject> tree;

	public <E> List<E> getTree() {
		return (List<E>) tree;
	}

	public void setTree(List<MultiDimensionalObject> tree) {
		this.tree = tree;
	}
	
	@Override
	public GenericDomain getResponse() {
		// TODO Auto-generated method stub
		return null;
	}
}
