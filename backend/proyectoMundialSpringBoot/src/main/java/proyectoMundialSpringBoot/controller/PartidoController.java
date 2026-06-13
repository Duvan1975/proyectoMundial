package proyectoMundialSpringBoot.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import proyectoMundialSpringBoot.partido.*;

import java.util.List;

@RestController
@RequestMapping("/partidos")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://proyecto-mundial-one.vercel.app"
})
public class PartidoController {

    private final PartidoService partidoService;

    public PartidoController(PartidoService partidoService) {
        this.partidoService = partidoService;
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaPartido> registrarPartidos(
            @RequestBody @Valid DatosRegistroPartido datos,
            UriComponentsBuilder uriComponentsBuilder) {

        return partidoService.registrarPartido(datos, uriComponentsBuilder);
    }

    @GetMapping
    public Page<DatosListadoPartidos> listadoPartidos(
            @PageableDefault(size = 10, sort = "fechaPartido") Pageable paginacion
    ) {
        return partidoService.listarPartidos(paginacion);
    }

    @PutMapping
    public ResponseEntity<DatosRespuestaPartido> actualizarPartido(
            @RequestBody @Valid DatosActualizarPartido datos) {
        return partidoService.actualizarPartido(datos);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPartido(@PathVariable Long id) {
        partidoService.eliminarPartido(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/habilitados")
    public ResponseEntity<List<Partido>> listarHabilitados() {
        return ResponseEntity.ok(
                partidoService.listarPartidosHabilitados());
    }

    @GetMapping("/habilitados/{usuarioId}")
    public ResponseEntity<List<Partido>> listarDisponibles(
            @PathVariable Long usuarioId) {

        return ResponseEntity.ok(
                partidoService.listarPartidosDisponibles(usuarioId));
    }
}
