import { Navigation } from "../_models/index";

export const navigation: Navigation[] = [
  {
    id: "cms_dashboards",
    title: "Tổng quan",
    translate: "NAV.DASHBOARDS",
    type: "item",
    icon: "home",
    url: "/cms/dashboard",
    exactMatch: true,
  },
  // Quản lý tin tức
  {
    id: "cms_blog",
    title: "Quản lý tin tức",
    translate: "NAV.BLOG_LIST.BLOG",
    type: "group",
    icon: "newspaper-o",
    url: "/cms/blog",
    children: [
      {
        id: "cms_blog_blogcategory",
        title: "Quản lý nhóm tin tức",
        translate: "NAV.BLOG_LIST.BLOGCATEGORY",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/blog/blogcategory",
        exactMatch: true,
      },
      {
        id: "cms_blog_bloglist",
        title: "Quản lý tin tức",
        translate: "NAV.BLOG_LIST.BLOGLIST",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/blog/bloglist",
        exactMatch: true,
      },
    ],
  },
  // Quản lý sản phẩm, dịch vụ
  {
    id: "cms_productservice",
    title: "Quản lý sản phẩm, dịch vụ",
    translate: "NAV.PRODUCT_LIST.PRODUCT_SERVICE",
    type: "group",
    icon: "product-hunt",
    url: "/cms/productservice",
    children: [
      {
        id: "cms_productservice_productcategory",
        title: "Quản lý nhóm sản phẩm",
        translate: "NAV.PRODUCT_LIST.PRODUCT_CATEGORY",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/productservice/productcategory",
        exactMatch: true,
      },
      {
        id: "cms_productservice_productlist",
        title: "Quản lý sản phẩm",
        translate: "NAV.PRODUCT_LIST.PRODUCT_LIST",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/productservice/productlist",
        exactMatch: true,
      },
      {
        id: "cms_productservice_servicecategory",
        title: "Quản lý nhóm dịch vụ",
        translate: "NAV.PRODUCT_LIST.SERVICE_CATEGORY",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/productservice/servicecategory",
        exactMatch: true,
      },
      {
        id: "cms_productservice_servicelist",
        title: "Quản lý dịch vụ",
        translate: "NAV.PRODUCT_LIST.SERVICE_LIST",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/productservice/servicelist",
        exactMatch: true,
      },
      {
        id: "cms_productservice_promotion",
        title: "Quản lý khuyến mại",
        translate: "NAV.PRODUCT_LIST.PROMOTION",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/productservice/promotion",
        exactMatch: true,
      },
    ],
  },
  // Quản lý danh bạ, đối tác
  {
    id: "cms_partner_contact",
    title: "Quản lý khách hàng, đối tác",
    translate: "NAV.CONTACT_SETTING.PARTNERCONTACT",
    type: "group",
    icon: "address-card",
    url: "/cms/partner",
    children: [
      {
        id: "cms_partner_contact_customer",
        title: "Quản lý đối tác",
        translate: "NAV.CONTACT_SETTING.CUSTOMER",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/partner/customer",
        exactMatch: true,
      },
      {
        id: "cms_partner_contact_partnerlist",
        title: "Quản lý đối tác",
        translate: "NAV.CONTACT_SETTING.PARTNERLIST",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/partner/partnerlist",
        exactMatch: true,
      },
    ],
  },
  // quản lý booking
  {
    id: "cms_booking",
    title: "Quản lý Đặt lịch",
    translate: "NAV.BOOKING",
    type: "item",
    icon: "calendar-check-o",
    url: "/cms/booking",
  },
  // quản lý liên hệ
  {
    id: "cms_customer",
    title: "Quản lý liên hệ",
    translate: "NAV.CUSTOMER.CUSTOMER",
    type: "group",
    icon: "address-book-o",
    url: "/cms/cont",
    exactMatch: true,
    children: [
      {
        id: "cms_customer_garange",
        title: "Khách hàng gara",
        translate: "NAV.CUSTOMER.GARANGE",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/cont/garange",
        exactMatch: true,
      },
      {
        id: "cms_customer_insurrance",
        title: "Khách hàng bảo hiểm",
        translate: "NAV.CUSTOMER.INSURRANCE",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/cont/insurrance",
        exactMatch: true,
      }
    ],
  },
  // QUẢN TRỊ HỆ THỐNG
  {
    id: "cms_system",
    title: "Quản trị hệ thống",
    translate: "NAV.SYSTEM_LIST.SYSTEM",
    type: "group",
    icon: "wrench",
    url: "/cms/system",
    exactMatch: true,
    children: [
      {
        id: "cms_usergroup",
        title: "Quản lý nhóm tài khoản",
        translate: "NAV.SYSTEM_LIST.USER_GROUP",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/sysusergroup",
        exactMatch: true,
      },
      {
        id: "cms_user",
        title: "Quản lý tài khoản",
        translate: "NAV.SYSTEM_LIST.ACCOUNT",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/sysuser",
        exactMatch: true,
      },
      {
        id: "cms_garage",
        title: "Quản lý danh sách Garage",
        translate: "NAV.SYSTEM_LIST.GARAGE",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/garage",
        exactMatch: true,
      },
      {
        id: "cms_servicegarage",
        title: "Quản lý dịch vụ Garage",
        translate: "NAV.SYSTEM_LIST.SERVICEGARAGE",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/servicegarage",
        exactMatch: true,
      },
      {
        id: "cms_menu",
        title: "Cấu hình chung",
        translate: "NAV.SYSTEM_LIST.MENU",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/menu",
        exactMatch: true,
      },
      {
        id: "cms_ads",
        title: "Quản lý quảng cáo",
        translate: "NAV.SYSTEM_LIST.ADS",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/ads",
        exactMatch: true,
      },
      {
        id: "cms_links",
        title: "Quản lý đường dẫn(Links)",
        translate: "NAV.SYSTEM_LIST.LINKS",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/links",
        exactMatch: true,
      },
      {
        id: "cms_setting",
        title: "Cấu hình chung",
        translate: "NAV.SYSTEM_LIST.SETTING",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/system/settings",
        exactMatch: true,
      },
    ],
  },
  // BÁO CÁO HỆ THỐNG
  {
    id: "cms_system_report",
    title: "Báo cáo hệ thống",
    translate: "NAV.REPORT.REPORT",
    type: "group",
    icon: "pie-chart",
    url: "/cms/report",
    exactMatch: true,
    children: [
      {
        id: "cms_system_amount",
        title: "Báo cáo SL khách đặt lịch",
        translate: "NAV.REPORT.AMOUNT",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/report/amount",
        exactMatch: true,
      },
      {
        id: "cms_system_cancel",
        title: "Báo cáo KH hủy đặt lịch",
        translate: "NAV.REPORT.CANCEL",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/report/cancel",
        exactMatch: true,
      },
      {
        id: "cms_system_cancel",
        title: "Top Dịch vụ đặt lịch",
        translate: "NAV.REPORT.SERVICES",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/report/services",
        exactMatch: true,
      },
      {
        id: "cms_system_combo",
        title: "Top Nội dung",
        translate: "NAV.REPORT.CONTENT",
        type: "item",
        icon: "fa fa-id-card-o",
        url: "/cms/report/content",
        exactMatch: true,
      },
    ],
  },
];
