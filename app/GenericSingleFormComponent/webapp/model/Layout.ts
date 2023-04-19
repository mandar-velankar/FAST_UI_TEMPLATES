import Text from "sap/m/Text";
import ManagedObject from "sap/ui/base/ManagedObject";
import UI5Control, { $ControlSettings } from "sap/ui/core/Control";
import { ControlEntity, LayoutEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import ControlProperty from "./ControlPoperty";
import Input from "sap/m/Input";
import ResponsiveGridLayout from "sap/ui/layout/form/ResponsiveGridLayout";
/**
 * @namespace com.bayer.SXTENDER.templates.GenericSingleFormComponent.models
 */
export default class Layout extends BaseObject<LayoutEntity> {
    private id: string;
    private type: string;
    private properties: ControlProperty[]=[];

    constructor(data?: LayoutEntity) {
        super();

        if (data) {
            this.id = data.ID;
            this.type = data.Type;  
            this.properties = data.Properties.map(property => new ControlProperty(property));
            this.getPropertiesAsObject();
        }
    }
    public getPropertiesAsObject(){
        const props:Record<string,string> = {};
        for(const prop of this.properties){
            props[prop.getName()] = prop.getIsBinding()?`{data>${prop.getValue()}}`:prop.getValue()
            if(prop.getIsBinding()){
                this[prop.getName()] = `{data>${prop.getValue()}}`;
            }else{
                try {
                    this[prop.getName()] = parseInt(prop.getValue());
                    if (isNaN(this[prop.getName()] )){
                        this[prop.getName()] = (prop.getValue() === 'true');
                    }
                } catch (error) {
                    this[prop.getName()] = prop.getValue();
                }
            }
            
        }
        return props;
    }
    public getControlPath() {
        return `sap/m/${this.type}`;
    }
    public generateControl():UI5Control{
        const m = new ResponsiveGridLayout();
        // const t = new Text();
        const p = this.getControlPath();
        const c = sap.ui.require(p) as UI5Control;
        const props = this.getPropertiesAsObject() as $ControlSettings;
        // new Text();
        const control = new c(props);
        // const r2 = new (<any>window)["TestClass"]()
        // const control = new (sap.ui.require(this.getControlPath()))(this.getPropertiesAsObject());
        
        return control;
    }
    public getJSON(): LayoutEntity {
        return {
            ID: this.id,
            Type: this.type,
            Properties: this.properties.map(property => property.getJSON())
        };
    }
}