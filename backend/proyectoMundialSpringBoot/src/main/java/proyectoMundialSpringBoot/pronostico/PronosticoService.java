package proyectoMundialSpringBoot.pronostico;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyectoMundialSpringBoot.partido.Partido;
import proyectoMundialSpringBoot.partido.PartidoRepository;
import proyectoMundialSpringBoot.usuario.Usuario;
import proyectoMundialSpringBoot.usuario.UsuarioRepository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class PronosticoService {

    @Autowired
    private PronosticoRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PartidoRepository partidoRepository;

    public Pronostico registrar(
            DatosRegistroPronostico datos) {

        Usuario usuario =
                usuarioRepository.findById(datos.usuarioId())
                        .orElseThrow();

        Partido partido =
                partidoRepository.findById(datos.partidoId())
                        .orElseThrow();

        Pronostico pronostico = new Pronostico();

        pronostico.setUsuario(usuario);
        pronostico.setPartido(partido);
        pronostico.setGolesLocalPronosticado(
                datos.golesLocalPronosticado());
        pronostico.setGolesVisitantePronosticado(
                datos.golesVisitantePronosticado());

        if (repository.existsByUsuarioIdAndPartidoId(
                datos.usuarioId(),
                datos.partidoId())) {

            throw new RuntimeException(
                    "Ya existe un pronóstico para este partido");
        }

// En lugar de UTC, usa la zona horaria de Colombia
        /*if (LocalDateTime.now(ZoneId.of("America/Bogota"))
                .isAfter(partido.getFechaPartido())) {
            throw new RuntimeException("El partido ya inició. No se permiten más pronósticos.");
        }*/

        return repository.save(pronostico);
    }

    public List<Pronostico> listarPorPartido(Long partidoId) {

        return repository.findByPartidoId(partidoId);
    }

    private Integer calcularPuntos(Pronostico pronostico) {

        Partido partido = pronostico.getPartido();

        int realLocal = partido.getGolesLocal();
        int realVisitante = partido.getGolesVisitante();

        int pronLocal = pronostico.getGolesLocalPronosticado();
        int pronVisitante = pronostico.getGolesVisitantePronosticado();

        // Marcador exacto
        if (realLocal == pronLocal
                && realVisitante == pronVisitante) {

            return 10;
        }

        int puntos = 0;

        // Ganador o empate
        if ((realLocal > realVisitante && pronLocal > pronVisitante)
                || (realLocal < realVisitante && pronLocal < pronVisitante)
                || (realLocal == realVisitante && pronLocal == pronVisitante)) {

            puntos += 5;
        }

        // Diferencia de goles
        int diferenciaReal =
                realLocal - realVisitante;

        int diferenciaPronosticada =
                pronLocal - pronVisitante;

        // Solo evaluar diferencia cuando NO sea empate
        if (realLocal != realVisitante
                && diferenciaReal == diferenciaPronosticada) {

            puntos += 2;
        }

        return puntos;
    }

    @Transactional
    public void calificarPartido(Long partidoId) {

        List<Pronostico> pronosticos =
                repository.findByPartidoId(partidoId);

        for (Pronostico pronostico : pronosticos) {

            Integer puntos = calcularPuntos(pronostico);

            pronostico.setPuntosObtenidos(puntos);

            repository.save(pronostico);

            Usuario usuario = pronostico.getUsuario();

            Integer total =
                    repository.obtenerPuntosTotalesUsuario(
                            usuario.getId());

            usuario.setPuntos(total);

            usuarioRepository.save(usuario);
        }
    }

    public List<Pronostico> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }
}
