import ODataModel from "sap/ui/model/odata/v2/ODataModel";
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
    private entity: string;
    private type: string;
    private table: Table;

    constructor(data?: TemplateEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.service = data.Service;
            this.entity = data.Entity;
            this.type = data.Type;
            this.table = new Table(data.Table); 
        }
    }
    public getId() {
        return this.id;
    }
    public getODataModel(){
        return new ODataModel(`/v2/${this.service}`);
    }
    /**
     * getTable
     */
    public getTable() {
        return this.table;
    }
    /**
     * getEntity
     */
    public getEntity() {
        return this.entity;
    }
    public getJSON(): TemplateEntity {
        return {
            ID: this.id,
            Title: this.title,
            Service: this.service,
            Entity: this.entity,
            Type: this.type,
            Table: this.table.getJSON()
        };
    }
}