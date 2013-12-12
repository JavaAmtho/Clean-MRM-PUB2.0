package app.cs.controller.publicationstructuring.page;

import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import app.cs.actions.publicationstructuring.page.GetAllPages;
import app.cs.controller.pub.publicationstructuring.page.GetAllPagesController;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.model.request.GetAllPagesRequest;

@RunWith(MockitoJUnitRunner.class)
public class GetAllPagesUnitTests {
	private GetAllPagesController getAllPages;

	@Mock
	private GetAllPages pages;
	@Mock
	private GetAllPagesRequest request;

	@Test
	public void itShouldCallGetAllPagesInteractor() {
		getAllPages = new GetAllPagesController(pages, request);
		String publicationId = null;
//		when(pages.execute(request)).thenReturn(new TreeResponse(null,""));
		MultiDimensionalObject publication = null;
		getAllPages.get(publicationId);
		verify(pages).execute(request);

	}
}
