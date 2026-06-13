package proyectoMundialSpringBoot.usuario;

import jakarta.validation.constraints.NotNull;

public record DatosActualizarUsuarios(
        @NotNull
        Long id,
        String nombre,
        Integer puntos
) {
}
