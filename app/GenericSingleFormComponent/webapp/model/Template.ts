import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { TemplateEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Tab from "./Tab";
import Form from "./Form";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericSingleFormComponent.models
 */
export default class Template extends BaseObject<TemplateEntity> {
    private id: string;
    private title: string;
    private service: string;
    private entity: string;
    private type: string;
    private form: Form;

    constructor(data?: TemplateEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.service = data.Service;
            this.entity = data.Entity;
            this.type = data.Type;
            this.form = new Form(data.Form);
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
            Form: this.form.getJSON()
        };
    }
}