package app.cs.actions.publicationstructuring.page;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import app.cs.boundary.delivery.Interactor;
import app.cs.impl.model.Assortment;
import app.cs.impl.model.MultiDimensionalObject;
import app.cs.impl.model.PageRule;
import app.cs.impl.model.PageRules;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.impl.model.RuleResult;
import app.cs.interfaces.assortment.IAssortmentRepository;
import app.cs.interfaces.pagerule.IPageRuleRepository;
import app.cs.interfaces.publicationasset.IPublicationAssetRepository;
import app.cs.model.request.RequestModel;
import app.cs.model.request.UpdateAssortmentRequest;
import app.cs.model.request.UpdatePublicationAssetObjectRequest;
import app.cs.model.response.EmptyResponse;
import app.cs.model.response.ResponseModel;

@Component
public class UpdatePage implements Interactor {

	private IPublicationAssetRepository publicationAssetRepository;
	
	private IPageRuleRepository pageRuleRepository;
	
	@Autowired
	public UpdatePage(IPublicationAssetRepository publicationRepository,
			IPageRuleRepository pageRuleRepository) {
		this.publicationAssetRepository = publicationRepository;
		this.pageRuleRepository = pageRuleRepository;
	}

	@Override
	public ResponseModel execute(RequestModel requestModel) {

		UpdatePublicationAssetObjectRequest updatePageRequest = (UpdatePublicationAssetObjectRequest) requestModel;
		PublicationAssetObject page = updatePageRequest.getPublicationAssetObject();
		publicationAssetRepository.editProperty(page);
		if(page.getFileID() != null){
			savePageRules(page);
		}
		return new EmptyResponse();
	}
	
	private void savePageRules(PublicationAssetObject page) {
		PageRules pageRule = new PageRules();
		RuleResult ruleResult = new RuleResult();
		ruleResult.setMasterPageId(page.getFileID());
		PageRule rule = new PageRule();
		rule.setRuleResult(ruleResult);
		List<PageRule> pageRules = new ArrayList<PageRule>();
		pageRules.add(rule);
		pageRule.setPageRules(pageRules);
		pageRule.setId(page.getId());
		pageRuleRepository.savePageRules(pageRule);
	}

}
