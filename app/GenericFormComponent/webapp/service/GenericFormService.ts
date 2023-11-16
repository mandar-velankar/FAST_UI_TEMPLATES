import Filter from "sap/ui/model/Filter";
import Object from "sap/ui/base/Object";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Sorter from "sap/ui/model/Sorter";
import { templateKeys } from "../state/GenericFormState";

export interface CountryTemplateEntity {
    CountryCode: string;
    ProductScope: string;
    Application: string;
    Page:string;
    Template: TemplateEntity;
}

export interface TemplateEntity {
    ID: string;
    Title: string;
    Description?: string;
    Service: string;
    Entity: string;
    Type: string;
    CountryTemplate_CountryCode?: string;
    CountryTemplate_Application?: string;
    Tabs: TabEntity[];
}
export interface TabEntity {
    ID:          string;
    Title:       string;
    Description: string;
    Icon:        string;
    Template_ID?: string;
    Forms:       FormEntity[];
}

export interface FormEntity {
    ID:          string;
    Title:       string;
    Description: string;
    Tab_ID?:      string;
    FormContainers:    FormContainerEntity[];
    Layout:    LayoutEntity;
}
export interface FormContainerEntity {
    ID:          string;
    Title:       string;
    FormElements:    FormElementEntity[];
}
export interface FormElementEntity {
    ID:          string;
    Label:       string;
    Controls:    ControlEntity[];
}

export interface ControlEntity {
    ID: string;
    Type: string;
    ParentID?: string;
    Properties?: PropertyEntity[];
}
export interface LayoutEntity {
    ID: string;
    Type: string;
    ParentID?: string;
    Properties?: PropertyEntity[];
}

export interface PropertyEntity {
    ID: string;
    Name: string;
    Value: string;
    IsBinding: boolean;
    Control_ID?: string;
}
/**
 * @namespace com.bayer.SXTENDER.templates.GenericFormComponent.service
 */
export default class GenericFormService extends Object{
    private model: ODataModel;
    private bookBinding: ODataListBinding;
    constructor(model: ODataModel) {
        this.model = model;
    }
    public async getTemplate({countryCode, appID,page,productScope}:templateKeys): Promise<CountryTemplateEntity> {
        const keys = await this.model.requestKeyPredicate('/CountryTemplate', { 
            CountryCode: countryCode || 'BR', 
            Application: appID || 'StandardTenders', 
            Page: page || 'DETAIL',
            ProductScope: productScope
        });
        const templateBinding = this.model.bindContext(`/CountryTemplate${keys}`, null, {
            $expand: {
                "Template": {
                    $expand: {
                        "Tabs": {
                            $expand: {
                                "Forms": {
                                    $expand: {
                                        "Layout":{
                                            $expand:"Properties"
                                        },
                                        "FormContainers": {
                                            $expand: {
                                                "FormElements": {
                                                    $expand: {
                                                        "Controls": {
                                                            $expand: "Properties"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return await templateBinding.requestObject() as CountryTemplateEntity;
    }
}