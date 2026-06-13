package proyectoMundialSpringBoot.partido;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import proyectoMundialSpringBoot.fase.Fase;
import proyectoMundialSpringBoot.fase.FaseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PartidoService {

    @Autowired PartidoRepository partidoRepository;

    @Autowired FaseRepository faseRepository;

    public ResponseEntity<DatosRespuestaPartido> registrarPartido(
            DatosRegistroPartido datos, UriComponentsBuilder uriComponentsBuilder) {

        // Buscar la fase (manejar el caso que no exista)
        Fase fase = faseRepository.findById(datos.faseId())
                .orElseThrow(() -> new RuntimeException("Fase no encontrada con ID: " + datos.faseId()));

        Partido partido = new Partido(datos, fase);
        partidoRepository.save(partido);

        var uri = uriComponentsBuilder.path(
                "/partidos/{id}").buildAndExpand(partido.getId()).toUri();

        DatosRespuestaPartido datosRespuestaPartido = new DatosRespuestaPartido(
                partido.getId(),
                partido.getEquipoLocal(),
                partido.getEquipoVisitante(),
                partido.getFechaPartido(),
                partido.getGolesLocal(),
                partido.getGolesVisitante(),
                partido.getFinalizado(),
                new DatosRespuestaPartido.DatosFaseResumen(fase.getId(), fase.getNombre()),
                partido.getHabilitadoPronostico()
        );
        return ResponseEntity.created(uri).body(datosRespuestaPartido);
    }

    public Page<DatosListadoPartidos> listarPartidos(Pageable paginacion) {
        return partidoRepository
                .findAll(paginacion)
                .map(DatosListadoPartidos::new);
    }

    @Transactional
    public ResponseEntity<DatosRespuestaPartido> actualizarPartido(DatosActualizarPartido datos) {
        Partido partido = partidoRepository.findById(datos.id())
                .orElseThrow(() -> new RuntimeException("Partido no encontrado con ID: " + datos.id()));

        // Actualizar campo por campo
        Optional.ofNullable(datos.equipoLocal()).ifPresent(partido::setEquipoLocal);
        Optional.ofNullable(datos.equipoVisitante()).ifPresent(partido::setEquipoVisitante);
        Optional.ofNullable(datos.fechaPartido()).ifPresent(partido::setFechaPartido);
        Optional.ofNullable(datos.golesLocal()).ifPresent(partido::setGolesLocal);
        Optional.ofNullable(datos.golesVisitante()).ifPresent(partido::setGolesVisitante);
        Optional.ofNullable(datos.finalizado()).ifPresent(partido::setFinalizado);
        Optional.ofNullable(datos.habilitadoPronostico()).ifPresent(partido::setHabilitadoPronostico);

        // Actualizar fase si viene
        if (datos.faseId() != null) {
            Fase fase = faseRepository.findById(datos.faseId())
                    .orElseThrow(() -> new RuntimeException("Fase no encontrada con ID: " + datos.faseId()));
            partido.setFase(fase);
        }

        // Respuesta
        return ResponseEntity.ok(new DatosRespuestaPartido(
                partido.getId(),
                partido.getEquipoLocal(),
                partido.getEquipoVisitante(),
                partido.getFechaPartido(),
                partido.getGolesLocal(),
                partido.getGolesVisitante(),
                partido.getFinalizado(),
                partido.getFase() != null
                        ? new DatosRespuestaPartido.DatosFaseResumen(partido.getFase().getId(), partido.getFase().getNombre())
                        : null,
                partido.getHabilitadoPronostico()
        ));
    }

    public void eliminarPartido(Long id) {

        if (!partidoRepository.existsById(id)) {
            throw new RuntimeException("Partido no encontrado con el id: " + id);
        }
        partidoRepository.deleteById(id);
    }

    public List<Partido> listarPartidosHabilitados() {
        return partidoRepository.findByHabilitadoPronosticoTrue();
    }

    public List<Partido> listarPartidosDisponibles(Long usuarioId) {

        return partidoRepository.buscarPartidosDisponibles(usuarioId);
    }

}
