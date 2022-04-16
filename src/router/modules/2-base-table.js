let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

export default { 
    path: '/baseTable',
    name: 'baseTable',
    redirect: {name:"baseTable-base"},
    component:  layout,
    meta: {
        title: '封装el-table',
        icon: "biaodanzujian-biaoge",
    },
    children: [
        {
            path: 'base',
            name: 'baseTable-base',
            component: () => import(/* webpackChunkName: "1-base-table" */ "@/views/2-base-table/1-base-table.vue"),
            meta: {
                title: '基础表格',
                icon: "biaodanzujian-biaoge",
            }
        },
        {
            path: 'formatter',
            name: 'baseTable-formatter',
            component: () => import(/* webpackChunkName: "2-formatter-table" */ "@/views/2-base-table/2-formatter-table.vue"),
            meta: {
                title: '格式化字段的表格',
                icon: "biaodanzujian-biaoge",
            }
        },
        {
            path: 'slot',
            name: 'baseTable-slot',
            component: () => import(/* webpackChunkName: "3-slot-table" */ "@/views/2-base-table/3-slot-table.vue"),
            meta: {
                title: '插槽的表格',
                icon: "biaodanzujian-biaoge",
            }
        },
        {
            path: 'checkbox',
            name: 'baseTable-checkbox',
            component: () => import(/* webpackChunkName: "4-checkbox-table" */ "@/views/2-base-table/4-checkbox-table.vue"),
            meta: {
                title: '多选的表格',
                icon:  "biaodanzujian-biaoge",
            }
        },
        {
		    path: 'moreHead',
		    name: 'baseTable-MoreHead',
		    component: () => import(/* webpackChunkName: "5-moreHead-table"*/ "@/views/2-base-table/5-moreHead-table.vue"),
		    meta: {
		        title: '多级表头',
		        icon: "biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'sort',
		    name: 'baseTable-sort',
		    component: () => import(/* webpackChunkName: "6-sort-table" */ "@/views/2-base-table/6-sort-table.vue"),
		    meta: {
		        title: '表格排序',
		        icon:"biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'sum',
		    name: 'baseTable-sum',
		    component: () => import(/* webpackChunkName: "7-sum-table" */ "@/views/2-base-table/7-sum-table.vue"),
		    meta: {
		        title: '合计',
		        icon:"biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'tip',
		    name: 'baseTable-tip',
		    component: () => import(/* webpackChunkName: "8-baseTable-tip" */ "@/views/2-base-table/8-tip-table.vue"),
		    meta: {
		        title: '内容溢出隐藏并悬浮显示',
		        icon:"biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'fixed',
		    name: 'baseTable-fixed',
		    component: () => import(/* webpackChunkName: "9-fixed-table" */ "@/views/2-base-table/9-fixed-table.vue"),
		    meta: {
		        title: '固定列',
		        icon:"biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'hover-other',
		    name: 'baseTable-hover',
		    component: () => import(/* webpackChunkName: "10-baseTable-hover" */ "@/views/2-base-table/10-hover-other.vue"),
		    meta: {
		        title: '悬浮显示其他字段',
		        icon:"biaodanzujian-biaoge",
		    }
        },
        {
		    path: 'tree',
		    name: 'baseTable-tree',
		    component: () => import(/* webpackChunkName: "11-tree-table" */ "@/views/2-base-table/11-tree-table.vue"),
		    meta: {
		        title: 'tree表格',
		        icon:"biaodanzujian-biaoge",
		    }
		},

    ]
}