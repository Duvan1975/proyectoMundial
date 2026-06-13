package proyectoMundialSpringBoot.partido;

import jakarta.persistence.*;
import proyectoMundialSpringBoot.fase.Fase;

import java.time.LocalDateTime;

@Entity
@Table(name = "partidos")
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String equipoLocal;
    private String equipoVisitante;
    private LocalDateTime fechaPartido;
    private Integer golesLocal;
    private Integer golesVisitante;
    private Boolean finalizado;

    @ManyToOne
    @JoinColumn(name = "fase_id")
    private Fase fase;

    private Boolean habilitadoPronostico = false;

    public Partido(DatosRegistroPartido datos, Fase fase) {
        this.equipoLocal = datos.equipoLocal();
        this.equipoVisitante = datos.equipoVisitante();
        this.fechaPartido = datos.fechaPartido();
        this.golesLocal = datos.golesLocal();
        this.golesVisitante = datos.golesVisitante();
        this.finalizado = datos.finalizado() != null ? datos.finalizado() : false;
        this.fase = fase;
    }

    public Partido() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipoLocal() {
        return equipoLocal;
    }

    public void setEquipoLocal(String equipoLocal) {
        this.equipoLocal = equipoLocal;
    }

    public String getEquipoVisitante() {
        return equipoVisitante;
    }

    public void setEquipoVisitante(String equipoVisitante) {
        this.equipoVisitante = equipoVisitante;
    }

    public LocalDateTime getFechaPartido() {
        return fechaPartido;
    }

    public void setFechaPartido(LocalDateTime fechaPartido) {
        this.fechaPartido = fechaPartido;
    }

    public Integer getGolesLocal() {
        return golesLocal;
    }

    public void setGolesLocal(Integer golesLocal) {
        this.golesLocal = golesLocal;
    }

    public Integer getGolesVisitante() {
        return golesVisitante;
    }

    public void setGolesVisitante(Integer golesVisitante) {
        this.golesVisitante = golesVisitante;
    }

    public Boolean getFinalizado() {
        return finalizado;
    }

    public void setFinalizado(Boolean finalizado) {
        this.finalizado = finalizado;
    }

    public Fase getFase() {
        return fase;
    }

    public void setFase(Fase fase) {
        this.fase = fase;
    }

    public Boolean getHabilitadoPronostico() {
        return habilitadoPronostico;
    }

    public void setHabilitadoPronostico(Boolean habilitadoPronostico) {
        this.habilitadoPronostico = habilitadoPronostico;
    }

    public void actualizarDatos(DatosActualizarPartido datos) {

    }
}
