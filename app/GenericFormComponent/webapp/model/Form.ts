import { FormEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Control from "./Control";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.models
 */
export default class Form extends BaseObject<FormEntity> {
    private id: string;
    private title: string;
    private description: string;
    private controls: Control[] = [];

    constructor(data?: FormEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.description = data.Description;
            for(const control of data.Controls){
                this.controls.push(new Control(control));
            }
        }
    }
    /**
     * getColumns
     */
    public getControls() {
        return this.controls;
    }
    public getJSON(): FormEntity {
        return {
            ID: this.id,
            Title: this.title,
            Description: this.description,
            Controls:this.controls.map(control => control.getJSON())
        };
    }
}