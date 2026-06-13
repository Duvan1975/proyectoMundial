package proyectoMundialSpringBoot.partido;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DatosActualizarPartido(

        @NotNull
        Long id,
        String equipoLocal,
        String equipoVisitante,
        LocalDateTime fechaPartido,
        Integer golesLocal,
        Integer golesVisitante,
        Boolean finalizado,
        Boolean habilitadoPronostico,

        Long faseId
) {
}
