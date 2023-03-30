import BaseController from "./BaseController";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.controller
 */
export default class App extends BaseController {

	public onInit() : void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
	}

}
