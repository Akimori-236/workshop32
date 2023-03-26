package nus.iss.tfip.workshop32.service;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nus.iss.tfip.workshop32.MyConstants;
import nus.iss.tfip.workshop32.model.Task;
import nus.iss.tfip.workshop32.repository.TaskRepository;

@Service
public class TaskService implements MyConstants {

    @Autowired
    private TaskRepository taskRepo;

    public String saveTaskList(List<Task> taskList) {
        List<Document> docList = new LinkedList<>();
        for (Task task : taskList) {
            Document doc = new Document()
                    .append(FIELD_DESCRIPTION, task.getDescription())
                    .append(FIELD_PRIORITY, task.getPriority())
                    .append(FIELD_DUEDATE, task.getDueDate());
            docList.add(doc);
        }
        Document doc = new Document("tasks", docList);

        Document response = taskRepo.saveTaskList(doc);
        return response.getObjectId("_id").toHexString();
    }
}
