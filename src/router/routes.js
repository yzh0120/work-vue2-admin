let layout = () => import(/* webpackChunkName: "layout" */"@/layout/index.vue")

// import confirm from "./modules/confirm.js"

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
	...status,//状态和登录页
	

]

export default routes
