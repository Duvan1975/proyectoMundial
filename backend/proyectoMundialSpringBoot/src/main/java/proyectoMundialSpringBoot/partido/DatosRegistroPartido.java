package proyectoMundialSpringBoot.partido;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DatosRegistroPartido(

        @NotNull(message = "Debe registrar el equipo local")
        String equipoLocal,

        @NotNull(message = "Debe registrar el equipo visitante")
        String equipoVisitante,

        LocalDateTime fechaPartido,
        Integer golesLocal,
        Integer golesVisitante,
        Boolean finalizado,
        Boolean habilitadoPronostico,

        @NotNull(message = "Debe especificar la fase del partido")
        Long faseId
) {
}
