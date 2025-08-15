package com.emergencia.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergencia")
public class Emergencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_emergencia")
    private Integer idEmergencia;

    @NotNull
    @Column(name = "id_sala", nullable = false)
    private Integer idSala;

    @Column(name = "date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime data;

    // Construtores
    public Emergencia() {}

    public Emergencia(Integer idSala) {
        this.idSala = idSala;
        this.data = LocalDateTime.now();
    }

    public Emergencia(Integer idEmergencia, Integer idSala, LocalDateTime data) {
        this.idEmergencia = idEmergencia;
        this.idSala = idSala;
        this.data = data;
    }

    // Getters e Setters
    public Integer getIdEmergencia() {
        return idEmergencia;
    }

    public void setIdEmergencia(Integer idEmergencia) {
        this.idEmergencia = idEmergencia;
    }

    public Integer getIdSala() {
        return idSala;
    }

    public void setIdSala(Integer idSala) {
        this.idSala = idSala;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Emergencia{" +
                "idEmergencia=" + idEmergencia +
                ", idSala=" + idSala +
                ", data=" + data +
                '}';
    }
}
