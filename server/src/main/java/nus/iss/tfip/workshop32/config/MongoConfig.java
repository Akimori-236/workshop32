package nus.iss.tfip.workshop32.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import nus.iss.tfip.workshop32.MyConstants;

@Configuration
public class MongoConfig implements MyConstants {
    // get mongo URL from app.properties
    @Value("${mongo.url}")
    private String mongoUrl;

    @Bean
    public MongoTemplate createMongoTemplate() {
        // create client
        MongoClient client = MongoClients.create(mongoUrl);
        // return template with client and database (must be correct)
        return new MongoTemplate(client, DB_WORKSHOP32);
    }
}
