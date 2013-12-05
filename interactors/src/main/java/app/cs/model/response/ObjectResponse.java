package app.cs.model.response;


public class ObjectResponse implements ResponseModel{

	private String status;
	
	private Object object;
	
	public ObjectResponse(Object object, String status) {
		this.status = status;
		this.object = object;
	}
	
	@Override
	public Object getResponse() {
		// TODO Auto-generated method stub
		return object;
	}

	@Override
	public String getStatus() {
		// TODO Auto-generated method stub
		return status;
	}

}
