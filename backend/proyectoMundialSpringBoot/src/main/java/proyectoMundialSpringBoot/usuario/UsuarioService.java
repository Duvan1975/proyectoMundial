package proyectoMundialSpringBoot.usuario;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired UsuarioRepository usuarioRepository;

    public ResponseEntity<DatosRespuestaUsuario> registrarUsuario(
            DatosRegistroUsuario datos, UriComponentsBuilder uriComponentsBuilder) {

        if (usuarioRepository.existsByNombre(datos.nombre())) {
            throw new RuntimeException("El nombre ingresado ya existe");
        }
        Usuario usuario = new Usuario(datos);
        usuarioRepository.save(usuario);

        var uri = uriComponentsBuilder.path(
                "/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();

        DatosRespuestaUsuario datosRespuestaUsuario = new DatosRespuestaUsuario(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getPuntos(),
                usuario.getPin(),
                usuario.getPosicionAnterior()
        );
        return ResponseEntity.created(uri).body(datosRespuestaUsuario);
    }

    public Page<DatosListadoUsuarios> listarUsuarios(Pageable paginacion) {
        return usuarioRepository
                .findAll(paginacion)
                .map(DatosListadoUsuarios::new);
    }

    @Transactional
    public ResponseEntity actualizarUsuario(DatosActualizarUsuarios datos) {
        Usuario usuario = usuarioRepository.getReferenceById(datos.id());
        usuario.actualizarDatos(datos);

        if (datos.nombre() != null) usuario.setNombre(datos.nombre());
        if (datos.puntos() != null) usuario.setPuntos(datos.puntos());

        return ResponseEntity.ok(new DatosRespuestaUsuario(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getPuntos(),
                usuario.getPin(),
                usuario.getPosicionAnterior()
        ));

    }

    public void eliminarUsuario(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con el id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public Boolean validarPin(
            DatosLoginUsuario datos) {

        Usuario usuario =
                usuarioRepository.findById(
                                datos.usuarioId())
                        .orElseThrow();

        return usuario.getPin()
                .equals(datos.pin());
    }

    @Transactional
    public void cambiarPin(
            DatosCambioPin datos) {

        Usuario usuario = usuarioRepository
                .findById(datos.usuarioId())
                .orElseThrow();

        if (datos.nuevoPin().length() != 4) {
            throw new RuntimeException(
                    "El PIN debe tener 4 dígitos");
        }

        if (!usuario.getPin()
                .equals(datos.pinActual())) {

            throw new RuntimeException(
                    "PIN actual incorrecto");
        }

        usuario.setPin(datos.nuevoPin());

    }

    @Transactional
    public void congelarRanking() {

        List<Usuario> usuarios =
                usuarioRepository
                        .findAllByOrderByPuntosDesc();

        for (int i = 0; i < usuarios.size(); i++) {

            usuarios.get(i)
                    .setPosicionAnterior(i + 1);
        }
    }
}
