package vhb.erp_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vhb.erp_system.entity.Equipment;
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment,Long> {
}
