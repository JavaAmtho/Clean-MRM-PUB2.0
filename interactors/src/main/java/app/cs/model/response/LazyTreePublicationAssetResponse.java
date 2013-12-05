package app.cs.model.response;

import java.util.List;

import app.cs.impl.model.PublicationAssetObject;



public class LazyTreePublicationAssetResponse implements TreeResponseModel{
	

	private List<PublicationAssetObject> tree;
	
	private String status;
	
	public <E> LazyTreePublicationAssetResponse(
			List<PublicationAssetObject> tree, String status) {
		super();
		this.tree = tree;
		this.status = status;
	}


	@Override
	public <E> List<E> getResponse() {
		return (List<E>) tree;
	}

	public <E> void setTree(List<PublicationAssetObject> tree) {
		this.tree = tree;
	}

	@Override
	public String getStatus() {
		return status;
	}


}
