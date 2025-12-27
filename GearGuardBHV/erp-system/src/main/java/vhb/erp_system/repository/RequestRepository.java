package vhb.erp_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vhb.erp_system.entity.MaintenanceRequest;
import vhb.erp_system.model.enums.RequestType;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<MaintenanceRequest, Long> {

    List<MaintenanceRequest> findByType(RequestType type);
}
