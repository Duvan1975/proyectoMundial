package proyectoMundialSpringBoot.pronostico;

public record DatosActualizarPronostico(

        Long usuarioId,

        Long partidoId,

        Integer golesLocalPronosticado,

        Integer golesVisitantePronosticado
) {
}
