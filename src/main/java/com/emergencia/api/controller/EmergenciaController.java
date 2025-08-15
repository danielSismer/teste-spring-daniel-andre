package com.emergencia.api.controller;

import com.emergencia.api.model.Emergencia;
import com.emergencia.api.service.EmergenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/emergencias")
@CrossOrigin(origins = "*") // Permite CORS para o Node-RED
public class EmergenciaController {

    @Autowired
    private EmergenciaService emergenciaService;

    // POST - Criar nova emergência
    @PostMapping
    public ResponseEntity<Emergencia> criarEmergencia(@Valid @RequestBody Emergencia emergencia) {
        Emergencia novaEmergencia = emergenciaService.criarEmergencia(emergencia);
        return new ResponseEntity<>(novaEmergencia, HttpStatus.CREATED);
    }

    // GET - Buscar todas as emergências
    @GetMapping
    public ResponseEntity<List<Emergencia>> buscarTodasEmergencias() {
        List<Emergencia> emergencias = emergenciaService.buscarTodasEmergencias();
        return ResponseEntity.ok(emergencias);
    }

    // GET - Buscar emergência por ID
    @GetMapping("/{id}")
    public ResponseEntity<Emergencia> buscarEmergenciaPorId(@PathVariable Integer id) {
        Optional<Emergencia> emergencia = emergenciaService.buscarEmergenciaPorId(id);
        return emergencia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET - Buscar emergências por sala
    @GetMapping("/sala/{idSala}")
    public ResponseEntity<List<Emergencia>> buscarEmergenciasPorSala(@PathVariable Integer idSala) {
        List<Emergencia> emergencias = emergenciaService.buscarEmergenciasPorSala(idSala);
        return ResponseEntity.ok(emergencias);
    }

    // GET - Buscar emergências por período
    @GetMapping("/periodo")
    public ResponseEntity<List<Emergencia>> buscarEmergenciasPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataFim) {
        List<Emergencia> emergencias = emergenciaService.buscarEmergenciasPorPeriodo(dataInicio, dataFim);
        return ResponseEntity.ok(emergencias);
    }

    // GET - Buscar emergências recentes (últimas 24 horas)
    @GetMapping("/recentes")
    public ResponseEntity<List<Emergencia>> buscarEmergenciasRecentes() {
        List<Emergencia> emergencias = emergenciaService.buscarEmergenciasRecentes();
        return ResponseEntity.ok(emergencias);
    }

    // PUT - Atualizar emergência
    @PutMapping("/{id}")
    public ResponseEntity<Emergencia> atualizarEmergencia(
            @PathVariable Integer id, 
            @Valid @RequestBody Emergencia emergenciaAtualizada) {
        Optional<Emergencia> emergencia = emergenciaService.atualizarEmergencia(id, emergenciaAtualizada);
        return emergencia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Deletar emergência
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmergencia(@PathVariable Integer id) {
        boolean deletado = emergenciaService.deletarEmergencia(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // GET - Contar emergências por sala
    @GetMapping("/sala/{idSala}/contagem")
    public ResponseEntity<Long> contarEmergenciasPorSala(@PathVariable Integer idSala) {
        long contagem = emergenciaService.contarEmergenciasPorSala(idSala);
        return ResponseEntity.ok(contagem);
    }

    // GET - Buscar última emergência por sala
    @GetMapping("/sala/{idSala}/ultima")
    public ResponseEntity<List<Emergencia>> buscarUltimaEmergenciaPorSala(@PathVariable Integer idSala) {
        List<Emergencia> emergencias = emergenciaService.buscarUltimaEmergenciaPorSala(idSala);
        return ResponseEntity.ok(emergencias);
    }

    // GET - Health check para o Node-RED
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("API de Emergências funcionando normalmente!");
    }
}
