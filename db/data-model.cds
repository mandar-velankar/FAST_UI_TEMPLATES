namespace com.bayer.SXTENDER.templates;

using {cuid} from '@sap/cds/common';

//todo: VIEW CountryTemplate + Template + Table
entity CountryTemplate {
      key CountryCode : String;
      key Application : String;
      key Page : String; //todo: change to Section
          //Associations
          Template    : Association to Template
                              on Template.CountryTemplate = $self;
}

entity Template : cuid {
      Title           : String;
      Description     : String;
      Service         : String;
      Entity      : String;
      // ReadEntity      : String;
      Type            : String;
      //Associations
      CountryTemplate : Association to CountryTemplate;
      Tabs            : Association to many Tab
                              on Tabs.Template = $self;
      Table           : Association to Table;
}

entity Tab : cuid {
      Title       : String;
      Description : String;
      Icon        : String;
      //Associations
      Template    : Association to Template;
      Tables      : Association to many Table
                          on Tables.Tab = $self;
      Forms       : Association to many Form
                          on Forms.Tab = $self;
}

entity Table : cuid {
      Title       : String;
      Description : String;
      // TabID: String;
      //Associations
      Tab         : Association to Tab;
      Columns     : Composition of many Column
                          on Columns.Table = $self;
}

entity Form : cuid {
      Title       : String;
      Description : String;
      //Associations
      Tab         : Association to Tab;
      Controls    : Association to many Control
                          on Controls.ParentID = ID;
}

entity Column : cuid {
      Title       : String; //todo: rename to label or header?
      Description : String; //tocheck: not needed?
      //Associations
      Table       : Association to Table;
      Control    : Association to Control
                          on Control.ParentID = ID;
}

entity Control : cuid {
      Type        : String;
      ParentID    : UUID;
      //Associations
      Properties  : Composition of many Properties
                          on Properties.Control = $self;
      // Calculation : Composition of many Calculation
      //                     on Calculation.Control = $self;
}

entity Properties : cuid {
      Name      : String;
      Value     : String;
      IsBinding : Boolean;//could be moved to UI, if binding syntax is found in value ==> binding otherwise static value 
      //Associations
      Control   : Association to Control;
}
//not needed when we bring binding completely to property value
// entity Calculation : cuid {
//       Name                   : String;
//       Formula                : String;
//       ResultCalculationField : String;
//       //Associations
//       Control                : Association to Control;
// }
