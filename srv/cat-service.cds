using com.bayer.SXTENDER.templates as templates from '../db/data-model';

service CatalogService @(path: 'UITemplates') @(requires:['f_tndr_cag_admin','f_tndr_cag_brcontracting_user','f_tndr_cag_technical_user','authenticated-user']) {
    entity CountryTemplate as projection on templates.CountryTemplate;
    @readonly entity Template as projection on templates.Template;
    entity Tab as projection on templates.Tab;
    entity Table as projection on templates.Table;
    entity Form as projection on templates.Form;
    entity FormContainer as projection on templates.FormContainer;
    entity FormElement as projection on templates.FormElement;
    entity Column as projection on templates.Column;
    entity Layout as projection on templates.Layout;
    entity Control as projection on templates.Control;
    entity Properties as projection on templates.Properties;
}