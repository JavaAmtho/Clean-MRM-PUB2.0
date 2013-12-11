package app.cs.interfaces.marker;

import java.util.List;

import app.cs.impl.model.MarkerObject;

public interface IMarkerRepository {

	public boolean createMarker(MarkerObject marker);

	public List<MarkerObject> getAllMarkers();

}
