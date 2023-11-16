import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import CountryTemplate from "../model/CountryTemplate";
import GenericFormService from "../service/GenericFormService";

export type GenericFormModelData = {
    countryTemplate:CountryTemplate,
    main:any
    // todoItems: Array<TodoItem>;
    // completedCount: number;
    // notCompletedCount: number;
    // new: TodoItem;
    // edit: TodoItem;
};
export type templateKeys = {countryCode?:string,appID?:string,page?:string,productScope?:string,keys?:object};
/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.state
 */
export default class GenericFormState extends JSONModel {
    private url: string;
    private GenericFormService: GenericFormService;
    private oData: GenericFormModelData;
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
        this.GenericFormService = new GenericFormService(model);
    }
    async read(keys:templateKeys): Promise<void> {
        const templateResponse = await this.GenericFormService.getTemplate(keys || {});
        this.oData.countryTemplate = new CountryTemplate(templateResponse);
        this.updateBindings(true);
    }

}