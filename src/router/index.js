import home from '../views/App/index';
import test from '../views/Test/index';

const  routes = [
    {
        path:"/home",
        component:home,
        exact:true
    },
    {
        path:"/test",
        component:test,
        exact:true
    }
]
export default routes;
