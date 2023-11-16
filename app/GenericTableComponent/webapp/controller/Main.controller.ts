import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import GenericTableState, { GenericTableModelData, templateKeys } from "../state/GenericTableState";
import Context from "sap/ui/model/Context";
import Column from "../model/Column";
import UIColumn from "sap/ui/table/Column";
import Text from "sap/m/Text";
import Control from "sap/ui/core/Control";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/m/Table";
import ColumnListItem from "sap/m/ColumnListItem";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import Event from "sap/ui/base/Event";
import ListItemBase from "sap/m/ListItemBase";

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

		await this.genericTableState.read(this.getOwnerComponent().getComponentData() as templateKeys);
		this.setModel(this.genericTableStateData.countryTemplate.getTemplate().getODataModel(), "data");

		const cols = this.genericTableStateData.countryTemplate.getTemplate().getTable().getColumns();
		
		const table = (this.byId("genericTable") as Table);
		table.bindItems({
			path:`/${this.genericTableStateData.countryTemplate.getTemplate().getEntity()}`,
			model: 'data',
			template:new ColumnListItem({
				type:"Active",
				cells:cols.map(col=>col.getControl().generateControl())
			}),
			templateShareable:true
		})
	}
	/**
	 * onItemPress
	 */
	public onItemPress(event:Event) {
		const listItem = event.getParameter("listItem") as ListItemBase;
		const data = listItem.getBindingContext("data").getObject();
		this.getOwnerComponent().fireEvent("itemPress",{
			source:event.getSource(),
			data:data
		})
		// alternative way but no typescript support unless a type is defined for this
		// this.getOwnerComponent().fireItemPress({
		// 	source:event.getSource(),
		// 	data:data
		// });
		
	}
}
