import { useEffect, useState } from "react";

export function Ranking() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/usuarios")
            .then(response => response.json())
            .then(data => {

                setUsuarios(data.content);

            });

    }, []);

    return (

        <div className="container">

            <h2>🏆 Ranking General</h2>

            <table className="table">

                <thead>

                    <tr>
                        <th>Posición</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                    </tr>

                </thead>

                <tbody>

                    {usuarios.map((usuario, index) => (

                        <tr key={usuario.id}>

                            <td>{index + 1}</td>

                            <td>{usuario.nombre}</td>

                            <td>{usuario.puntos}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}