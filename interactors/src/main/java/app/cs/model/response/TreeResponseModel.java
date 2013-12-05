package app.cs.model.response;

import java.util.List;

import app.cs.impl.model.PublicationAssetObject;

public interface TreeResponseModel {

	public abstract String getStatus();
	
	public abstract <E> List<E> getResponse();

}
