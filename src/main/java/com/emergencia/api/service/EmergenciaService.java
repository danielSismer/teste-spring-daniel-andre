package com.emergencia.api.service;

import com.emergencia.api.model.Emergencia;
import com.emergencia.api.repository.EmergenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmergenciaService {

    @Autowired
    private EmergenciaRepository emergenciaRepository;

    // Criar nova emergência
    public Emergencia criarEmergencia(Emergencia emergencia) {
        emergencia.setData(LocalDateTime.now());
        return emergenciaRepository.save(emergencia);
    }

    // Buscar todas as emergências
    public List<Emergencia> buscarTodasEmergencias() {
        return emergenciaRepository.findAll();
    }

    // Buscar emergência por ID
    public Optional<Emergencia> buscarEmergenciaPorId(Integer id) {
        return emergenciaRepository.findById(id);
    }

    // Buscar emergências por sala
    public List<Emergencia> buscarEmergenciasPorSala(Integer idSala) {
        return emergenciaRepository.findByIdSalaOrderByDataDesc(idSala);
    }

    // Buscar emergências por período
    public List<Emergencia> buscarEmergenciasPorPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim) {
        return emergenciaRepository.findByDataBetweenOrderByDataDesc(dataInicio, dataFim);
    }

    // Buscar emergências recentes (últimas 24 horas)
    public List<Emergencia> buscarEmergenciasRecentes() {
        LocalDateTime dataLimite = LocalDateTime.now().minusHours(24);
        return emergenciaRepository.findEmergenciasRecentes(dataLimite);
    }

    // Atualizar emergência
    public Optional<Emergencia> atualizarEmergencia(Integer id, Emergencia emergenciaAtualizada) {
        return emergenciaRepository.findById(id)
                .map(emergencia -> {
                    emergencia.setIdSala(emergenciaAtualizada.getIdSala());
                    emergencia.setData(emergenciaAtualizada.getData());
                    return emergenciaRepository.save(emergencia);
                });
    }

    // Deletar emergência
    public boolean deletarEmergencia(Integer id) {
        if (emergenciaRepository.existsById(id)) {
            emergenciaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Contar emergências por sala
    public long contarEmergenciasPorSala(Integer idSala) {
        return emergenciaRepository.countByIdSala(idSala);
    }

    // Buscar última emergência por sala
    public List<Emergencia> buscarUltimaEmergenciaPorSala(Integer idSala) {
        return emergenciaRepository.findUltimaEmergenciaPorSala(idSala);
    }
}
