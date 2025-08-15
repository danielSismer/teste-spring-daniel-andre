package com.emergencia.api.repository;

import com.emergencia.api.model.Emergencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmergenciaRepository extends JpaRepository<Emergencia, Integer> {

    // Buscar emergências por sala
    List<Emergencia> findByIdSalaOrderByDataDesc(Integer idSala);

    // Buscar emergências por período
    List<Emergencia> findByDataBetweenOrderByDataDesc(LocalDateTime dataInicio, LocalDateTime dataFim);

    // Buscar emergências recentes (últimas 24 horas)
    @Query("SELECT e FROM Emergencia e WHERE e.data >= :dataLimite ORDER BY e.data DESC")
    List<Emergencia> findEmergenciasRecentes(@Param("dataLimite") LocalDateTime dataLimite);

    // Contar emergências por sala
    long countByIdSala(Integer idSala);

    // Buscar última emergência por sala
    @Query("SELECT e FROM Emergencia e WHERE e.idSala = :idSala ORDER BY e.data DESC")
    List<Emergencia> findUltimaEmergenciaPorSala(@Param("idSala") Integer idSala);
}
