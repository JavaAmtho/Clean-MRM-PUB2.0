package app.cs.model.request;

import org.springframework.stereotype.Component;

import app.cs.impl.model.TaskInfo;

@Component
public class AddTaskToDimensionRequest implements RequestModel{

	private String dimensionId;
	private TaskInfo task;
	
	public AddTaskToDimensionRequest() {
	}
	
	public AddTaskToDimensionRequest(String dimensionId,
			TaskInfo task) {
		this.dimensionId = dimensionId;
		this.task = task;
	}
	
	public String getDimensionId() {
		return dimensionId;
	}
	public void setDimensionId(String dimensionId) {
		this.dimensionId = dimensionId;
	}
	public TaskInfo getTask() {
		return task;
	}
	public void setTask(TaskInfo task) {
		this.task = task;
	}
}
