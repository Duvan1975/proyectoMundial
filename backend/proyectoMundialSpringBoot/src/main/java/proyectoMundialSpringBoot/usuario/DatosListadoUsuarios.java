package proyectoMundialSpringBoot.usuario;

public record DatosListadoUsuarios(
        Long id,
        String nombre,
        Integer puntos
) {
    public DatosListadoUsuarios(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getPuntos()
        );
    }
}
