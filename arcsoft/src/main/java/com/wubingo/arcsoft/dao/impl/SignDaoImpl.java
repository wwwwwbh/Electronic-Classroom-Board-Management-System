package com.wubingo.arcsoft.dao.impl;

import com.mongodb.client.result.UpdateResult;
import com.wubingo.arcsoft.bean.Sign;
import com.wubingo.arcsoft.dao.SignDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class SignDaoImpl implements SignDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    //更新未签到信息
    @Override
    public int updateIsSign(String username){
        Query query = new Query(Criteria.where("username").is(username));
        Update update = new Update();
        update.set("isSign",true);
        UpdateResult updateResult = mongoTemplate.updateFirst(query,update,Sign.class);
        if(updateResult.getMatchedCount() == 1)
            return 1;
        return 0;
    }

}
