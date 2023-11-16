import { ControlEntity, PropertyEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class ControlProperty extends BaseObject<PropertyEntity> {
    private id: string;
    private name: string;
    private value: string;
    private isBinding: boolean;

    constructor(data?: PropertyEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.name = data.Name;  
            this.value = data.Value;  
            this.isBinding = data.IsBinding;  
        }
    }
    /**
     * getName
     */
    public getName() {
        return this.name;
    }
    /**
     * getValue
     */
    public getValue() {
        return this.value;
    }
    /**
     * isBinding
     */
    public getIsBinding() {
        return this.isBinding;
    }
    public getJSON(): PropertyEntity {
        return {
            ID: this.id,
            Name: this.name,
            Value: this.value,
            IsBinding: this.isBinding
        };
    }
}