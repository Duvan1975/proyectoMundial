package proyectoMundialSpringBoot.pronostico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PronosticoRepository extends JpaRepository<Pronostico, Long> {

    boolean existsByUsuarioIdAndPartidoId(
            Long usuarioId,
            Long partidoId);

    Optional<Pronostico> findByUsuarioIdAndPartidoId(
            Long usuarioId,
            Long partidoId);

    List<Pronostico> findByPartidoId(Long partidoId);

    @Query("""
    SELECT COALESCE(SUM(p.puntosObtenidos), 0)
    FROM Pronostico p
    WHERE p.usuario.id = :usuarioId
        """)
    Integer obtenerPuntosTotalesUsuario(Long usuarioId);

    Page<Pronostico> findByUsuarioId(
            Long usuarioId,
            Pageable pageable);

    Page<Pronostico> findByUsuarioIdOrderByPartidoIdDesc(
            Long usuarioId,
            Pageable pageable);
}
