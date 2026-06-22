package proyectoMundialSpringBoot.usuario;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByNombre(
            @NotNull(message = "El nombre ya existe") String nombre);

    List<Usuario> findAllByOrderByPuntosDesc();


}
