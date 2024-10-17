namespace com.bayer.SXTENDER.templates;

using {cuid} from '@sap/cds/common';

//todo: VIEW CountryTemplate + Template + Table
entity CountryTemplate {
      key CountryCode : String;
      key Application : String;
      key Page : String; //todo: change to Section
      key ProductScope : String;
      // key Section: String;
          //Associations
          Template    : Association to Template
                              on Template.CountryTemplate = $self;
}

entity Template : cuid {
      Title           : String;
      Description     : String;
      Service         : String;
      // ReadEntity      : String;
      Type            : String;
      //Associations
      CountryTemplate : Association to CountryTemplate;
      Tabs            : Association to many Tab
                              on Tabs.Template = $self;
      Table           : Association to Table;
      Form           : Association to Form;
}

entity Tab : cuid {
      Title       : String;
      TitleLocale  : String;
      Description : String;
      Icon        : String;
      //Associations
      Template    : Association to Template;
      XMLView     : Association to XMLView;
      // Tables      : Association to many Table
      //                     on Tables.Tab = $self;
      // Forms       : Association to many Form
      //                     on Forms.Tab = $self;
}

entity XMLView: cuid {
      ViewName    : String;
      Description : String;
      //Associations
      Tables      : Association to many Table
                          on Tables.XMLView = $self;
      Forms       : Association to many Form
                          on Forms.XMLView = $self;
}

entity Table : cuid {
      Title       : String;
      Description : String;
      TableID     : String; // this ID will be used in the UI to do the binding
      Entity      : String;
      // TabID: String;
      //Associations
      XMLView     : Association to XMLView;
      Columns     : Composition of many Column
                          on Columns.Table = $self;
}

entity Form : cuid {
      Title       : String;
      TitleLocale  : String;
      Description : String;
      FormID      : String; // this ID will be used in the UI to do the binding
      Entity      : String;
      //Associations
      XMLView           : Association to XMLView;
      FormContainers    : Association to many FormContainer
                          on FormContainers.Form = $self;
      Layout    : Association to Layout
                        on Layout.Form = $self;
}

entity Column : cuid {
      Title       : String; //todo: rename to label or header?
      TitleLocale  : String;
      Description : String; //tocheck: not needed?
      Importance  : String;
      Rank: Integer;
      IsValueHelpKey: Boolean default false; //if dropdown, specify this field is key -- if using a db entity
      IsValueHelpText: Boolean default false; //if dropdown, specify the text here -- if using a db entity
      //Associations
      Table       : Association to Table;
      Control    : Association to Control
                          on Control.ParentID = ID;
}
entity FormContainer : cuid {
      Title:String;
      TitleLocale  : String;
      //Associations
      Form         : Association to Form;
      FormElements    : Association to many FormElement
                          on FormElements.FormContainer = $self;
}
entity FormElement : cuid {
      Label       : String;
      LabelLocale : String;
      Visible     : Boolean;
      //Associations
      FormContainer         : Association to FormContainer;
      Controls    : Association to many Control
                          on Controls.ParentID = ID;
}
entity Control : cuid {
      Type        : String;
      ParentID    : UUID;
      //Associations
      Properties  : Association to many Properties
                          on Properties.ParentID = ID;
      ValueHelp   : Association to ValueHelp 
                              on ValueHelp.ParentID = ID;
      // Calculation : Composition of many Calculation
      //                     on Calculation.Control = $self;
}

entity ValueHelp: cuid {
      Title             : String;
      Type              : String; // Suggestions or Simple or Complex
      ParentID          : UUID;
      Searchable        : Boolean;
      SelectedField     : Array of SelectedField;
      Table             : Association to Table;
      Filters           : Association to many Filter on Filters.ValueHelp = $self;
      StaticValues : Association to many StaticValue on StaticValues.ValueHelp = $self;
}
type SelectedField {
      ID          : String;  
      Name        : String;
}
entity Filter: cuid {
      Path        : String;
      Operator    : String; 
      Value1      : String;
      Value2      : String;
      ValueHelp   : Association to ValueHelp;
}

entity StaticValue: cuid {
      CountryCode : String;
      KeyID       : String(40);
      ValueText   : String(40);
      ValueHelp   : Association to ValueHelp;
}
entity Layout : cuid {
      Type:String;
      Form         : Association to Form;
      Properties  : Association to many Properties
                          on Properties.ParentID = ID;
}
entity Properties : cuid {
      Name      : String;
      Value     : String;//{}
      IsBinding : Boolean;//could be moved to UI, if binding syntax is found in value ==> binding otherwise static value 
      ParentID    : UUID;
      //Associations
      // Control   : Association to Control;
      // Layout   : Association to Layout;
}
//not needed when we bring binding completely to property value
// entity Calculation : cuid {
//       Name                   : String;
//       Formula                : String;
//       ResultCalculationField : String;
//       //Associations
//       Control                : Association to Control;
// }
