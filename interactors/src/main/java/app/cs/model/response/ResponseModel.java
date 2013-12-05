package app.cs.model.response;

import com.cs.data.api.core.GenericDomain;

public interface ResponseModel {

	public abstract GenericDomain getResponse();
	
	public abstract String getStatus();
	
}
