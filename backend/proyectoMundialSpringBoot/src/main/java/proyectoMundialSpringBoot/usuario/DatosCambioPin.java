package proyectoMundialSpringBoot.usuario;

public record DatosCambioPin(

        Long usuarioId,
        String pinActual,
        String nuevoPin
) {
}
