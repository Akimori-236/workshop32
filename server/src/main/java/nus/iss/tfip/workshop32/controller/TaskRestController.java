package nus.iss.tfip.workshop32.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import nus.iss.tfip.workshop32.model.Task;
import nus.iss.tfip.workshop32.service.TaskService;

@Controller
@ResponseBody
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class TaskRestController {

    @Autowired
    private TaskService taskSvc;

    @PostMapping(path = "/tasks")
    public ResponseEntity<String> saveTaskList(@RequestBody List<Task> taskList) {
        String ObjId;
        try {
            ObjId = taskSvc.saveTaskList(taskList);
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body("{'message': 'wrong data format'}");
        }

        if (ObjId.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'not saved'}");
        } else {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{'message': 'successfully saved', 'ObjId': '%s'}".formatted(ObjId));
        }
    }
}
