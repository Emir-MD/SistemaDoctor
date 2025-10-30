// CredencialMiembro.jsx sin Utiles - solo visual
import React, { useEffect } from 'react';
import Printd from 'printd';

const CredencialMiembro = ({ miembro, onImpreso }) => {
  const d = new Printd();

  const nombreGimnasio = localStorage.getItem('nombreGimnasio') || 'Gimnasio de Prueba';
  const logoGimnasio = localStorage.getItem('logoGimnasio') || 'https://via.placeholder.com/50';
  const telefonoGimnasio = localStorage.getItem('telefonoGimnasio') || '000-000-0000';
  const direccionGimnasio = localStorage.getItem('direccionGimnasio') || 'Dirección de prueba';

  const cssText = `
    .nav {
      margin-top: 10px;
      columns: 10px 2;
      column-gap: 0;
    }
    .credencial {
      padding: 10px;
      width: 300px;
      height: 400px;
      border: 1px solid black;
      text-align: center;
      float: left;
      background-image: linear-gradient(50deg, #c5d0fc 23.53%, #cbe0f2 23.53%, #cbe0f2 50%, #c5d0fc 50%, #c5d0fc 73.53%, #cbe0f2 73.53%, #cbe0f2 100%);
      background-size: 300px 400px;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .credencial > p {
      margin: 0 !important;
      padding: 0 !important;
    }
    .nombre {
      font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      font-size: 32px;
      letter-spacing: -3.6px;
      word-spacing: -1.4px;
      color: #0824A1;
      font-weight: 700;
    }
    .matricula {
      font-family: 'Courier New', Courier, monospace;
      font-size: 26px;
      letter-spacing: -1.2px;
      word-spacing: -5px;
      color: #7C6D7D;
      font-weight: 700;
      font-variant: small-caps;
    }
    .imagen {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      display: block;
    }
  `;

  useEffect(() => {
    const { contentWindow } = d.getIFrame();
    contentWindow.addEventListener('beforeprint', () => console.log('before print'));
    contentWindow.addEventListener('afterprint', () => console.log('after print'));

    setTimeout(() => d.print(document.getElementById('credencial'), [cssText]), 10);
    if (onImpreso) onImpreso(false);
  }, []);

  const urlImagen = (imagen) => imagen?.startsWith('http') ? imagen : `https://via.placeholder.com/80`;

  return (
    <div id="credencial">
      <div className="credencial">
        <div className="nav">
          <div>
            <img width="50" src={urlImagen(logoGimnasio)} alt="logo" />
          </div>
          <div>
            <b>{nombreGimnasio}</b>
            <p style={{ fontSize: '10px' }}>Tel: {telefonoGimnasio}, {direccionGimnasio}</p>
          </div>
        </div>
        <p className="nombre">{miembro.nombre}</p>
        <p className="matricula">{miembro.matricula}</p>
        <img className="imagen" src={urlImagen(miembro.imagen)} alt="miembro" />
        <p>Teléfono: <b>{miembro.telefono}</b></p>
        <p>Dirección: <b>{miembro.direccion}</b></p>
        <p>Miembro desde: <b>{miembro.fechaRegistro}</b></p>
      </div>
      <div className="credencial">
        <b>En caso de accidente, comunicarse con:</b>
        <p>Nombre: <b>{miembro.nombreContacto}</b></p>
        <p>Teléfono: <b>{miembro.telefonoContacto}</b></p>
        <p>Enfermedad(es): <b>{miembro.enfermedad}</b></p>
        <p>Tiene seguro en: <b>{miembro.institucion}</b></p>
        <br /><br /><br />
        <pre>Sistema para gimnasio por</pre>
        <img src={require('../assets/logo.png')} width="200" alt="logo" />
      </div>
    </div>
  );
};

export default CredencialMiembro;
