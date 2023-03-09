import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import GenericTableState, { GenericTableModelData } from "../state/GenericTableState";
import Context from "sap/ui/model/Context";
import Column from "../model/Column";
import UIColumn from "sap/ui/table/Column";
import Text from "sap/m/Text";
import Control from "sap/ui/core/Control";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/ui/table/Table";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.controller
 */
export default class Main extends BaseController {
	protected genericTableState: GenericTableState;
	protected genericTableStateData: GenericTableModelData;
	private formatter = formatter;

	public async onInit(): Promise<void> {
		this.genericTableState = this.getOwnerComponent().getModel("tempModel") as GenericTableState;
		this.genericTableStateData = this.genericTableState.getData() as GenericTableModelData;

		await this.genericTableState.read();
		this.setModel(this.genericTableStateData.countryTemplate.getTemplate().getODataModel(), "data");


		const table = (this.byId("genericTable") as Table);
		table.bindRows({
			path: `/${this.genericTableStateData.countryTemplate.getTemplate().getEntity()}`,
			model: 'data',
			suspended:false
		});
	}

	public createColumns(id: string, context: Context): UIColumn {
		const col = (context.getObject() as Column);

		return new UIColumn({
			label: col.getTitle(),
			template: col.getControl().generateControl()
		});
	}
}
