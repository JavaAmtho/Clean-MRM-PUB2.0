package app.cs.model.response;

import java.util.List;

import com.cs.data.api.core.GenericDomain;

import app.cs.impl.model.PublicationAssetObject;

public class LazyTreePublicationAssetResponse implements ResponseModel,TreeModel{
	

	
	public LazyTreePublicationAssetResponse(List<PublicationAssetObject> tree) {
		super();
		this.tree = tree;
	}

	List<PublicationAssetObject> tree;

	@Override
	public <E> List<E> getTree() {
		return (List<E>) tree;
	}

	public void setTree(List<PublicationAssetObject> tree) {
		this.tree = tree;
	}

	@Override
	public GenericDomain getResponse() {
		// TODO Auto-generated method stub
		return null;
	}


}
