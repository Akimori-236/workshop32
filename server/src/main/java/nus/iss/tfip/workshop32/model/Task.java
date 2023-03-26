package nus.iss.tfip.workshop32.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    private Integer index;
    private String description;
    private String priority;
    private Date dueDate;
}
