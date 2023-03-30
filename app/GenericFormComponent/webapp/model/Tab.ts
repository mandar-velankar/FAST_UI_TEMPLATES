import { TabEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Form from "./Form";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.models
 */
export default class Tab extends BaseObject<TabEntity> {
    private id: string;
    private title: string;
    private description: string;
    private icon: string;
    private forms: Form[] = [];

    constructor(data?: TabEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.description = data.Description;
            this.icon = data.Icon;
            for(const form of data.Forms){
                this.forms.push(new Form(form));
            }
        }
    }
    public getJSON(): TabEntity {
        return {
            ID: this.id,
            Title: this.title,
            Description: this.description,
            Icon: this.icon,
            Forms:this.forms.map(form => form.getJSON())
        };
    }
}