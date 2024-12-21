import { Award, CalendarDays, CircuitBoard, Codesandbox, Factory, FileText, LifeBuoy, LocateFixed, Mail, Map, MessageSquare, MonitorDot, PackagePlus, PictureInPicture2, PieChart, RadioTower, ScrollText, Share2, ShoppingBag, Table, Trophy, UserRound } from "lucide-react";

const menuData: any = [
    {
        label: 'منو',
        isTitle: true,
    },
    {
        id: "کارخانه آرد",
        label: 'کارخانه آرد',
        link: "/FlourFactory",
        icon: <Factory />,
        
    },
    {
        id: "initialData",
        label: 'داده های اولیه',
        link: "/#",
        icon: <MonitorDot />,
        subItems: [
            {
                id: 'ProvincialRegistration',
                label: 'ثبت استان',
                link: '/ProvincialRegistration',
                parentId: "ProvincialRegistrationed"
            },
            {
                id: 'CityRegiste',
                label: 'ثبت شهرستان',
                link: '/CityRegiste',
                parentId: "CityRegisteed"
            },
            {
                id: 'emaildashboard',
                label: 'ثبت کار خانه',
                link: '/dashboards-email',
                parentId: "dashboard"
            },
            {
                id: 'hrdashboard',
                label: 'ثبت پیمانکار',
                link: '/dashboards-hr',
                parentId: "dashboard"
            },
            {
                id: 'socialdashboard',
                label: 'ثبت نانوا',
                link: '/dashboards-social',
                parentId: "dashboard"
            },
        ]
    },
    // {
    //     id: "dashboard",
    //     label: 'Dashboards',
    //     link: "/#",
    //     icon: <MonitorDot />,
    //     subItems: [
    //         {
    //             id: 'analyticsdashboard',
    //             label: 'Analytics',
    //             link: '/dashboards-analytics',
    //             parentId: "dashboard"
    //         },
    //         {
    //             id: 'ecommercedashboard',
    //             label: 'Ecommerce',
    //             link: '/dashboard',
    //             parentId: "dashboard"
    //         },
    //         {
    //             id: 'emaildashboard',
    //             label: 'Email',
    //             link: '/dashboards-email',
    //             parentId: "dashboard"
    //         },
    //         {
    //             id: 'hrdashboard',
    //             label: 'HR',
    //             link: '/dashboards-hr',
    //             parentId: "dashboard"
    //         },
    //         {
    //             id: 'socialdashboard',
    //             label: 'Social',
    //             link: '/dashboards-social',
    //             parentId: "dashboard"
    //         },
    //     ]
    // },
    // {
    //     label: 'Apps',
    //     isTitle: true,
    // },
   
   
    // {
    //     label: 'Pages',
    //     isTitle: true,
    // },
    // {
    //     id: 'authentication',
    //     label: 'Authentication',
    //     icon: <Award />,
    //     parentId: 2,
    //     subItems: [
    //         {
    //             id: 'login',
    //             label: 'Login',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'basic',
    //                     label: 'Basic',
    //                     link: '/auth-login-basic',
    //                     parentId: 'login'
    //                 },
    //                 {
    //                     id: 'cover',
    //                     label: 'Cover',
    //                     link: '/auth-login-cover',
    //                     parentId: 'login'
    //                 },
    //                 {
    //                     id: 'boxed',
    //                     label: 'Boxed',
    //                     link: '/auth-login-boxed',
    //                     parentId: 'login'
    //                 },
    //                 {
    //                     id: 'modern',
    //                     label: 'Modern',
    //                     link: '/auth-login-modern',
    //                     parentId: 'login'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'register',
    //             label: 'Register',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'registerbasic',
    //                     label: 'Basic',
    //                     link: '/auth-register-basic',
    //                     parentId: 'register'
    //                 },
    //                 {
    //                     id: 'registercover',
    //                     label: 'Cover',
    //                     link: '/auth-register-cover',
    //                     parentId: 'register'
    //                 },
    //                 {
    //                     id: 'registerboxed',
    //                     label: 'Boxed',
    //                     link: '/auth-register-boxed',
    //                     parentId: 'register'
    //                 },
    //                 {
    //                     id: 'registermodern',
    //                     label: 'Modern',
    //                     link: '/auth-register-modern',
    //                     parentId: 'register'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'verifyemail',
    //             label: 'Verify Email',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'verifyemailbasic',
    //                     label: 'Basic',
    //                     link: '/auth-verify-email-basic',
    //                     parentId: 'verifyemail'
    //                 },
    //                 {
    //                     id: 'verifyemailcover',
    //                     label: 'Cover',
    //                     link: '/auth-verify-email-cover',
    //                     parentId: 'verifyemail'
    //                 },
    //                 {
    //                     id: 'verifyemailmodern',
    //                     label: 'Modern',
    //                     link: '/auth-verify-email-modern',
    //                     parentId: 'verifyemail'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'twostep',
    //             label: 'Two Steps',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'twostepbasic',
    //                     label: 'Basic',
    //                     link: '/auth-two-steps-basic',
    //                     parentId: 'twostep'
    //                 },
    //                 {
    //                     id: 'twostepcover',
    //                     label: 'Cover',
    //                     link: '/auth-two-steps-cover',
    //                     parentId: 'twostep'
    //                 },
    //                 {
    //                     id: 'twostepboxed',
    //                     label: 'Boxed',
    //                     link: '/auth-two-steps-boxed',
    //                     parentId: 'twostep'
    //                 },
    //                 {
    //                     id: 'twostepmodern',
    //                     label: 'Modern',
    //                     link: '/auth-two-steps-modern',
    //                     parentId: 'twostep'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'logout',
    //             label: 'Logout',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'logoutbasic',
    //                     label: 'Basic',
    //                     link: '/auth-logout-basic',
    //                     parentId: 'logout'
    //                 },
    //                 {
    //                     id: 'logoutcover',
    //                     label: 'Cover',
    //                     link: '/auth-logout-cover',
    //                     parentId: 'logout'
    //                 },
    //                 {
    //                     id: 'logoutboxed',
    //                     label: 'Boxed',
    //                     link: '/auth-logout-boxed',
    //                     parentId: 'logout'
    //                 },
    //                 {
    //                     id: 'logoutmodern',
    //                     label: 'Modern',
    //                     link: '/auth-logout-modern',
    //                     parentId: 'logout'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'resetpw',
    //             label: 'Reset Password',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'resetpwbasic',
    //                     label: 'Basic',
    //                     link: '/auth-reset-password-basic',
    //                     parentId: 'resetpw'
    //                 },
    //                 {
    //                     id: 'resetpwcover',
    //                     label: 'Cover',
    //                     link: '/auth-reset-password-cover',
    //                     parentId: 'resetpw'
    //                 },
    //                 {
    //                     id: 'resetpwboxed',
    //                     label: 'Boxed',
    //                     link: '/auth-reset-password-boxed',
    //                     parentId: 'resetpw'
    //                 },
    //                 {
    //                     id: 'resetpwmodern',
    //                     label: 'Modern',
    //                     link: '/auth-reset-password-modern',
    //                     parentId: 'resetpw'
    //                 },
    //             ]
    //         },
    //         {
    //             id: 'createpw',
    //             label: 'Create Password',
    //             parentId: 'social',
    //             subItems: [
    //                 {
    //                     id: 'createpwbasic',
    //                     label: 'Basic',
    //                     link: '/auth-create-password-basic',
    //                     parentId: 'createpw'
    //                 },
    //                 {
    //                     id: 'createpwcover',
    //                     label: 'Cover',
    //                     link: '/auth-create-password-cover',
    //                     parentId: 'createpw'
    //                 },
    //                 {
    //                     id: 'createpwboxed',
    //                     label: 'Boxed',
    //                     link: '/auth-create-password-boxed',
    //                     parentId: 'createpw'
    //                 },
    //                 {
    //                     id: 'createpwmodern',
    //                     label: 'Modern',
    //                     link: '/auth-create-password-modern',
    //                     parentId: 'createpw'
    //                 },
    //             ]
    //         }
    //     ]
    // },
   
    
];

export { menuData };