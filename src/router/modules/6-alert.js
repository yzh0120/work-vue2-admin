let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/alert',
    name: 'alert',
    redirect: {name:"base-alert"},
    component:  layout,
    meta: {
        title: '弹窗',
        icon: "program-code",
    },
    children: [
        {
            path: 'base',
            name: 'base-alert',
            component: () => import(/* webpackChunkName: "alert-base" */ "@/views/6-alert/1-base-alert.vue"),
            meta: {
                title: '基础弹窗',
                icon: "program-code",
            }
        },
        {
            path: 'msgAlert',
            name: 'msg-alert',
            component: () => import(/* webpackChunkName: "alert-msg" */ "@/views/6-alert/2-msg-list.vue"),
            meta: {
                title: '消息弹窗',
                icon: "program-code",
            }
        },
    ]
}