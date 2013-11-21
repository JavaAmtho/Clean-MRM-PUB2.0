package app.cs.actions.contentplanning.assortment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.inmemory.InMemoryUniqueId;
import app.cs.impl.model.Assortment;
import app.cs.impl.model.Product;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.CreateAssortmentRequest;
import app.cs.model.request.RequestModel;
import app.cs.model.response.PublicationAssetObjectResponse;
import app.cs.model.response.ResponseModel;
import app.cs.utils.CommonConstants;

@Component
public class CreateAssortment implements Interactor {

//	private IAssortmentRepository assortmentRepository;

	private IPublicationAssetRepository publicationAssetRepository;
	
	private InMemoryUniqueId inMemoryUniqueId;

	@Autowired
	public CreateAssortment(/*IAssortmentRepository assortmentRepository*/IPublicationAssetRepository publicationAssetRepository,
			InMemoryUniqueId inMemoryUniqueId) {
//		this.assortmentRepository = assortmentRepository;
		this.publicationAssetRepository = publicationAssetRepository;
		this.inMemoryUniqueId = inMemoryUniqueId;
	}

	public ResponseModel execute(RequestModel model) {

/*		CreateAssortmentRequest createAssortmentRequest = (CreateAssortmentRequest) request;
		MultiDimensionalObject assortmentObject = (MultiDimensionalObject) assortmentRepository
				.getDomain("MultiDimensionalObject");

		Assortment assortment = createAssortmentRequest.getAssortment();

		assortmentObject.setId(UUID.randomUUID().toString());
		assortmentObject.setPath(createAssortmentRequest.getPath());
		assortmentObject.setName(createAssortmentRequest.getName());
		assortmentObject.setTitle(createAssortmentRequest.getName());
		assortmentObject.setIsFolder(false);
		assortmentObject.setType(type);
		assortmentObject.setDimensionInfo(new DimensionInfo());
		assortmentObject.setProducts(assortment.getProducts());
		assortmentRepository.save(assortmentObject);
		return new EmptyResponse();*/
		CreateAssortmentRequest request = (CreateAssortmentRequest) model;
		PublicationAssetObject assortmentObject = new PublicationAssetObject();
		
		Assortment assortment = request.getAssortment();
		
		assortmentObject.setId(inMemoryUniqueId.getUniqueIDForDimensions());
		assortmentObject.setPath(request.getPath());
//		assortmentObject.setName(request.getName());
		assortmentObject.setTitle(request.getName());
		assortmentObject.setIsFolder(false);
		assortmentObject.setType(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT);
//		assortmentRepository.save(assortmentObject);
		
		assortmentObject = publicationAssetRepository.save(assortmentObject);
		List<Product> prod = new ArrayList<Product>();
		if(assortment.getProducts() != null && assortment.getProducts().size() > 0){
			prod = assortment.getProducts();
			publicationAssetRepository.updateAssortmentProducts(assortmentObject.getId(),prod);
		}
		assortmentObject.setProducts(prod);
		return new PublicationAssetObjectResponse(assortmentObject);

	}

}
