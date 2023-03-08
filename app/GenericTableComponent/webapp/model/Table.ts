import { TableEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";
import Column from "./Column";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class Table extends BaseObject<TableEntity> {
    private id: string;
    private title: string;
    private columns: Column[] = [];

    constructor(data?: TableEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            for(const col of data.Columns){
                this.columns.push(new Column(col));
            }
        }
    }
    public getJSON(): TableEntity {
        return {
            ID: this.id,
            Title: this.title,
            Columns: this.columns.map(col => col.getJSON())
        };
    }
}