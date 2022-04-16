let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/panel',
    name: 'panel',
    redirect: {name:"panel-base"},
    component:  layout,
    meta: {
        title: '封装伸缩框',
        icon: 'e62a;',
    },
    children: [
        {
            path: 'base',
            name: 'panel-base',
            component: () => import(/* webpackChunkName: "panel-base" */ "@/views/4-panel/1-base-panel.vue"),
            meta: {
                title: '基础伸缩框',
                icon: "caidan",
            }
        },
        // {
        //     path: 'msg',
        //     name: 'alert-msg',
        //     component: () => import(/* webpackChunkName: "alert-msg" */ "@/views/alert/msg.vue"),
        //     meta: {
        //         title: '信息弹窗',
        //         icon: 'e627;',
        //     }
        // }
    ]
}