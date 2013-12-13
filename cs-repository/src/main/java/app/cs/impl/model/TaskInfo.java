package app.cs.impl.model;

public class TaskInfo {

	private String taskName;
	private String startDate;
	private String endDate;
	private String originalEstimate;
	private String remainingEstimate;
	private String priority;
	private String summary;
	private String description;
	private String assignee;
	private String status;
	
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getOriginalEstimate() {
		return originalEstimate;
	}
	public void setOriginalEstimate(String originalEstimate) {
		this.originalEstimate = originalEstimate;
	}
	public String getRemainingEstimate() {
		return remainingEstimate;
	}
	public void setRemainingEstimate(String remainingEstimate) {
		this.remainingEstimate = remainingEstimate;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAssignee() {
		return assignee;
	}
	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return this.taskName;
	}
}
