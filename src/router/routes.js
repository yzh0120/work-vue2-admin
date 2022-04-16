let layout = () => import(/* webpackChunkName: "layout" */"@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属

import baseForm from "./modules/1-base-form.js"
import baseTable from "./modules/2-base-table.js"
import otherTable from "./modules/3-other-table.js"
import panel from "./modules/4-panel.js"
import file from "./modules/5-file.js"
import alert from "./modules/6-alert.js"

import {status} from "./modules/status.js"
const routes = [	
	{
		path: '/blank',
		name: 'blank',
		component: layout,
		meta:{
			hidden: true,
		}
	},
	{
		path: '/',
		name: '/',
		redirect: '/base',
		component: layout,
		meta:{
			title: '首页',
			icon: 'shouye',
		},
		children: [{
			path: 'base',
			name: 'base',
			component: () => import( /* webpackChunkName: "base" */ "@/views/base.vue"),
			meta: {
				title: '首页',
				// hidden:true,
				icon: 'dashboard',
				fixed: true//"/base"//fullPath
			}
		}]
	},

	baseForm,//表单
	baseTable,//表格
	otherTable,//其他表格
	panel,//展开框
	file,//文件
	alert,//弹窗
	
	...status,//状态和登录页
	

]

export default routes
