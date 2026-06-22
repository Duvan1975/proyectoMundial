package proyectoMundialSpringBoot.infra.errores;

import java.time.LocalDateTime;

public record DatosError(

        LocalDateTime fecha,

        Integer status,

        String error
) {
}
