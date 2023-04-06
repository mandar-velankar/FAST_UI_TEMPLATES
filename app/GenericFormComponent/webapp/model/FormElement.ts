import { FormElementEntity, FormEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Control from "./Control";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.models
 */
export default class FormElement extends BaseObject<FormElementEntity> {
    private id: string;
    private label: string;
    private control: Control;

    constructor(data?: FormElementEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.label = data.Label;
            this.control = new Control(data.Control)
            // for(const control of data.Controls){
            //     this.controls.push(new Control(control));
            // }
        }
    }
    /**
     * getColumns
     */
    public getControl() {
        return this.control;
    }
    public getJSON(): FormElementEntity {
        return {
            ID: this.id,
            Label: this.label,
            Control:this.control.getJSON()
        };
    }
}