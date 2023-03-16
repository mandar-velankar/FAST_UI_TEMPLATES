import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import CountryTemplate from "../model/CountryTemplate";
import GenericTableService from "../service/GenericTableService";

export type GenericTableModelData = {
    countryTemplate:CountryTemplate,
    main:any
    // todoItems: Array<TodoItem>;
    // completedCount: number;
    // notCompletedCount: number;
    // new: TodoItem;
    // edit: TodoItem;
};
export type templateKeys = {countryCode:string,appID:string,page:string};
/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.state
 */
export default class GenericTableState extends JSONModel {
    private url: string;
    private genericTableService: GenericTableService;
    private oData: GenericTableModelData;
    constructor(url: string) {
        super({
        });


        this.url = url;

        const model = new ODataModel({
            serviceUrl: url,
            odataVersion: "4.0",
            autoExpandSelect: true,
            earlyRequests: true,
            operationMode: "Server",
            synchronizationMode: "None"
        });
        this.genericTableService = new GenericTableService(model);
    }
    async read(keys:templateKeys): Promise<void> {
        const templateResponse = await this.genericTableService.getTemplate(keys);
        this.oData.countryTemplate = new CountryTemplate(templateResponse);
        this.updateBindings(true);
    }

}