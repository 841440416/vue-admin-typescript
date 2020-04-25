declare global {
    interface RouterMeta {
        title: string;
        sc?:string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn',
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu'},
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}
export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu',sc:'iconfont'},
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') },
    ]
},
{
    path: '/yewu',
    name: 'yewu',
    permission: '',
    meta: { title: 'YeWuMenu',sc:'icc2'},
    icon: '&#xe626;',
    component: main,
    children: [
        { path: 'goods', permission: 'Pages.Goods', meta: { title: 'Goods' }, name: 'goods', component: () => import('../views/setting/goods/goods.vue') },
        { path: 'zhaopin', permission: 'Pages.ZhaoPin', meta: { title: 'ZhaoPin' }, name: 'zhaopin', component: () => import('../views/setting/zhaopin/zhaopin.vue') },
        { path: 'news', permission: 'Pages.News', meta: { title: 'News' }, name: 'news', component: () => import('../views/setting/news/news.vue') },
        { path: 'jl', permission: 'Pages.JL', meta: { title: 'JL' }, name: 'jl', component: () => import('../views/setting/jl/jl.vue') }
    ]
}
]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
