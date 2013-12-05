package app.cs.actions.publicationstructuring.page;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import app.cs.impl.delegate.factory.DomainFactory;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.publicationasset.PublicationAssetRepository;
import app.cs.model.request.MovePageRequest;

@RunWith(MockitoJUnitRunner.class)
public class MovePageUnitTests {

	private MovePage movePage;

	@Mock
	private PublicationAssetRepository publicationAssetRepository;

	MovePageRequest movePageRequest;

	@Mock
	private DomainFactory factory;

	@Before
	public void setUp() {
		movePage = new MovePage(publicationAssetRepository);

	}

	@Test
	public void itShouldMoveAChapter() {
		// given
		String result = "success";
		String oldPath = "testpath";

		String type = "Campaign";
		String name = "CP01";
		String path = "Mp01,P01";
		boolean isFolder = false;
		String newPath = "Mp02,p02";
		MultiDimensionalObject object = new MultiDimensionalObject(name, type,
				path, isFolder);

		movePageRequest = new MovePageRequest(type, name, path, isFolder,
				newPath);
//TODO:!!!!
		// when
		/*when(publicationAssetRepository.getDomain("MultiDimensionalObject")).thenReturn(
				object);
		movePage.execute(movePageRequest);

		// then
		verify(publicationAssetRepository).move(object, newPath);
		assertEquals(isFolder,false);*/


	}

}
