package proyectoMundialSpringBoot.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import proyectoMundialSpringBoot.usuario.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuariosController {

    private final UsuarioService usuarioService;

    public UsuariosController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<DatosRespuestaUsuario> registrarUsuarios(
            @RequestBody @Valid DatosRegistroUsuario datos,
            UriComponentsBuilder uriComponentsBuilder) {

        return usuarioService.registrarUsuario(datos, uriComponentsBuilder);
    }

    @GetMapping
    public Page<DatosListadoUsuarios> listadoUsuarios(
            @PageableDefault(
                    size = 20,
                    sort = "puntos",
                    direction = Sort.Direction.DESC)
            Pageable paginacion) {

        return usuarioService.listarUsuarios(paginacion);
    }

    @PutMapping
    public ResponseEntity<DatosRespuestaUsuario> actualizarUsuario(
            @RequestBody @Valid DatosActualizarUsuarios datos) {
        return usuarioService.actualizarUsuario(datos);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(
            @RequestBody DatosLoginUsuario datos) {

        return ResponseEntity.ok(
                usuarioService.validarPin(datos)
        );
    }

    @PutMapping("/cambiar-pin")
    public ResponseEntity cambiarPin(
            @RequestBody DatosCambioPin datos) {

        usuarioService.cambiarPin(datos);

        return ResponseEntity.ok().build();
    }
}
