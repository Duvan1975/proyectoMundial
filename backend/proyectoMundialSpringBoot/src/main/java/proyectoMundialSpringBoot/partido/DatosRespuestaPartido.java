package proyectoMundialSpringBoot.partido;

import java.time.LocalDateTime;

public record DatosRespuestaPartido(

        Long id,
        String equipoLocal,
        String equipoVisitante,
        LocalDateTime fechaPartido,
        Integer golesLocal,
        Integer golesVisitante,
        Boolean finalizado,
        DatosFaseResumen fase,
        Boolean habilitadoPronostico
) {
    public record DatosFaseResumen(
            Long id,
            String nombre
    ) {

    }
}
