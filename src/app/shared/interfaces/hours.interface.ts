// Generated by https://quicktype.io

export interface Hours {
  _id:          string;
  date:         string;
  day:          number;
  hour:         Hour;
  weekNumber:   number;
  organization: Organization;
  court:        Court;
  user:         null;
  scheduled:    boolean;
  comments:     string;
  price:        number;
  status:       boolean;
  range:        number;
};

export enum Court {
  The64Ef230108F58D5A9C6F1Cc5 = "64ef230108f58d5a9c6f1cc5",
};

export enum Hour {
  The10001200 = "10:00 - 12:00",
  The12001400 = "12:00 - 14:00",
  The14001600 = "14:00 - 16:00",
  The16001800 = "16:00 - 18:00",
};

export enum Organization {
  The64Ef22C808F58D5A9C6F1Cb0 = "64ef22c808f58d5a9c6f1cb0",
};

export enum HoursColor {
  red   = 'red',
  green = 'green',
  blue  = 'blue',
};