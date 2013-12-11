package app.cs.impl.marker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import app.cs.impl.model.MarkerObject;
import app.cs.interfaces.marker.IMarkerRepository;

import com.cs.data.api.core.nosql.mongodb.NoSqlRepository;

@Controller
public class MarkerRepository implements IMarkerRepository{

	private NoSqlRepository mongoRepository;
	
	@Autowired
	public MarkerRepository(NoSqlRepository mongoRepository) {
		this.mongoRepository = mongoRepository;
	}
	
	@Override
	public boolean createMarker(MarkerObject marker){
		boolean status = mongoRepository.save(marker);
		return status;
	}
	
	@Override
	public List<MarkerObject> getAllMarkers(){
		return mongoRepository.findAll(MarkerObject.class);
	}
	
}
