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
        void this.read();
    }
    async read(): Promise<void> {
        const templateResponse = await this.genericTableService.getTemplate('BR','StandardTenders','MASTER');
        this.oData.countryTemplate = new CountryTemplate(templateResponse);
        this.updateBindings(true);
    }

    // async create(title: string): Promise<void> {
    //     await this.todoService.addTodo(new TodoItem({ title }).getJSON());
    //     await this.read();
    // }

    // async delete(todoItem: TodoItem): Promise<void> {
    //     await this.todoService.deleteTodo(todoItem.getId());
    //     await this.read();
    // }

    // async update(todoItem: TodoItem): Promise<void> {
    // await this.todoService.updateTodo(todoItem.getJSON());
    // await this.read();
    // }
    // async updateTitle(id: number, title: string): Promise<void> {
    // const todoItem = this.getTodoItem(id);
    // todoItem.setCompleted(false);
    // todoItem.setTitle(title);
    // await this.update(todoItem);
    // }
}