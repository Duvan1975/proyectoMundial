package proyectoMundialSpringBoot.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import proyectoMundialSpringBoot.fase.*;

@RestController
@RequestMapping("/fases")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://proyecto-mundial-one.vercel.app"
})
public class FaseController {

    private final FaseService faseService;

    public FaseController(FaseService faseService) {
        this.faseService = faseService;
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaFase> registrarFase(
            @RequestBody @Valid DatosRegistroFase datos,
            UriComponentsBuilder uriComponentsBuilder) {

        return faseService.registrarFase(datos, uriComponentsBuilder);
    }

    @GetMapping
    public Page<DatosListadoFases> listadoFases(
            @PageableDefault(size = 10, sort = "nombre") Pageable paginacion
    ) {
        return faseService.listarFases(paginacion);
    }

    @PutMapping
    public ResponseEntity<DatosRespuestaFase> actualizarFase(
            @RequestBody @Valid DatosActualizarFases datos) {
        return faseService.actualizarFase(datos);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFase(@PathVariable Long id) {
        faseService.eliminarFase(id);

        return ResponseEntity.noContent().build();
    }
}
