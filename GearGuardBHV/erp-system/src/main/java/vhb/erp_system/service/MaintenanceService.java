package vhb.erp_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vhb.erp_system.entity.Equipment;
import vhb.erp_system.entity.MaintenanceRequest;
import vhb.erp_system.model.enums.Stage;
import vhb.erp_system.repository.EquipmentRepository;
import vhb.erp_system.repository.RequestRepository;

@Service
public class MaintenanceService {
    @Autowired private RequestRepository requestRepo;
    @Autowired private EquipmentRepository equipmentRepo;

    public MaintenanceRequest createRequest(MaintenanceRequest req){
        if(req.getAssignedTeam() == null && req.getEquipment()!= null){
            Equipment eq = equipmentRepo.findById(req.getEquipment().getId()).orElseThrow();
            req.setAssignedTeam(eq.getMaintenanceTeam());
        }
        if (req.getEquipment() != null && req.getEquipment().getId() != null) {
            Equipment equipment = equipmentRepo.findById(req.getEquipment().getId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));

            // 1. Link the real equipment object
            req.setEquipment(equipment);

            // 2. Auto-assign the team (The "Magic")
            if (equipment.getMaintenanceTeam() != null) {
                req.setAssignedTeam(equipment.getMaintenanceTeam());
            }
        }
        if (req.getStage() == null) req.setStage(Stage.NEW);

        return requestRepo.save(req);
    }
    public MaintenanceRequest update(Long requestId, Stage newStage){
        MaintenanceRequest req;
        req = requestRepo.findById(requestId).orElseThrow();
        req.setStage(newStage);

        if(newStage == Stage.SCRAP){
            Equipment eq = req.getEquipment();
            if(eq!=null){
                eq.setIsUsable(false);
                equipmentRepo.save(eq);
            }
        }
        return requestRepo.save(req);
    }


    public MaintenanceRequest updateStage(Long id, Stage newStage) {
        MaintenanceRequest req = requestRepo.findById(id).orElseThrow();
        req.setStage(newStage);
        if (newStage == Stage.SCRAP) {
            Equipment eq = req.getEquipment();
            if (eq != null) {
                eq.setIsUsable(false);
                equipmentRepo.save(eq);
            }
        }
        return requestRepo.save(req);
    }
}

