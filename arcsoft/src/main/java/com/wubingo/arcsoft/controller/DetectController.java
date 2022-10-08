package com.wubingo.arcsoft.controller;

import com.google.gson.Gson;
import com.wubingo.arcsoft.Service.impl.SignServiceImpl;
import com.wubingo.arcsoft.Service.impl.StuServiceImpl;
import com.wubingo.arcsoft.bean.Result;
import com.wubingo.arcsoft.bean.Student;
import com.wubingo.arcsoft.util.ResultJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wubingo.arcsoft.util.faceutil;

import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin
public class DetectController {

    @Autowired
    private StuServiceImpl stuService;
    @Autowired
    private SignServiceImpl signService;
    @Autowired
    private Gson gson;


    @PostMapping("/setUsername")
    public ResultJson setUsername(@RequestBody String jsonString, HttpSession session){
        Result result = gson.fromJson(jsonString,Result.class);
        //设置用户名找到图片一地址
        int flag = stuService.findPathByUsername(result.getUsername(),session);

        if(flag == 0){
            return ResultJson.error("user is not exist");
        }
        else{
            return ResultJson.success("photo starting");
        }

    }


    @PostMapping("/upload")
    public ResultJson upload(@RequestParam("file")MultipartFile file, HttpSession session){
        String videoPath = "";//上传文件
        if(file.isEmpty()){
            return ResultJson.error("the file is null");
        }
        try{
            byte[] bytes = file.getBytes();
            videoPath = System.getProperty("user.dir");//获取项目运行的路径（好像是tomcat下的bin目录）
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSS");//设置时间戳格式
            Date date = new Date();
            String filename = simpleDateFormat.format(date);//将时间戳转为String存储
            videoPath = videoPath + "\\picturecache\\" + filename;//设置完整路径以及文件名（因为之前get到的在bin目录下，所以要返回上一层目录才能到达webapp目录）
            System.out.println(videoPath);
            OutputStream out = new FileOutputStream(videoPath);
            out.write(bytes);out.flush();out.close();
        }catch(IOException e){e.printStackTrace();}
        Student stu = (Student) session.getAttribute("student");
        float result =   faceutil.FaceSimilar(stu.getPath(),videoPath);
        if(result > 0.8){
            signService.updateIsSign(stu.getUsername());
            return ResultJson.success("success");}
        return ResultJson.success("false");
    }
}
