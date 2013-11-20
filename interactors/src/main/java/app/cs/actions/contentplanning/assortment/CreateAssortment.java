package app.cs.actions.contentplanning.assortment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
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

	@Autowired
	public CreateAssortment(/*IAssortmentRepository assortmentRepository*/IPublicationAssetRepository publicationAssetRepository) {
//		this.assortmentRepository = assortmentRepository;
		this.publicationAssetRepository = publicationAssetRepository;
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
		
		assortmentObject.setId(request.getName());
		assortmentObject.setPath(request.getPath());
		assortmentObject.setName(request.getName());
		assortmentObject.setTitle(request.getName());
		assortmentObject.setIsFolder(false);
		assortmentObject.setType(CommonConstants.PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT);
//		assortmentRepository.save(assortmentObject);
		
		assortmentObject = publicationAssetRepository.save(assortmentObject);
		List<Product> prod = new ArrayList<Product>();
		assortmentObject.setProducts(prod);
		//TODO: Has to be optimized (while creating page add assortment in relationship and save)
		//TODO: after creation of assortment, publicationAssetObject(page object) is stale since new relationship 
		//		has been added in the page object for the newly created assortment
		return new PublicationAssetObjectResponse(assortmentObject);

	}

}
