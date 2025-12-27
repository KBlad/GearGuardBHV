package vhb.erp_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vhb.erp_system.entity.Equipment;
import vhb.erp_system.entity.MaintenanceRequest;
import vhb.erp_system.model.enums.RequestType;
import vhb.erp_system.model.enums.Stage;
import vhb.erp_system.repository.EquipmentRepository;
import vhb.erp_system.repository.RequestRepository;
import vhb.erp_system.service.MaintenanceService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*") // Allow React to access this
public class MaintenanceController {

    @Autowired
    private MaintenanceService service;
    @Autowired private EquipmentRepository equipmentRepo;
    @Autowired private RequestRepository requestRepo;

    // 1. For the KANBAN BOARD [cite: 53]
    @GetMapping("/requests")
    public List<MaintenanceRequest> getAllRequests() {
        return requestRepo.findAll();
    }

    // 2. For DRAG & DROP (Updating Stage) [cite: 57]
    @PatchMapping("/requests/{id}/stage")
    public MaintenanceRequest updateStage(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return service.updateStage(id, Stage.valueOf(payload.get("stage")));
    }

    // 3. For the CALENDAR (Preventive only) [cite: 62]
    @GetMapping("/requests/calendar")
    public List<MaintenanceRequest> getCalendarRequests() {
        return requestRepo.findByType(RequestType.PREVENTIVE);
    }

    // 4. For the EQUIPMENT FORM (Auto-fill support) [cite: 41]
    // Frontend calls this when user selects equipment in the dropdown
    @GetMapping("/equipment/{id}")
    public Equipment getEquipmentDetails(@PathVariable Long id) {
        return equipmentRepo.findById(id).orElseThrow();
    }
}
