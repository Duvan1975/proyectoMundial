package proyectoMundialSpringBoot.partido;

import java.time.LocalDateTime;

public record DatosListadoPartidos(
        Long id,
        String equipoLocal,
        String equipoVisitante,
        LocalDateTime fechaPartido,
        Integer golesLocal,
        Integer golesVisitante,
        Boolean finalizado,
        String faseNombre,
        Boolean habilitadoPronostico
) {
    public DatosListadoPartidos(Partido partido) {
        this(
                partido.getId(),
                partido.getEquipoLocal(),
                partido.getEquipoVisitante(),
                partido.getFechaPartido(),
                partido.getGolesLocal(),
                partido.getGolesVisitante(),
                partido.getFinalizado(),
                partido.getFase() != null ? partido.getFase().getNombre() : "Sin fase",
                partido.getHabilitadoPronostico()
        );
    }
}
