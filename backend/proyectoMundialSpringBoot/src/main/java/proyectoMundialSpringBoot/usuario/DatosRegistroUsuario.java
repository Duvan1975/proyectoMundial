package proyectoMundialSpringBoot.usuario;

import jakarta.validation.constraints.NotNull;

public record DatosRegistroUsuario(

        @NotNull(message = "El nombre no debe estar vacío")
        String nombre,
        //Integer puntos,
        String pin
) {
}
