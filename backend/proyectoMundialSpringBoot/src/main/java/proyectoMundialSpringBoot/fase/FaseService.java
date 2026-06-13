package proyectoMundialSpringBoot.fase;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class FaseService {

    @Autowired FaseRepository faseRepository;

    public ResponseEntity<DatosRespuestaFase> registrarFase(
            DatosRegistroFase datos, UriComponentsBuilder uriComponentsBuilder) {

        Fase fase = new Fase(datos);
        faseRepository.save(new Fase(datos));

        var uri = uriComponentsBuilder.path(
                "/fases/{id}").buildAndExpand(fase.getId()).toUri();

        DatosRespuestaFase datosRespuestaFase = new DatosRespuestaFase(
                fase.getId(),
                fase.getNombre()
        );
        return ResponseEntity.created(uri).body(datosRespuestaFase);
    }

    public Page<DatosListadoFases> listarFases(Pageable paginacion) {
        return faseRepository
                .findAll(paginacion)
                .map(DatosListadoFases::new);
    }

    @Transactional
    public ResponseEntity actualizarFase(DatosActualizarFases datos) {
        Fase fase = faseRepository.getReferenceById(datos.id());
        fase.actualizarDatos(datos);

        if (datos.nombre() != null) fase.setNombre(datos.nombre());

        return ResponseEntity.ok(new DatosRespuestaFase(
                fase.getId(),
                fase.getNombre()
        ));
    }

    public void eliminarFase(Long id) {

        if (!faseRepository.existsById(id)) {
            throw new RuntimeException("Fase no encontrada con el id: " + id);
        }
        faseRepository.deleteById(id);
    }
}
