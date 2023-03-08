import Text from "sap/m/Text";
import ManagedObject from "sap/ui/base/ManagedObject";
import UI5Control, { $ControlSettings } from "sap/ui/core/Control";
import { ControlEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";
import ControlProperty from "./ControlPoperty";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class Control extends BaseObject<ControlEntity> {
    private id: string;
    private type: string;
    private properties: ControlProperty[]=[];

    constructor(data?: ControlEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.type = data.Type;  
            this.properties = data.Properties.map(property => new ControlProperty(property));
        }
    }
    public getPropertiesAsObject(){
        const props:Record<string,string> = {};
        for(const prop of this.properties){
            props[prop.getName()] = prop.getIsBinding()?`{data>${prop.getValue()}}`:prop.getValue()
        }
        return props;
    }
    public getControlPath() {
        return `sap.m.${this.type}`;
    }
    public generateControl():any{
        
        // const p = this.getControlPath();
        // const c = sap.ui.require(p) as Text;
        // const props = this.getPropertiesAsObject() as $ControlSettings;
        // new Text();
        // const r = new c();
        // const r2 = new (<any>window)["TestClass"]()
        //@ts-ignore
        const control = new (sap.ui.require(this.getControlPath()))(this.getPropertiesAsObject());
        
        return control;
    }
    public getJSON(): ControlEntity {
        return {
            ID: this.id,
            Type: this.type,
            Properties: this.properties.map(property => property.getJSON())
        };
    }
}