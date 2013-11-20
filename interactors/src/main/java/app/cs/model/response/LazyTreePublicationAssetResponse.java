package app.cs.model.response;

import java.util.List;

import app.cs.impl.model.PublicationAssetObject;

import com.cs.data.api.core.GenericDomain;



public class LazyTreePublicationAssetResponse implements ResponseModel,TreeModel{
	

	private List<PublicationAssetObject> tree;
	
	public <E> LazyTreePublicationAssetResponse(List<PublicationAssetObject> tree) {
		super();
		this.tree = tree;
	}


	@Override
	public <E> List<E> getTree() {
		return (List<E>) tree;
	}

	public <E> void setTree(List<PublicationAssetObject> tree) {
		this.tree = tree;
	}

	@Override
	public GenericDomain getResponse() {
		// TODO Auto-generated method stub
		return null;
	}


}
