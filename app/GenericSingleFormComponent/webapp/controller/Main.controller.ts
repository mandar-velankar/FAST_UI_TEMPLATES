import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import GenericFormState, { GenericFormModelData, templateKeys } from "../state/GenericFormState";
import Context from "sap/ui/model/Context";
import Control from "../model/Control";
import UI5Control, { $ControlSettings } from "sap/ui/core/Control";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericSingleFormComponent.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;
	protected GenericFormState: GenericFormState;
	protected GenericFormStateData: GenericFormModelData;

	public async onInit(): Promise<void> {
		this.GenericFormState = this.getOwnerComponent().getModel("tempModel") as GenericFormState;
		this.GenericFormStateData = this.GenericFormState.getData() as GenericFormModelData;
		const componentData = this.getOwnerComponent().getComponentData() as templateKeys;

		await this.GenericFormState.read(componentData);
		this.setModel(this.GenericFormStateData.countryTemplate.getTemplate().getODataModel(), "data");
		//if keys come in - keys should be incoming of startup params
		// const keys = await this.getModel("data").createKey(`/${this.GenericFormStateData.countryTemplate.getTemplate().getEntity()}`,keys);
		//no keys, generate createEntry
		
		await (this.getModel("data") as ODataModel).metadataLoaded();
		let path = "";
		if(componentData.keys){
			path = (this.getModel("data") as ODataModel).createKey(`/${this.GenericFormStateData.countryTemplate.getTemplate().getEntity()}`,componentData.keys);
		}else{
			const newEntryContext = (this.getModel("data") as ODataModel).createEntry(`/${this.GenericFormStateData.countryTemplate.getTemplate().getEntity()}`,{});
			path = newEntryContext.getPath();
		}
		
		this.getView().bindElement({
			path:path,//`/${this.GenericFormStateData.countryTemplate.getTemplate().getEntity()}`,
			model: 'data'			
		});
	}
	public fieldsFactory(id:string,context:Context):UI5Control{
		const control = (context.getObject() as Control)
		return control.generateControl();
	}

}
