package app.cs.controller.pub.publicationplanning.dimension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import app.cs.actions.publicationplanning.dimension.GetPublicationsForGivenChannel;
import app.cs.boundary.delivery.Interactor;
import app.cs.model.request.GetDimensionByIdRequest;
import app.cs.model.response.TreeResponse;

@Controller
public class GetDimensionsByIdController {

	private GetPublicationsForGivenChannel getPublicationsForGivenChannel;

	@Autowired
	public GetDimensionsByIdController(GetPublicationsForGivenChannel getPublicationsForGivenChannel) {
		this.getPublicationsForGivenChannel = getPublicationsForGivenChannel;
	}

	@RequestMapping(value = "/publication/get/{channelName}", method = RequestMethod.POST)
	public @ResponseBody
	TreeResponse getPublicationBy(
			@RequestBody GetDimensionByIdRequest byIdRequest,
			@PathVariable String channelName) {
		return ((TreeResponse) getPublicationsForGivenChannel
				.execute(byIdRequest));

	}
    @RequestMapping(value = "/communicationchannel/get/{planName}", method = RequestMethod.POST)
    public @ResponseBody
    TreeResponse getCommunicationChannelBy(
            @RequestBody GetDimensionByIdRequest byIdRequest,
            @PathVariable String planName) {
        return ((TreeResponse) getPublicationsForGivenChannel
                .execute(byIdRequest));

    }

}
