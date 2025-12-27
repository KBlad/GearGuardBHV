package vhb.erp_system.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;

@Entity
@Data
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String serialNumber;
    private Boolean isUsable = true;


    @ManyToOne
    @JoinColumn(name = "team_id")
    private MaintenanceTeam maintenanceTeam;

    @Formula("(SELECT COUNT(r.id) FROM maintenance_request r WHERE r.equipment_id = id AND r.stage != 'REPAIRED' AND r.stage!='SCRAP')")
    private Integer openRequestCount;

    public void setIsUsable(boolean b) {
        this.isUsable = b;
    }
    public boolean getIsUsable(){
        return isUsable;
    }


    public MaintenanceTeam getMaintenanceTeam() {
        return maintenanceTeam;
    }

    public Long getId() {
        return id;
    }
}
