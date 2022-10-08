package com.wubingo.arcsoft.dao;

import com.wubingo.arcsoft.bean.Student;

public interface StuDao {

    public Student findPathByUsername(String username);
}
