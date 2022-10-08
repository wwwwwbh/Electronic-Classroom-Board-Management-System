module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    const User = require('../../models/User')
    const Publicnotice = require('../../models/Publicnotice')
    const Device = require('../../models/Device')
    const Building = require('../../models/Building')
    const Course = require('../../models/Course')
    const College = require('../../models/College')
    const Repair = require('../../models/Repair')
    const Timetable = require('../../models/Timetable')
    const Sign = require('../../models/Sign')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const moment = require('moment')
    const destination = "/../../uploads"
    var username = ''

    //登录校验中间件

    const authMiddleware = async (req, res, next) => {
        //拿到token,用空格分割，分割完是数组，pop()弹出Bearer
        const token = String(req.headers.authorization || '').split(' ').pop()

        //无token
        assert(token, 401, '没有token,请先登录')

        //decode()方法不会验证对错,使用verify(token,secrect)方法
        const {
            id
        } = jwt.verify(token, app.get('secret'))

        //token无效，id必须要有
        assert(id, 401, 'token无效，请先登录')

        //为了让user能在后续中使用，吧user挂载到req或者res对象上去，req.user表示客户端用户请求的对象是谁
        req.user = await User.findById(id)

        assert(req.user, 401, '用户不存在，请先登录')

        username = req.user.username

        await next()

    }

    //新增用户信息
    router.post('/users', async (req, res) => {
        const user = await User.findOne().where('username').equals(req.body.username)

        const number = await User.find().where('class').equals(req.body.class).countDocuments().exec()

        if (number > 50) {
            let flagnumber = false
            assert(flagnumber, 422, '该班级人数已达上限')
        }

        if (user) {
            let flaguser = false
            assert(flaguser, 422, '该用户已存在')
        }

        //若该班级是新班级，则插入空白公告
        const publicnotice = await Publicnotice.findOne().where('class').equals(req.body.class)

        if (publicnotice == null) {
            let noticeinfo = {
                class: '',
                notice: '暂时没有公告'
            }
            noticeinfo.class = req.body.class

            await Publicnotice.create(noticeinfo)
        }
        var data = req.body
        if (data.password == '') {
            data.password = data.username
        }
        const model = await User.create(data)
        res.send(model)
    })

    //获取学生个人信息
    router.get('/user/info', authMiddleware, async (req, res) => {

        res.send(req.user)
    })

    //获取公告信息
    router.get('/publicnotices', async (req, res) => {
        const model = await Publicnotice.find()
        res.send(model)
    })


    //更新公告
    router.post('/publicnotices/update', async (req, res) => {
        const model = await Publicnotice.findOneAndUpdate({
            'class': req.body.class
        }, {
            'notice': req.body.notice
        })
        res.send(model)
    })


    //新增设备
    router.post('/devices', async (req, res) => {
        //findone 对象
        const device = await Device.findOne().where('name').equals(req.body.name)
        if (device) {
            let flaguser = false
            assert(flaguser, 422, '设备已存在')
        }
        const model = await Device.create(req.body)

        res.send(model)
    })

    //新增教学楼信息
    router.post('/buildings', async (req, res) => {
        //find 数组
        const building = await Building.find().where('name').equals(req.body.name).where('number').equals(req.body.number)
        if (building[0]) {
            let flaguser = false
            assert(flaguser, 422, '教学楼已存在')

        }
        const model = await Building.create(req.body)

        res.send(model)
    })

    //获取教学楼信息以及教室号信息
    router.get('/buildings', async (req, res) => {
        const data = await Building.find()

        //生成教室楼
        var building = []
        data.forEach(element => {
            building.push(element.name + element.number)
        });

        var room = []
        for (let i = 1; i <= 6; i++)
            for (let j = 1; j <= 15; j++) {
                room.push(i * 100 + j)
            }
        res.send({
            building,
            room
        })
    })

    //新建课程信息
    router.post('/courses', async (req, res) => {
        //需要对教室和时段进行控制保证没有课
        const course = await Course.find().
        where('weekday').equals(req.body.weekday).
        where('time').equals(req.body.time).
        where('year').equals(req.body.year).
        where('classroom').equals(req.body.classroom)
        if (course[0]) {
            let flaguser = false
            assert(flaguser, 422, '该教室和时段已排课')

        }

        const model = await Course.create(req.body)

        res.send(model)

    })

    //获取课程信息
    router.get('/courses', async (req, res) => {

        const model = await Course.find()

        res.send(model)

    })

    //新增选课信息
    router.post('/timetable', authMiddleware, async (req, res) => {
        const course = await Timetable.find().where('username').equals(req.user.username).
        where('year').equals(req.body.year).
        where('weekday').equals(req.body.weekday).
        where('time').equals(req.body.time)

        if (course[0]) {
            let flaguser = false
            assert(flaguser, 422, '该时段已选课')

        }
        var timetable = {
            coursename: req.body.name,
            teacher: req.body.teacher,
            weekday: req.body.weekday,
            time: req.body.time,
            classroom: req.body.classroom,
            year: req.body.year,
            startweek: req.body.startweek,
            endweek: req.body.endweek,
            username: req.user.username,
            studentname: req.user.name
        }
        const model = await Timetable.create(timetable)
        res.send(model)
    })

    //查询选课信息
    router.get('/timetable', authMiddleware, async (req, res) => {
        var model = []
        if (req.user.type == '学生') {
            model = await Timetable.find().where('username').equals(req.user.username)
        }
        if (req.user.type == '教师') {
            model = await Timetable.aggregate([{
                $match: {
                    "teacher": req.user.name
                }
            }, {
                $sort: {
                    username: -1
                }
            }, {
                $group: {
                    _id: "$coursename",
                    teacher: {
                        $max: "$teacher"
                    },
                    weekday: {
                        $max: "$weekday"
                    },
                    time: {
                        $max: "$time"
                    },
                    classroom: {
                        $max: "$classroom"
                    },
                    year: {
                        $max: "$year"
                    },
                    startweek: {
                        $max: "$startweek"
                    },
                    endweek: {
                        $max: "$endweek"
                    },
                    totalStudent: {
                        $sum: 1
                    }
                }
            }])
        }
        if (req.user.type == '管理员') {
            model = await Timetable.aggregate([{
                $sort: {
                    username: -1
                }
            }, {
                $group: {
                    _id: "$coursename",
                    teacher: {
                        $max: "$teacher"
                    },
                    weekday: {
                        $max: "$weekday"
                    },
                    time: {
                        $max: "$time"
                    },
                    classroom: {
                        $max: "$classroom"
                    },
                    year: {
                        $max: "$year"
                    },
                    startweek: {
                        $max: "$startweek"
                    },
                    endweek: {
                        $max: "$endweek"
                    },
                    totalStudent: {
                        $sum: 1
                    }
                }
            }])
        }
        res.send(model)
    })

    //发起签到
    router.post('/attendance', async (req, res) => {
        const temp = req.body.details
        var coursedetail = ''
        coursedetail += coursedetail + temp.weekday + ' ' +
            temp.time + ' ' + temp.classroom + ' ' + temp.year
        const item = await Sign.find().
        where('coursename').equals(temp._id).
        where('coursedetail').equals(coursedetail).
        where('teacher').equals(temp.teacher).
        where('week').equals(req.body.week)
        if (item[0]) {
            let flaguser = false
            assert(flaguser, 422, '该周已发布此节课签到')
        }

        var signinfo = {
            coursename: temp._id,
            coursedetail: coursedetail,
            teacher: temp.teacher,
            week: req.body.week,
            username: '',
            studentname: '',
            isSign: false
        }
        const model = await Timetable.find({}, {
            _id: 0,
            username: 1,
            studentname: 1
        }).
        where('coursename').equals(temp._id).
        where('teacher').equals(temp.teacher).
        where('weekday').equals(temp.weekday).
        where('time').equals(temp.time).
        where('year').equals(temp.year).
        where('classroom').equals(temp.classroom)
        for (let i = 0; i < model.length; i++) {
            signinfo.username = model[i].username
            signinfo.studentname = model[i].studentname
            await Sign.create(signinfo)
        }
        res.send()
    })

    //签到结果,增加按周查
    router.get('/attendance', authMiddleware, async (req, res) => {
        var model = []
        if (req.user.type == '教师') {
            model = await Sign.find().where('teacher').equals(req.user.name)
        } else if (req.user.type == '学生') {
            model = await Sign.find().where('username').equals(req.user.username)
        }
        res.send(model)
    })


    //选课信息全查询/timetable/admin
    router.get('/timetable/admin', async (req, res) => {
        const model = await Timetable.find()
        res.send(model)
    })

    //选课信息删除
    router.post('/timetable/delete', async (req, res) => {
        const model = await Timetable.findByIdAndDelete(req.body._id)
        res.send(model)
    })

    //新增学院信息
    router.post('/colleges', async (req, res) => {
        const college = await College.findOne().where('name').equals(req.body.name)
        if (college) {
            let flaguser = false
            assert(flaguser, 422, '学院已存在')

        }
        const model = await College.create(req.body)

        res.send(model)
    })

    //查询学院信息
    router.get('/colleges', async (req, res) => {
        const items = await College.find()
        res.send(items)
    })


    //根据教室查课


    //获取设备信息
    router.get('/devices', async (req, res) => {
        const model = await Device.find()

        res.send(model)
    })

    //获取用户信息
    router.get('/userinfo', authMiddleware, async (req, res) => {

        let userinfo = {
            username: '',
            name: '',
            type: ''
        }

        userinfo.username = req.user.username

        userinfo.name = req.user.name

        userinfo.type = req.user.type

        res.send(userinfo)
    })

    //获取所有学生信息
    router.get('/users/students', authMiddleware, async (req, res) => {

        const items = await User.find().where('type').equals("学生")

        res.send(items)
    })

    //获取所有教师信息
    router.get('/users/teachers', authMiddleware, async (req, res) => {

        const items = await User.find().where('type').equals("教师")

        res.send(items)
    })

    router.post('/findteachersbycollege', async (req, res) => {

        const items = await User.find().where('type').equals("教师").where('college').equals(req.body.college)

        res.send(items)
    })

    //新增维修信息
    router.post('/repair', async (req, res) => {
        const repair = await Repair.findOne().where('name').equals(req.body.name).where('status').equals('待维修')
        if (repair) {
            let flaguser = false
            assert(flaguser, 422, '该设备已报修')
        }
        var data = {
            name: '',
            info: '',
            time: '',
            status: '待维修',
            operator: '',
        }
        await Device.findOneAndUpdate({
            'name': req.body.name
        }, {
            'health': '待维修'
        })
        data.name = req.body.name
        data.info = req.body.info
        data.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        const items = await Repair.create(data)
        res.send(items)
    })

    //查询报修信息
    router.get('/repair', async (req, res) => {
        const items = await Repair.find()
        res.send(items)
    })


    app.use('/admin/api', router)

    const multer = require('multer')
    var storage = multer.diskStorage({
        //这里destination是一个字符串
        destination: '.' + destination,
        filename: function (req, file, cb) {
            //自定义设置文件的名字
            filename = username + '.' + file.originalname.split('.')[1];
            cb(null, filename)
        }
    });
    var upload = multer({
        storage: storage
    })
    app.post('/admin/api/uploadphoto', upload.single('file'), async (req, res) => {
        var file = req.file
        file.url = `http://localhost:3030/uploads/${file.filename}`;
        res.send(file)
    })
    //登录
    app.post('/admin/api/login', async (req, res) => {

        const {
            username,
            password
        } = req.body

        const user = await User.findOne({
            "username": `${username}`
        }, {
            "username": 1,
            "password": 1
        })

        assert(user, 422, '用户不存在')

        const isValid = require('bcryptjs').compareSync(password, user.password)

        assert(isValid, 422, '密码错误')

        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))

        res.send({
            token
        })
    })


    app.use(async (err, req, res, next) => {
        //没有状态码报500错误
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}