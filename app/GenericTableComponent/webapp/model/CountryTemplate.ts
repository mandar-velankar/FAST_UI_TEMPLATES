import { CountryTemplateEntity } from "../service/GenericTableService";
import BaseObject from "./BaseObject";
import Template from "./Template";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.models
 */
export default class CountryTemplate extends BaseObject<CountryTemplateEntity> {
    private countryCode: string;
    private application: string;
    private template: Template;

    constructor(data?: CountryTemplateEntity) {
        super();

        if (data) {
            this.countryCode = data.CountryCode;
            this.application = data.Application;
            this.template = new Template(data.Template);
        }
    }
    public getJSON(): CountryTemplateEntity {
        return {
            CountryCode: this.countryCode,
            Application: this.application,
            Template: this.template.getJSON()
        };
    }
}