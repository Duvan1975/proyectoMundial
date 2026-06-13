package proyectoMundialSpringBoot.pronostico;

import jakarta.persistence.*;
import proyectoMundialSpringBoot.partido.Partido;
import proyectoMundialSpringBoot.usuario.Usuario;

@Entity
@Table(name = "pronosticos")
public class Pronostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer golesLocalPronosticado;

    private Integer golesVisitantePronosticado;

    private Integer puntosObtenidos;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido;

    public Pronostico() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGolesLocalPronosticado() {
        return golesLocalPronosticado;
    }

    public void setGolesLocalPronosticado(Integer golesLocalPronosticado) {
        this.golesLocalPronosticado = golesLocalPronosticado;
    }

    public Integer getGolesVisitantePronosticado() {
        return golesVisitantePronosticado;
    }

    public void setGolesVisitantePronosticado(Integer golesVisitantePronosticado) {
        this.golesVisitantePronosticado = golesVisitantePronosticado;
    }

    public Integer getPuntosObtenidos() {
        return puntosObtenidos;
    }

    public void setPuntosObtenidos(Integer puntosObtenidos) {
        this.puntosObtenidos = puntosObtenidos;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Partido getPartido() {
        return partido;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }
}
