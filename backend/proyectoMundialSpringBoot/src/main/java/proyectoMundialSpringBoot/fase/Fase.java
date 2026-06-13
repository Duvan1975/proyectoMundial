package proyectoMundialSpringBoot.fase;

import jakarta.persistence.*;

@Entity
@Table(name = "fases")
public class Fase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    public Fase(DatosRegistroFase datos) {
        this.nombre = datos.nombre();
    }

    public Fase() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void actualizarDatos(DatosActualizarFases datos) {

    }
}
