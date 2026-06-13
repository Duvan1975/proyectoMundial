package proyectoMundialSpringBoot.fase;

import jakarta.validation.constraints.NotNull;

public record DatosRegistroFase(

        @NotNull(message = "El nombre no debe estar vacío")
        String nombre
) {
}
