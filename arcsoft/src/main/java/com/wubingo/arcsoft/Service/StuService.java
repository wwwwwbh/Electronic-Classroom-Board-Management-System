package com.wubingo.arcsoft.Service;

import javax.servlet.http.HttpSession;

public interface StuService {

    public int findPathByUsername(String username, HttpSession session);
}
