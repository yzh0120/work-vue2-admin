let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/fastCopy',
    name: 'fastCopy',
    redirect: {name:"base-fastCopy"},
    component:  layout,
    meta: {
        title: '布局',
        icon: "lcd",
    },
    children: [
        {
            path: 'base',
            name: 'base-fastCopy',
            component: () => import(/* webpackChunkName: "fastCopy-base" */ "@/views/8-fastCopy/1-page.vue"),
            meta: {
                title: '普通页面',
                icon: "lcd",
            }
        },
        {
            path: 'table-page',
            name: 'table-page-fastCopy',
            component: () => import(/* webpackChunkName: "fastCopy-table-page" */ "@/views/8-fastCopy/2-table-page.vue"),
            meta: {
                title: '表格页面',
                icon: "lcd",
            }
        },
        {
            path: 'alert-table-page',
            name: 'alert-table-page-fastCopy',
            component: () => import(/* webpackChunkName: "fastCopy-alert-table-page" */ "@/views/8-fastCopy/3-alert-table-page.vue"),
            meta: {
                title: '表格页面带弹窗',
                icon: "lcd",
            }
        },
        {
            path: 'search-table-page',
            name: 'search-table-page-fastCopy',
            component: () => import(/* webpackChunkName: "fastCopy-search-table-page" */ "@/views/8-fastCopy/4-search-table-page.vue"),
            meta: {
                title: '联动搜索表格页面',
                icon: "lcd",
            }
        },
    ]
}