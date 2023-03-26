package nus.iss.tfip.workshop32.repository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import nus.iss.tfip.workshop32.MyConstants;

@Repository
public class TaskRepository implements MyConstants {

    @Autowired
    private MongoTemplate template;

    public Document saveTaskList(Document docList) {
        return template.insert(docList, COLLECTION_TASKLISTS);
    }

}
