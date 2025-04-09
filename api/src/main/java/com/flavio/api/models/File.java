package com.flavio.api.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String tipo; // MIME type (opcional, pero útil: "application/pdf", "image/png", etc.)
    private LocalDateTime fechaCreacion;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")  // Nombre de la columna en la tabla "archivo"
    private Project project;


    @Lob
    @Column(columnDefinition = "LONGBLOB") // MySQL para archivos pesados
    private byte[] contenido;

    // --- Getters y setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public byte[] getContenido() { return contenido; }
    public void setContenido(byte[] contenido) { this.contenido = contenido; }
}
