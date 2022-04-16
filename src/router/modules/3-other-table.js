let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/othjerTable',
    name: 'othjerTable',
    redirect: {name:"element-shu"},
    component:  layout,
    meta: {
        title: '其他的特殊表格',
        icon: "input",
    },
    children: [
        {
            path: 'element-shu',
            name: 'element-shu',
            component: () => import(/* webpackChunkName: "1-element-shu" */ "@/views/3-other-table/1-element-shu.vue"),
            meta: {
                title: 'element竖向表格',
                icon: "input",
            }
        },
        {
		    path: 'vxe-shu',
		    name: 'vxe-shu',
		    component: () => import(/* webpackChunkName: "vxe-shu" */ "@/views/3-other-table/2-vxe-shu.vue"),
		    meta: {
		        title: 'vxe竖向table',
		        icon: "input",
		    }
        },
        {
		    path: 'table',
		    name: 'otherTable-table',
		    component: () => import(/* webpackChunkName: "3-table" */ "@/views/3-other-table/3-table.vue"),
		    meta: {
		        title: '原生table',
                icon: "input",
		    }
        },
        {
		    path: 'openTable',
		    name: 'otherTable-openTable',
		    component: () => import(/* webpackChunkName: "4-open-table" */ "@/views/3-other-table/4-open-table.vue"),
		    meta: {
		        title: '展开表格',
                icon: "input",
		    }
        },
        {
            path: 'clearCheckbox',
            name: 'otherTable-clearCheckbox',
            component: () => import(/* webpackChunkName: "5-clear-checkbox" */ "@/views/3-other-table/5-clear-checkbox.vue"),
            meta: {
                title: '清空多选',
                icon: "input",
            }
        },
        {
            path: 'chooseTable',
            name: 'layout-chooseTable',
            component: () => import(/* webpackChunkName: "6-choose-table" */ "@/views/3-other-table/6-choose-table.vue"),
            meta: {
                title: '选择性多选',
                icon: "input",
            }
        }
    ]
}