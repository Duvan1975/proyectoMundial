package proyectoMundialSpringBoot.infra.errores;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class TratadorDeErrores {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<DatosError> tratarRuntimeException(
            RuntimeException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new DatosError(
                                LocalDateTime.now(),
                                400,
                                ex.getMessage()
                        )
                );
    }
}
