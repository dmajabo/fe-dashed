export const general_breadcrumb = [
  {
    title: "Dashboards",
    to: "/",
  },
  {
    title: "My Dashboards",
    to: "/general-dashboard",
  },
];

export const polygon_breadcrumb = [...general_breadcrumb, {
    title: "Polygon Ecosystem",
    to: "/polygon-dashboard"
}];

export const gaming_breadcrumb = [...general_breadcrumb, {
    title: "Gaming",
    to: "/gaming-dashboard/overview"
}];

