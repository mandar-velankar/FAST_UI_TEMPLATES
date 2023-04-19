import { FormContainerEntity, FormElementEntity, FormEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Control from "./Control";
import FormElement from "./FormElement";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericSingleFormComponent.models
 */
export default class FormContainer extends BaseObject<FormContainerEntity> {
    private id: string;
    private title: string;
    private formElements: FormElement[] = [];

    constructor(data?: FormContainerEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            for(const formElement of data.FormElements){
                this.formElements.push(new FormElement(formElement));
            }
            // for(const control of data.Controls){
            //     this.controls.push(new Control(control));
            // }
        }
    }
    public getJSON(): FormContainerEntity {
        return {
            ID: this.id,
            Title: this.title,
            FormElements:this.formElements.map(formElement => formElement.getJSON())
        };
    }
}