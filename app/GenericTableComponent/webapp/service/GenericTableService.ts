import Filter from "sap/ui/model/Filter";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import Sorter from "sap/ui/model/Sorter";

export interface CountryTemplateEntity {
    CountryCode: string;
    Application: string;
    Template: TemplateEntity;
}

export interface TemplateEntity {
    ID: string;
    Title: string;
    Description?: string;
    Service: string;
    SaveEntity: string;
    ReadEntity: string;
    Type: string;
    CountryTemplate_CountryCode?: string;
    CountryTemplate_Application?: string;
    Table_ID?: string;
    Table: TableEntity;
}

export interface TableEntity {
    ID: string;
    Title: string;
    Description?: string;
    Tab_ID?: null;
    Columns: ColumnEntity[];
}

export interface ColumnEntity {
    ID: string;
    Title: string;
    Description?: string;
    Table_ID?: string;
    Control: ControlEntity;
}

export interface ControlEntity {
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
 * @namespace com.bayer.SXTENDER.templates.GenericTableComponent.service
 */
export default class GenericTableService {
    private model: ODataModel;
    private bookBinding: ODataListBinding;
    constructor(model: ODataModel) {
        this.model = model;
    }
    public async getTemplate(countryCode: string, appid: string): Promise<CountryTemplateEntity> {
        const keys = await this.model.requestKeyPredicate('/CountryTemplate', { CountryCode: countryCode, Application: appid });
        const templateBinding = this.model.bindContext(`/CountryTemplate${keys}`, null, {
            $expand: {
                "Template": {
                    $expand: {
                        "Table": {
                            $expand: {
                                "Columns": {
                                    $expand: {
                                        "Control": {
                                            $expand: "Properties"
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