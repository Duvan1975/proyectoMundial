package proyectoMundialSpringBoot.pronostico;

public record DatosRegistroPronostico(
        Long usuarioId,

        Long partidoId,

        Integer golesLocalPronosticado,

        Integer golesVisitantePronosticado
) {
}
