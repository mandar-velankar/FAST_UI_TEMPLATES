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
    left outer join templates.Properties as prop on prop.ParentID = control.ID{
        key control.ID AS ControlID,
        prop.Name AS PropertyName,
        prop.Value AS PropertyValue
    } where prop.Name = 'required';

    entity MandatoryFieldsView as select from templates.Form as form
        left join ProductScopeView as productscope on productscope.FormID = form.ID
        inner join templates.FormContainer as formcontainer on form.ID = formcontainer.Form.ID
        inner join templates.FormElement as formelem on formcontainer.ID = formelem.FormContainer.ID
        inner join templates.Control as control on control.ParentID = formelem.ID
        left outer join PropertiesView as propview on propview.ControlID = control.ID
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
            end as Section:String,
        key productscope.CountryCode as CountryCode:String,
        key ifnull(productscope.ProductScope, 'All') as ProductScope:String,
        formelem.Label as Field:String,
    } where propview.PropertyName = 'required' and propview.PropertyValue = true
    group by
    control.ValueHelp.ID,
    control.ValueHelp.Table.Entity,
    formcontainer.Title,
    formelem.Label,
    propview.PropertyName,
    propview.PropertyValue,
    productscope.CountryCode,
    productscope.ProductScope
}