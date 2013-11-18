package app.cs.actions.publicationplanning.dimension;import static org.fest.assertions.Assertions.assertThat;import static org.mockito.Mockito.verify;import static org.mockito.Mockito.when;import org.junit.Before;import org.junit.Test;import org.junit.runner.RunWith;import org.mockito.Mock;import org.mockito.runners.MockitoJUnitRunner;import app.cs.impl.delegate.factory.IDomainFactory;import app.cs.impl.dimension.DimensionRepository;import app.cs.impl.inmemory.InMemoryViewStructure;import app.cs.impl.model.MultiDimensionalObject;import app.cs.impl.publicationasset.PublicationAssetRepository;import app.cs.impl.slicingdicing.TreeBuilder;import app.cs.model.request.CreateDimensionRequest;import app.cs.model.request.RequestModel;import app.cs.model.response.MultiDimensionalObjectResponse;@RunWith(MockitoJUnitRunner.class)public class CreateDimensionUnitTest {	private CreateDimension createDimension;	@Mock	private MultiDimensionalObject dimensionModel;	@Mock	private TreeBuilder treeBuilder;	@Mock	private DimensionRepository dimensionRepository;		@Mock	private PublicationAssetRepository publicationAssetRepository;	@Mock	private IDomainFactory factory;	@Mock	private InMemoryViewStructure cache;	@Before	public void setUp() {		createDimension = new CreateDimension(dimensionRepository,publicationAssetRepository);	}	@Test	public void itShouldCreateADimension() {		// given		String name = "test";		String path = "A,B";		String type = "spread";		boolean isFolder = true;		// when		MultiDimensionalObject test = new MultiDimensionalObject();		when(dimensionRepository.getDomain("MultiDimensionalObject"))				.thenReturn(test);		when(dimensionRepository.createDimension(test)).thenReturn(test);		RequestModel model = new CreateDimensionRequest(type, name, path,				isFolder);		MultiDimensionalObjectResponse response = (MultiDimensionalObjectResponse) createDimension				.execute(model);		// then		verify(dimensionRepository).createDimension(test);		assertThat(response.getResponse()).isEqualTo(test);	}}