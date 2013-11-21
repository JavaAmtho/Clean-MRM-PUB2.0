package app.cs.impl.inmemory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cs.data.api.core.nosql.redis.InMemoryNoSqlRepository;

@Component
public class InMemoryUniqueId {

	private static final String REDIS_KEY = "dimensionUniqueID";
	private InMemoryNoSqlRepository noSqlTemplateForRedis;
	
	@Autowired
	public InMemoryUniqueId(InMemoryNoSqlRepository noSqlTemplateForRedis) {
		this.noSqlTemplateForRedis = noSqlTemplateForRedis;
	}
	
	public String getUniqueIDForDimensions(){
		
		String uniqueID = noSqlTemplateForRedis.get(REDIS_KEY);
		if(uniqueID == null || uniqueID.isEmpty()){
			uniqueID = "1";
		}
		int integerToIncrement = Integer.parseInt(uniqueID);
		integerToIncrement ++;
		setNewUniqueId(Integer.toString(integerToIncrement));
		return uniqueID;
	}
	
	private void setNewUniqueId(String newId){
		noSqlTemplateForRedis.set(REDIS_KEY, newId);
	}
	
	
}
