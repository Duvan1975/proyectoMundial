package proyectoMundialSpringBoot.partido;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PartidoRepository extends JpaRepository<Partido, Long> {

    List<Partido> findByHabilitadoPronosticoTrue();

    @Query("""
    SELECT p
    FROM Partido p
    WHERE p.habilitadoPronostico = true
    AND p.fechaPartido > CURRENT_TIMESTAMP
    AND p.id NOT IN (
        SELECT pr.partido.id
        FROM Pronostico pr
        WHERE pr.usuario.id = :usuarioId
    )
""")
    List<Partido> buscarPartidosDisponibles(Long usuarioId);
}
