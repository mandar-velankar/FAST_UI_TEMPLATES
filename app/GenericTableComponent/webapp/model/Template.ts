import { TemplateEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";
import Table from "./Table";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class Template extends BaseObject<TemplateEntity> {
    private id: string;
    private title: string;
    private service: string;
    private saveEntity: string;
    private readEntity: string;
    private type: string;
    private table: Table;

    constructor(data?: TemplateEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.service = data.Service;
            this.saveEntity = data.SaveEntity;
            this.readEntity = data.ReadEntity;
            this.type = data.Type;
            this.table = new Table(data.Table); 
        }
    }
    public getId() {
        return this.id;
    }
    public getJSON(): TemplateEntity {
        return {
            ID: this.id,
            Title: this.title,
            Service: this.service,
            SaveEntity: this.saveEntity,
            ReadEntity: this.readEntity,
            Type: this.type,
            Table: this.table.getJSON()
        };
    }
}