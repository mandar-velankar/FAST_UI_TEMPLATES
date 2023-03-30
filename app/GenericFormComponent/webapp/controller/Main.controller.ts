import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import GenericFormState, { GenericFormModelData, templateKeys } from "../state/GenericFormState";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;
	protected GenericFormState: GenericFormState;
	protected GenericFormStateData: GenericFormModelData;

	public async onInit(): Promise<void> {
		this.GenericFormState = this.getOwnerComponent().getModel("tempModel") as GenericFormState;
		this.GenericFormStateData = this.GenericFormState.getData() as GenericFormModelData;

		await this.GenericFormState.read(this.getOwnerComponent().getComponentData() as templateKeys);
		// this.setModel(this.GenericFormStateData.countryTemplate.getTemplate().getODataModel(), "data");
	}

}
