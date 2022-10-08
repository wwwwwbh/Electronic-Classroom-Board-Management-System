package com.wubingo.arcsoft.Service.impl;

import com.google.gson.Gson;
import com.wubingo.arcsoft.Service.StuService;
import com.wubingo.arcsoft.bean.Student;
import com.wubingo.arcsoft.dao.impl.StuDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class StuServiceImpl implements StuService {
    @Autowired
    private StuDaoImpl stuDao;
    @Autowired
    private Gson gson;

    @Override
    public int findPathByUsername(String username, HttpSession session){
        Student stu = stuDao.findPathByUsername(username);

        if (stu != null) {
            session.setAttribute("student", stu);
            return 1;
        } else {
            return 0;
        }
    }

}
