import { CountryTemplateEntity } from "../service/GenericFormService";
import BaseObject from "./BaseObject";
import Template from "./Template";

/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.models
 */
export default class CountryTemplate extends BaseObject<CountryTemplateEntity> {
    private countryCode: string;
    private productScope: string;
    private application: string;
    private page: string;
    private template: Template;

    constructor(data?: CountryTemplateEntity) {
        super();

        if (data) {
            this.countryCode = data.CountryCode;
            this.productScope = data.ProductScope;
            this.application = data.Application;
            this.page = data.Page;
            this.template = new Template(data.Template);
        }
    }
    /**
     * getTemplate
     */
    public getTemplate() {
        return this.template;
    }
    public getJSON(): CountryTemplateEntity {
        return {
            CountryCode: this.countryCode,
            ProductScope: this.productScope,
            Application: this.application,
            Page: this.page,
            Template: this.template.getJSON()
        };
    }
}