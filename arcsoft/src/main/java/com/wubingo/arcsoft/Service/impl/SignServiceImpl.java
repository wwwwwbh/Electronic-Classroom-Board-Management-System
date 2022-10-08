package com.wubingo.arcsoft.Service.impl;

import com.wubingo.arcsoft.Service.SignService;
import com.wubingo.arcsoft.dao.impl.SignDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    private SignDaoImpl signDao;

    @Override
    public int updateIsSign(String username){
        int flag = signDao.updateIsSign(username);
        if(flag == 1){
            return 1;
        }else{
            return 0;
        }
    }
}
