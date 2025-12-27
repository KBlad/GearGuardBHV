package vhb.erp_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Component;
import org.springframework.web.bind.annotation.RequestParam;
import vhb.erp_system.model.enums.RequestType;
import vhb.erp_system.model.enums.Stage;

import java.net.Authenticator;
import java.time.LocalDate;

public class MaintenanceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String description;

    @Enumerated(EnumType.STRING)
    private Stage stage = Stage.NEW;

    @Enumerated(EnumType.STRING)
    private RequestType type;

    private LocalDate scheduleDate;

    @ManyToOne
    private Equipment equipment;

    @ManyToOne
    @Getter
    @Setter
    private MaintenanceTeam assignedTeam;

    public Equipment getEquipment() {
        return equipment;
    }

    public MaintenanceTeam getAssignedTeam() {
        return assignedTeam;
    }

    public void setAssignedTeam(MaintenanceTeam maintenanceTeam) {
        this.assignedTeam = maintenanceTeam;
    }

    public void setStage(Stage newStage) {
        this.stage = newStage;
    }
}
