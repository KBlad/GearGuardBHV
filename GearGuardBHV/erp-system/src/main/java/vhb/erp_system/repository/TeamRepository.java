package vhb.erp_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vhb.erp_system.entity.MaintenanceTeam;

@Repository
public interface TeamRepository extends JpaRepository<MaintenanceTeam, Long> {
}
