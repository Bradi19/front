import imagess from '../Content/images'
let today = new Date().getDay(),
  dateToDay = new Date().getDate(),
  td;
switch (today) {
  case 0:
    td = dateToDay + 1;
    break;
  case 1:
    td = dateToDay;
    break;
  case 2:
    td = dateToDay - 1;
    break;
  case 3:
    td = dateToDay - 2;
    break;
  case 4:
    td = dateToDay - 3;
    break;
  case 5:
    td = dateToDay - 4;
    break;
  case 6:
    td = dateToDay + 2;
    break;
  default:
    break;
}
export const dayData = [
  {
    day: "worksheet.day.d1",
    time: {
      a1: "worksheet.month.a" + new Date().getMonth(),
      a2: td + ", " + new Date().getFullYear(),
    },
    active: dateToDay === td ? true : false,
  },
  {
    day: "worksheet.day.d2",
    time: {
      a1: "worksheet.month.a" + new Date().getMonth(),
      a2: td + 1 + ", " + new Date().getFullYear(),
    },
    active: dateToDay === td + 1 ? true : false,
  },
  {
    day: "worksheet.day.d3",
    time: {
      a1: "worksheet.month.a" + new Date().getMonth(),
      a2: td + 2 + ", " + new Date().getFullYear(),
    },
    active: dateToDay === td + 2 ? true : false,
  },
  {
    day: "worksheet.day.d4",
    time: {
      a1: "worksheet.month.a" + new Date().getMonth(),
      a2: td + 3 + ", " + new Date().getFullYear(),
    },
    active: dateToDay === td + 3 ? true : false,
  },
  {
    day: "worksheet.day.d5",
    time: {
      a1: "worksheet.month.a" + new Date().getMonth(),
      a2: td + 4 + ", " + new Date().getFullYear(),
    },
    active: dateToDay === td + 4 ? true : false,
  },
];
export const worksheet = [
  {
    active: dateToDay === td ? true : false,
    tab: [
      {
        photo: imagess.react,

        titleL: {
          t1: "worksheet.tabs.tab1.name",
          t2: "worksheet.tabs.tab1.stuck",
        },
        titleR: {
          t1: "worksheet.tabs.tab1.timework",
          t2: "worksheet.tabs.tab1.about",
        },
      },
    ],
  },
  {
    active: dateToDay === td + 1 ? true : false,
    tab: [
      {
        photo: imagess.react,
        titleL: {
          t1: "worksheet.tabs.tab2.name",
          t2: "worksheet.tabs.tab2.stuck",
        },
        titleR: {
          t1: "worksheet.tabs.tab2.timework",
          t2: "worksheet.tabs.tab2.about",
        },
      },
    ],
  },
  {
    active: dateToDay === td + 2 ? true : false,
    tab: [
      {        
        photo: imagess.react,
        titleL: {
          t1: "worksheet.tabs.tab3.name",
          t2: "worksheet.tabs.tab3.stuck",
        },
        titleR: {
          t1: "worksheet.tabs.tab3.timework",
          t2: "worksheet.tabs.tab3.about",
        },
      },
    ],
  },
  {
    active: dateToDay === td + 3 ? true : false,
    tab: [
      {
        photo: imagess.react,

        titleL: {
          t1: "worksheet.tabs.tab4.name",
          t2: "worksheet.tabs.tab4.stuck",
        },
        titleR: {
          t1: "worksheet.tabs.tab4.timework",
          t2: "worksheet.tabs.tab4.about",
        },
      },
    ],
  },
  {
    active: dateToDay === td + 4 ? true : false,
    tab: [
      {
        photo: imagess.react,

        titleL: {
          t1: "worksheet.tabs.tab5.name",
          t2: "worksheet.tabs.tab5.stuck",
        },
        titleR: {
          t1: "worksheet.tabs.tab5.timework",
          t2: "worksheet.tabs.tab5.about",
        },
      },
    ],
  },
];
