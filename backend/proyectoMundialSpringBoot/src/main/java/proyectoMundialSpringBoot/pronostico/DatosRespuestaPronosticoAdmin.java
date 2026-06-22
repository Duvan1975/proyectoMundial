package proyectoMundialSpringBoot.pronostico;

public record DatosRespuestaPronosticoAdmin(

        Long id,
        String nombreUsuario,
        String equipoLocal,
        String equipoVisitante,
        Integer golesLocalPronosticado,
        Integer golesVisitantePronosticado
) {
}
