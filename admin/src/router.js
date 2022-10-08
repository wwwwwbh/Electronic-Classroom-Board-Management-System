import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: (resolve) => require(['./views/Home'], resolve),
        children: [{
            path: '/users/create',
            name: 'StudentEdit',
            component: (resolve) => require(['./views/StudentEdit'], resolve)
        }, {
            path: '/users/list',
            name: 'StudentList',
            component: (resolve) => require(['./views/StudentList'], resolve)
        }, {
            path: '/teachers/list',
            name: 'TeacherList',
            component: (resolve) => require(['./views/TeacherList'], resolve)
        }, {
            path: '/devices/create',
            name: 'DeviceEdit',
            component: (resolve) => require(['./views/DeviceEdit'], resolve)
        }, {
            path: '/devices/list',
            name: 'DeviceList',
            component: (resolve) => require(['./views/DeviceList'], resolve)
        }, {
            path: '/courses/create',
            name: 'CourseEdit',
            component: (resolve) => require(['./views/CourseEdit'], resolve)
        }, {
            path: '/courses/list',
            name: 'CourseList',
            component: (resolve) => require(['./views/CourseList'], resolve)
        }, {
            path: '/admincourse/list',
            name: 'AdminCourseList',
            component: (resolve) => require(['./views/AdminCourseList'], resolve)
        }, {
            path: '/collegelist',
            name: 'CollegeEdit',
            component: (resolve) => require(['./views/CollegeEdit'], resolve)
        }, {
            path: '/repairlist',
            name: 'RepairList',
            component: (resolve) => require(['./views/RepairList'], resolve)
        }, {
            path: '/publicnotice',
            name: 'Publicnotice',
            component: (resolve) => require(['./views/Publicnotice'], resolve)
        }, {
            path: '/personalinfo',
            name: 'Personalinfo',
            component: (resolve) => require(['./views/Personalinfo'], resolve)
        }, {
            path: '/course/select',
            name: 'CourseSelect',
            component: (resolve) => require(['./views/CourseSelect'], resolve)
        }, {
            path: '/stucourses/list',
            name: 'StuCourseList',
            component: (resolve) => require(['./views/StuCourseList'], resolve)
        }, {
            path: '/sign/list',
            name: 'SignList',
            component: (resolve) => require(['./views/SignList'], resolve)
        }, {
            path: '/upload',
            name: 'Upload',
            component: (resolve) => require(['./views/Upload'], resolve)
        }]
    }, {
        path: '/login',
        name: 'Login',
        component: (resolve) => require(['./views/Login'], resolve)
    }]
})