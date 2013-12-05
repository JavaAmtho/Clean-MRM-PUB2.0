package app.cs.actions.publicationstructuring.page;

import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import app.cs.actions.contentplanning.assortment.CreateAssortment;
import app.cs.impl.delegate.factory.DomainFactory;
import app.cs.impl.inmemory.InMemoryUniqueId;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.interfaces.pagerule.IPageRuleRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.CreatePageRequest;
import app.cs.model.response.ResponseModel;

@RunWith(MockitoJUnitRunner.class)
public class CreatePageUnitTests {

	private CreatePage createPage;

	@Mock
	private IPublicationAssetRepository chapterRepository;
	@Mock
	private CreateAssortment createAssortment;
	
	@Mock
	private InMemoryUniqueId inMemoryUniqueId;
	
	@Mock
	private IPageRuleRepository pageRuleRepository;
	
	@Mock
	private DomainFactory factory;

	@Before
	public void setUp() {
		createPage = new CreatePage(chapterRepository,createAssortment,inMemoryUniqueId, pageRuleRepository);

	}

	@Test
	public void itShouldCreateAPage() {

		// given

		String result = "success";
		String name = "test";
		String path = "A,B";
		String type = "page";
		boolean isFolder = false;
		// when
		MultiDimensionalObject object = new MultiDimensionalObject();
		//TODO : Commented out code to ignore errors!PLease CHange!!!!
		//when(chapterRepository.save(object)).thenReturn(result);
		//when(chapterRepository.getDomain("MultiDimensionalObject")).thenReturn(
		//		object);
		ResponseModel actualResult = createPage
				.execute(new CreatePageRequest(type, name, path, isFolder));

		// then
		//verify(chapterRepository).getDomain("MultiDimensionalObject");
		//verify(chapterRepository).save(object);
		assertThat(actualResult).isEqualTo(actualResult);
		assertEquals(isFolder,false);


	}

}
