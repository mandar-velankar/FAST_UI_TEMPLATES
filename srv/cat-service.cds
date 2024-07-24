using com.bayer.SXTENDER.templates as templates from '../db/data-model';

service CatalogService @(path: 'UITemplates') @(requires:['f_tndr_cag_admin','f_tndr_cag_brcontracting_user','f_tndr_cag_technical_user','authenticated-user']) {
    entity CountryTemplate as projection on templates.CountryTemplate;
    @readonly entity Template as projection on templates.Template;
    entity Tab as projection on templates.Tab;
    entity XMLView as projection on templates.XMLView;
    entity Table as projection on templates.Table;
    entity Form as projection on templates.Form;
    entity FormContainer as projection on templates.FormContainer;
    entity FormElement as projection on templates.FormElement;
    entity Column as projection on templates.Column;
    entity Layout as projection on templates.Layout;
    entity Control as projection on templates.Control;
    entity Properties as projection on templates.Properties;
    entity ValueHelp as projection on templates.ValueHelp;
    entity Filter as projection on templates.Filter;
    entity StaticValue as projection on templates.StaticValue;

    entity ProductScopeView @(cds.redirection.target:false) as select from templates.Template 
    {
        key Form.ID as FormID,
        CountryTemplate.CountryCode,
        CountryTemplate.ProductScope
    };

    entity PropertiesView as select from templates.Control as control
    inner join templates.Properties as prop1 on prop1.ParentID = control.ID
    inner join templates.Properties as prop2 on prop1.ParentID = prop2.ParentID
    {
        key control.ID as ControlID,
        control.Type as Type,
        prop1.Value as FieldName
    } where (prop1.Name = 'value' or prop1.Name = 'selectedKey') and prop2.Name = 'required' and prop2.Value = true
    group by 
    control.ID, 
    control.Type, 
    prop1.Value, 
    prop1.Name, 
    prop2.Name, 
    prop2.Value;

    entity MandatoryFieldsView as select from templates.Form as form
        left join ProductScopeView as productscope on productscope.FormID = form.ID
        inner join templates.FormContainer as formcontainer on form.ID = formcontainer.Form.ID
        inner join templates.FormElement as formelem on formcontainer.ID = formelem.FormContainer.ID
        inner join templates.Control as control on control.ParentID = formelem.ID
        inner join PropertiesView as propview on propview.ControlID = control.ID
        left join templates.Tab as tab on tab.XMLView.ID = form.XMLView.ID
    {
        key 
            Case 
                when formcontainer.Title IN ('Institute & Type', 'Timeline') then 'Tender'
                when formcontainer.Title = 'Awarded Products' then 'Award' 
                when formcontainer.Title LIKE 'Offer%' then 'Offer'
                when formcontainer.Title LIKE 'Product Info%' then 'OfferProduct'
                when formcontainer.Title LIKE 'Delivery Tracking%' then 'DeliveryDetails'
                when formcontainer.Title LIKE 'Tender Offer%' then 'Overview' 
                when formcontainer.Title LIKE 'Competitor Results%' then 'CompetitorResults'
                when formcontainer.Title LIKE 'Compliance Officer%' then 'ComplianceOfficer'
                when formcontainer.Title LIKE 'Supply Management%' then 'SupplyManagement'
                when formcontainer.Title LIKE 'Global Strategic Marketing%' then 'GlobalStrategicMarketing' 
            end as Section:String,
        key case 
                when productscope.CountryCode is not null 
                    then productscope.CountryCode
                else tab.Template.CountryTemplate.CountryCode
            end as CountryCode:String,
        key ifnull(productscope.ProductScope, 'All') as ProductScope:String,
        formelem.Label as Label:String,
        propview.FieldName as Field:String
    }
    group by
    control.ValueHelp.ID,
    control.ValueHelp.Table.Entity,
    formcontainer.Title,
    formelem.Label,
    propview.FieldName,
    productscope.CountryCode,
    productscope.ProductScope,
    tab.Template.CountryTemplate.CountryCode
}