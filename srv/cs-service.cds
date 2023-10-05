using com.bayer.SXTENDER.templates as templates from '../db/data-model';

service CountrySetupService @(path: 'cs') @(requires:['f_tndr_cag_admin','f_tndr_cag_technical_user','authenticated-user']) {
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
    entity DistinctSetupCountries as select from CountryTemplate{
        key CountryCode
    }group by CountryCode;

    entity CountryPages as select from CountryTemplate;

    entity CountryPageSections as select from CountryTemplate {
        Template.Table.Title as SectionName
    };

    entity PropertiesView as select from Control as control
    left outer join Properties as prop on prop.ParentID = control.ID{
        control.ID AS ControlID,
        prop.Name AS PropertyName,
        prop.Value AS PropertyValue
    } where prop.Name = 'required';

    entity MasterScreenView as select from Template as temp
    inner join Form as form on form.ID = temp.Form.ID
    inner join FormContainer as formcnt on form.ID = formcnt.Form.ID
    inner join FormElement as formelem on formcnt.ID = formelem.FormContainer.ID
    inner join Control as control on control.ParentID = formelem.ID
    left outer join PropertiesView as propview on propview.ControlID = control.ID
    {
        key temp.CountryTemplate.CountryCode,
        formelem.Label as Field,
        control.Type as Type,
        CASE
            when propview.PropertyName = 'required' and propview.PropertyValue = true
                then true
                else false
        END AS Mandatory:Boolean
    }
    group by 
    temp.CountryTemplate.CountryCode,
    formelem.Label,
    control.Type,
    propview.PropertyName,
    propview.PropertyValue

}