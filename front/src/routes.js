/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import menucard from "views/menucard.jsx";
import TableList from "views/Tables.jsx";
import UserPage from "views/User.jsx";
import Support from "views/Support.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Guest/Room Details",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/menucard",
    name: "Menu Card",
    icon: "nc-icon nc-caps-small",
    component: menucard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  /*
  {
    path: "/guest-page",
    name: "Guest Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },*/
  {
    path: "/support",
    name : "Guest Support",
    icon: "nc-icon nc-satisfied",
    component : Support,
    layout : "/admin"
  }
  
  
];
export default routes;
