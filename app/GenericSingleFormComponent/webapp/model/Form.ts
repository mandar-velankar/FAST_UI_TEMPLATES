import { FormEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Control from "./Control";
import FormContainer from "./FormContainer";
import FormElement from "./FormElement";
import Layout from "./Layout";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericSingleFormComponent.models
 */
export default class Form extends BaseObject<FormEntity> {
    private id: string;
    private title: string;
    private description: string;
    private formContainers: FormContainer[] = [];
    private layout: Layout;

    constructor(data?: FormEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.description = data.Description;
            this.layout = new Layout(data.Layout);
            for(const formContainer of data.FormContainers){
                this.formContainers.push(new FormContainer(formContainer));
            }
        }
    }
    public getJSON(): FormEntity {
        return {
            ID: this.id,
            Title: this.title,
            Description: this.description,
            FormContainers:this.formContainers.map(formContainer => formContainer.getJSON()),
            Layout:this.layout.getJSON()
        };
    }
}