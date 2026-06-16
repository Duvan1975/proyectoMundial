package proyectoMundialSpringBoot.partido;

import java.time.LocalDateTime;

public record DatosPartidoDisponible(

        Long id,

        String equipoLocal,

        String equipoVisitante,

        LocalDateTime fechaPartido,

        Integer pronosticoLocal,

        Integer pronosticoVisitante,

        Boolean yaPronosticado

) {
}
