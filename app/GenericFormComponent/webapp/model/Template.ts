import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { TemplateEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Tab from "./Tab";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.models
 */
export default class Template extends BaseObject<TemplateEntity> {
    private id: string;
    private title: string;
    private service: string;
    private entity: string;
    private type: string;
    private tabs: Tab[] = [];

    constructor(data?: TemplateEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.service = data.Service;
            this.entity = data.Entity;
            this.type = data.Type;
            for(const tab of data.Tabs){
                this.tabs.push(new Tab(tab));
            }
        }
    }
    public getId() {
        return this.id;
    }
    public getODataModel(){
        return new ODataModel(`/v2/${this.service}`);
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
            Tabs: this.tabs.map(tab => tab.getJSON())
        };
    }
}