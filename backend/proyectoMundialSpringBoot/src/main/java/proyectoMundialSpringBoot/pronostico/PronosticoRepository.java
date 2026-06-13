package proyectoMundialSpringBoot.pronostico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PronosticoRepository extends JpaRepository<Pronostico, Long> {

    boolean existsByUsuarioIdAndPartidoId(
            Long usuarioId,
            Long partidoId);

    List<Pronostico> findByPartidoId(Long partidoId);

    @Query("""
    SELECT COALESCE(SUM(p.puntosObtenidos), 0)
    FROM Pronostico p
    WHERE p.usuario.id = :usuarioId
        """)
    Integer obtenerPuntosTotalesUsuario(Long usuarioId);

    List<Pronostico> findByUsuarioId(Long usuarioId);
}
