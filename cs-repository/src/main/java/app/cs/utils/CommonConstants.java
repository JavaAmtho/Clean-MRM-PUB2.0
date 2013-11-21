package app.cs.utils;

import java.util.ArrayList;
import java.util.List;

public class CommonConstants {
	
	public static final String FAIL_RESPONSE = "failed";
	public static final String SUCCESS_RESPONSE = "success";

	public class Dimension{
		public static final String DIMENSION_TYPE_MARKETING_INITIATIVE = "MarketingInitiative";
		public static final String DIMENSION_TYPE_CAMPAIGN = "Campaign";
		public static final String DIMENSION_TYPE_SUB_CAMPAIGN = "SubCampaign";
		public static final String DIMENSION_TYPE_COMMUNICATION_PLAN = "CommunicationPlan";
		public static final String DIMENSION_TYPE_COMMUNICATION_CHANNEL = "CommunicationChannel";
		public static final String DIMENSION_TYPE_PUBLICATION = "Publication";
	}

	
	public class PublicationAsset{
		public static final String PUBLICATION_ASSET_TYPE_CHAPTER = "Chapter";
		public static final String PUBLICATION_ASSET_TYPE_PAGE = "Page";
		public static final String PUBLICATION_ASSET_TYPE_ASSORTMENT = "Assortment";
	}
	
	public static final List<String> PUBLICATION_ASSETS_TYPE_ARRAY = new ArrayList<String>(){/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

	{
		add(PublicationAsset.PUBLICATION_ASSET_TYPE_CHAPTER);
		add(PublicationAsset.PUBLICATION_ASSET_TYPE_PAGE);
		add(PublicationAsset.PUBLICATION_ASSET_TYPE_ASSORTMENT);
		}};
		
	public static final List<String> DIMENSIONS_TYPE_ARRAY = new ArrayList<String>(){/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

		{
			add(Dimension.DIMENSION_TYPE_MARKETING_INITIATIVE);
			add(Dimension.DIMENSION_TYPE_CAMPAIGN);
			add(Dimension.DIMENSION_TYPE_SUB_CAMPAIGN);
			add(Dimension.DIMENSION_TYPE_COMMUNICATION_PLAN);
			add(Dimension.DIMENSION_TYPE_COMMUNICATION_CHANNEL);
			add(Dimension.DIMENSION_TYPE_PUBLICATION);
			}};
}
