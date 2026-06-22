package proyectoMundialSpringBoot.usuario;

public record DatosRespuestaUsuario(
        Long id,
        String nombre,
        Integer puntos,
        String pin,
        Integer posicionAnterior
) {
}
