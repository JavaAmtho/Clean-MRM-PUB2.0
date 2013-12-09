package app.cs.impl.marker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import app.cs.impl.model.MarkerObject;

import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;

@Controller
public class MarkerRepository {

	private NoSqlRepository mongoRepository;
	
	@Autowired
	public MarkerRepository(NoSqlRepository mongoRepository) {
		this.mongoRepository = mongoRepository;
	}
	
	public boolean createMarker(MarkerObject marker){
		boolean status = mongoRepository.save(marker);
		return status;
	}
	
}
