import { ColumnEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";
import Control from "./Control";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class Column extends BaseObject<ColumnEntity> {
    private id: string;
    private title: string;
    private control: Control;

    constructor(data?: ColumnEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.title = data.Title;
            this.control = new Control(data.Control);   
        }
    }
    /**
     * getControl
     */
    public getControl() {
        return this.control;
    }
    /**
     * getTitle
     */
    public getTitle() {
        return this.title;
    }
    public getJSON(): ColumnEntity {
        return {
            ID: this.id,
            Title: this.title,
            Control:this.control.getJSON()
        };
    }
}