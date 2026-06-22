package proyectoMundialSpringBoot.usuario;

public record DatosListadoUsuarios(
        Long id,
        String nombre,
        String pin,
        Integer puntos
) {
    public DatosListadoUsuarios(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getPin(),
                usuario.getPuntos()
        );
    }
}
