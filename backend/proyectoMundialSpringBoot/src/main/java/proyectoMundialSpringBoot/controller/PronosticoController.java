package proyectoMundialSpringBoot.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyectoMundialSpringBoot.pronostico.DatosRegistroPronostico;
import proyectoMundialSpringBoot.pronostico.Pronostico;
import proyectoMundialSpringBoot.pronostico.PronosticoService;

import java.util.List;

@RestController
@RequestMapping("/pronosticos")
@CrossOrigin(origins = "http://localhost:3000")
public class PronosticoController {

    private final PronosticoService pronosticoService;

    public PronosticoController(PronosticoService pronosticoService) {
        this.pronosticoService = pronosticoService;
    }

    @PostMapping
    public ResponseEntity registrar(
            @RequestBody DatosRegistroPronostico datos) {

        return ResponseEntity.ok(
                pronosticoService.registrar(datos));
    }

    @GetMapping("/partido/{partidoId}")
    public ResponseEntity<List<Pronostico>> listarPorPartido(
            @PathVariable Long partidoId) {

        return ResponseEntity.ok(
                pronosticoService.listarPorPartido(partidoId));
    }

    @PostMapping("/calificar/{partidoId}")
    public ResponseEntity<String> calificarPartido(
            @PathVariable Long partidoId) {

        pronosticoService.calificarPartido(partidoId);

        return ResponseEntity.ok("Partido calificado correctamente");
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Pronostico>> listarPorUsuario(
            @PathVariable Long usuarioId) {

        return ResponseEntity.ok(
                pronosticoService.listarPorUsuario(usuarioId));
    }
}
