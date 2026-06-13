package proyectoMundialSpringBoot.fase;

public record DatosListadoFases(
        Long id,
        String nombre
) {
    public DatosListadoFases(Fase fase) {
        this(
                fase.getId(),
                fase.getNombre()
        );
    }
}
