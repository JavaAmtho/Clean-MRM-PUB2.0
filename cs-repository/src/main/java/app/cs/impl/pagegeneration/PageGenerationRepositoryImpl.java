package app.cs.impl.pagegeneration;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import app.cs.impl.model.PageRule;
import app.cs.impl.model.PageRules;
import app.cs.impl.model.Product;
import app.cs.impl.model.PublicationAssetObject;
import app.cs.impl.pagerule.PageRuleRepositoryImpl;
import app.cs.impl.publicationasset.PublicationAssetRepository;
import app.cs.interfaces.pagegeneration.IPageGenerationRepository;
import app.cs.interfaces.pagerule.IPageRuleRepository;

import com.cs.data.api.webservices.rest.IRestClient;

@Component
public class PageGenerationRepositoryImpl implements IPageGenerationRepository {

//	private ChapterRepository chapterRepository;
	private PublicationAssetRepository publicationAssetRepository;
	private IPageRuleRepository pageRuleRepository;

	private static final String CHARSET = "ISO-8859-1,utf-8;q=0.7,*;q=0.3"; //$NON-NLS-1$
	private static final String ACCEPT_CHARSET = "Accept-Charset"; //$NON-NLS-1$
	private static final String ACCEPTEDTYPES = "*/*"; //$NON-NLS-1$
	private static final String ACCEPT = "Accept"; //$NON-NLS-1$
	private static final String XML_HTTP_REQUEST = "XMLHttpRequest"; //$NON-NLS-1$
	private static final String X_REQUESTED_WITH = "X-Requested-With"; //$NON-NLS-1$
	private static final String USER_AGENT_INFO = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.63 Safari/537.31"; //$NON-NLS-1$
	private static final String USER_AGENT = "User-Agent"; //$NON-NLS-1$
	private static final String HOST = "Host"; //$NON-NLS-1$
	private static final String LANGUAGE = "en-US,en;q=0.8"; //$NON-NLS-1$
	private static final String ACCEPT_LANGUAGE = "Accept-Language"; //$NON-NLS-1$
	@Value("${host}")
	private String HOSTIP;
	@Value("${url}")
	private String BASE_URL;
	@Value("${pageGenerationUrl}")
	private String LIST_URL;

	private IRestClient client;

	@Autowired
	public PageGenerationRepositoryImpl(IRestClient client/*,
			ChapterRepository chapterRepository*/,
			PublicationAssetRepository publicationAssetRepository,
			PageRuleRepositoryImpl pageRuleRepository) {
		this.client = client;
//		this.chapterRepository = chapterRepository;
		this.publicationAssetRepository = publicationAssetRepository;
		this.pageRuleRepository = pageRuleRepository;
	}

	@Override
	public String createAndPlanWBD(String logicalPageID) {

		String output = "";
		String input = "";
		String productIds = "";
		String assortmentID = "";
		String masterPageID = "";

		int countOfProducts = 1;

		// get the rule
		System.out.println(logicalPageID);
		PageRules pageRules = pageRuleRepository.getPageRulesFor(logicalPageID);
		if (pageRules == null) {
			return "pageRules not found";
		}
		List<PageRule> pageRulesList = pageRules.getPageRules();
		for (PageRule rule : pageRulesList) {
			masterPageID = rule.getRuleResult().getMasterPageId();
		}
		
		PublicationAssetObject assortment = publicationAssetRepository.getAssortmentUnderPage(logicalPageID);

		// get the products from assortment
		// iterate over them and create a json string of ids
		List<Product> products = assortment.getProducts();
		for (Product product : products) {
			if (countOfProducts < products.size()) {
				productIds += "{\"id\":\"" + product.getId() + "\", \"rendererTemplateId\":\"" + product.getRendererTemplateId() + "\"},";
			} else {
				productIds += "{\"id\":\"" + product.getId() + "\", \"rendererTemplateId\":\"" + product.getRendererTemplateId() + "\"}";
			}
			countOfProducts++;
		}

		// create string to POST
		input = "{\"templateID\":\"" + masterPageID + "\",\"products\":["
				+ productIds + "]}";
		
		System.out.println(input);
/*
		Map<String, String> headerParameters = new HashMap<String, String>();
		prepareHeaderParameters(headerParameters);

		// create wbd and plan assortment
		ClientResponse response = client
				.post(LIST_URL, headerParameters, input);

		if (response.getStatus() != 200) {
			return "Not Successful";
		}

		output = response.getEntity(String.class);

		JSONParser jsonParser = new JSONParser();

		try {
			JSONObject jsonObject = (JSONObject) jsonParser.parse(output);
			additionalInformation.put("mamFileID",
					(String) jsonObject.get("mamFileID"));
			additionalInformation.put("editUrl",
					(String) jsonObject.get("editorURL"));
		} catch (ParseException e) {
			return "Error";
		}

		// store the information in the rule
		pageRule.setAdditionalInformation(additionalInformation);
		pageRuleRepository.savePageRules(pageRules);*/

//		return output;
		return input;
	}

	private void prepareHeaderParameters(Map<String, String> headerParameters) {
		headerParameters.put(ACCEPT_LANGUAGE, LANGUAGE);
		headerParameters.put(HOST, HOSTIP);
		headerParameters.put(USER_AGENT, USER_AGENT_INFO);
		headerParameters.put(X_REQUESTED_WITH, XML_HTTP_REQUEST);
		headerParameters.put(ACCEPT, ACCEPTEDTYPES);
		headerParameters.put(ACCEPT_CHARSET, CHARSET);
	}

}
