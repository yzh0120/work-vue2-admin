let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/tagsView',
    name: 'tagsView',
    redirect: {name:"base-tagsView"},
    component:  layout,
    meta: {
        title: '标签页操作',
        icon: "program-code",
    },
    children: [
        {
            path: 'base',
            name: 'base-tagsView',
            component: () => import(/* webpackChunkName: "tagsView-base" */ "@/views/9-tagsView/1-base-tagsView.vue"),
            meta: {
                title: '标签页操作',
                icon: "program-code",
            }
        },
    ]
}
