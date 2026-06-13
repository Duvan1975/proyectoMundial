package proyectoMundialSpringBoot.fase;

import jakarta.validation.constraints.NotNull;

public record DatosActualizarFases(
        @NotNull
        Long id,
        String nombre
) {
}
