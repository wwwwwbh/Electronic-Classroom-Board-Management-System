package com.wubingo.arcsoft.dao.impl;

import com.wubingo.arcsoft.bean.Student;
import com.wubingo.arcsoft.dao.StuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component
public class StuDaoImpl implements StuDao {
    @Autowired
    private MongoTemplate mongoTemplate;

    //主要用来获得图片路径
    @Override
    public Student findPathByUsername(String username){
        Query query = new Query(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query,Student.class);
    }

}
