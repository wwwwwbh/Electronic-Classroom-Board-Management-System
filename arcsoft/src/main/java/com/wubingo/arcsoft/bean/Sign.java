package com.wubingo.arcsoft.bean;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "signs")
public class Sign implements Serializable {
    @Id
    private String id;
    private String coursename;
    private String coursedetail;
    private String teachser;
    private String week;
    private String username;
    private String studentname;
    private Boolean isSign;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCoursename() {
        return coursename;
    }

    public void setCoursename(String coursename) {
        this.coursename = coursename;
    }

    public String getCoursedetail() {
        return coursedetail;
    }

    public void setCoursedetail(String coursedetail) {
        this.coursedetail = coursedetail;
    }

    public String getTeachser() {
        return teachser;
    }

    public void setTeachser(String teachser) {
        this.teachser = teachser;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public Boolean getSign() {
        return isSign;
    }

    public void setSign(Boolean sign) {
        isSign = sign;
    }
}
