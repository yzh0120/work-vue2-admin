let layout = () => import("@/layout/index.vue")
let blank = () => import("@/views/blank.vue")//二级菜单专属
export default { 
    path: '/base',//修改
    name: 'base',//修改
    redirect: {name:"base-where"},//修改
    component:  layout,
    meta: {
        title: '前端基础',//修改
        icon: "html5",
    },
    children: [
        {
            path: 'where',//修改
            name: 'base-where',//修改
            component: blank,
            meta: {
                title: '位置',//修改
                icon: "html5",
            },
			children: [
				{
				    path: 'dom',//修改
				    name: 'base-where-dom',//修改
				    component: () => import(/* webpackChunkName: "base-where-dom" */ "@/views/13-base/1-where/1-dom/index.vue"),//修改
				    meta: {
				        title: 'dom的位置',//修改
				        icon: "html5",
				    }
				},
				{
				    path: 'mouse',//修改
				    name: 'base-where-mouse',//修改
				    component: () => import(/* webpackChunkName: "base-where-mouse" */ "@/views/13-base/1-where/2-mouse/index.vue"),//修改
				    meta: {
				        title: '鼠标的位置',//修改
				        icon: "html5",
				    }
				}
			]
        },
		
		{
		    path: 'event',//修改
		    name: 'base-event',//修改
		    component: blank,
		    meta: {
		        title: '事件',//修改
		        icon: "html5",
		    },
			children: [
				{
				    path: 'move',//修改
				    name: 'base-event-move',//修改
				    component: () => import(/* webpackChunkName: "move" */ "@/views/13-base/2-event/1-mouseEvent/1-move.vue"),//修改
				    meta: {
				        title: '鼠标move事件',//修改
				        icon: "html5",
				    }
				},
				{
				    path: 'mouseover',//修改
				    name: 'base-event-mouseover',//修改
				    component: () => import(/* webpackChunkName: "mouseover" */ "@/views/13-base/2-event/1-mouseEvent/2-mouseover.vue"),//修改
				    meta: {
				        title: '鼠标mouseover事件',//修改
				        icon: "html5",
				    }
				},
				{
				    path: 'mouseenter',//修改
				    name: 'base-event-mouseenter',//修改
				    component: () => import(/* webpackChunkName: "mouseenter" */ "@/views/13-base/2-event/1-mouseEvent/3-mouseenter.vue"),//修改
				    meta: {
				        title: '鼠标mouseenter事件',//修改
				        icon: "html5",
				    }
				},
				{
				    path: 'mousewheel',//修改
				    name: 'base-event-mousewheel',//修改
				    component: () => import(/* webpackChunkName: "mousewheel" */ "@/views/13-base/2-event/1-mouseEvent/4-mousewheel.vue"),//修改
				    meta: {
				        title: '鼠标mousewheel事件',//修改
				        icon: "html5",
				    }
				},
			]
		},
       
	   {
		 path: 'css',//修改
		 name: 'base-css',//修改
		 component: blank,
		 meta: {
		     title: 'css',//修改
		     icon: "html5",
		 },  
		 children: [
		     {
		         path: 'three',//修改
		         name: 'base-css-three',//修改
		         component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/3-css/1-three.vue"),//修改
		         meta: {
		             title: '三角形',//修改
		             icon: "html5",
		         }
		     },
		 	{
		 	    path: '0.5px',//修改
		 	    name: 'base-css-0.5px',//修改
		 	    component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/3-css/2-0.5px.vue"),//修改
		 	    meta: {
		 	        title: '0.5px',//修改
		 	        icon: "html5",
		 	    }
		 	},
		 	{
		 	    path: 'filter',//修改
		 	    name: 'base-css-filter',//修改
		 	    component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/3-css/3-filter.vue"),//修改
		 	    meta: {
		 	        title: 'filter',//修改
		 	        icon: "html5",
		 	    }
		 	},
			{
			    path: 'drag',//修改
			    name: 'base-css-drag',//修改
			    component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/3-css/4-drag.vue"),//修改
			    meta: {
			        title: 'drag',//修改
			        icon: "html5",
			    }
			},
			{
			    path: 'scrollIntoView',//修改
			    name: 'base-css-scrollIntoView',//修改
			    component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/3-css/5-scrollIntoView.vue"),//修改
			    meta: {
			        title: '跳转',//修改
			        icon: "html5",
			    }
			},
			
			// {
			//     path: 'transition',//修改
			//     name: 'base-css-vue-transition-transition',//修改
			//     component: () => import(/* webpackChunkName: "css-base" */ "@/views/13-base/css/vue/transition.vue"),//修改
			//     meta: {
			//         title: '单个元素transition',//修改
			//         icon: "html5",
			//     }
			// },
			
			{
			    path: 'vue-transition',//修改
			    name: 'base-css-vue-transition',//修改
			    component: blank,
			    meta: {
			        title: 'vue过渡',//修改
			        icon: "html5",
			    },
				children:[
					{
					    path: 'transition',//修改
					    name: 'base-css-vue-transition-transition',//修改
					    component: () => import(/* webpackChunkName: "base-css-vue-transition-transition" */ "@/views/13-base/3-css/1-vue/1-transition.vue"),//修改
					    meta: {
					        title: '单个元素transition',//修改
					        icon: "html5",
					    }
					},
					{
					    path: 'transitionGroup',//修改
					    name: 'base-css-vue-transition-transitionGroup',//修改
					    component: () => import(/* webpackChunkName: "base-css-vue-transition-transitionGroup" */ "@/views/13-base/3-css/1-vue/2-transitionGroup.vue"),//修改
					    meta: {
					        title: 'transitionGroup',//修改
					        icon: "html5",
					    }
					},
				]
			}
		 ]
	   }
    ]
}