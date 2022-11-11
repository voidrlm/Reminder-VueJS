const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard.vue"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/calendar.vue"),
  },
];
export default routes;
