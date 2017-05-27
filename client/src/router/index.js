import Vue              from 'vue';
import VueRouter        from 'vue-router';
import auth             from './../services/auth.service';
import Home             from './../components/Home.vue';
import About            from './../components/About.vue';
import Login            from './../components/Login.vue';
import CreateEditPost   from './../components/CreateEditPost.vue';
import Post             from './../components/Post.vue';


Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    if (!auth.loggedIn()) {
        next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
};

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },        
        { path: '/editpost', component: CreateEditPost, beforeEnter: requireAuth },
        { path: '/createpost', component: CreateEditPost, beforeEnter: requireAuth },
        { path: '/post/:post_id', component: Post },
        { path: '/about', component: About },
        { path: '/login', component: Login },
        { path: '/logout',
            beforeEnter (to, from, next) {
                auth.logout();
                next('/');
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});
