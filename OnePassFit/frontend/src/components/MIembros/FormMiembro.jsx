import React, { useState, useEffect } from "react";
import {
  Stepper, Step, StepLabel, TextField, Switch, Button,
  Card, CardContent, CardActions, Typography, Box
} from "@mui/material";

const FormMiembro = ({ miembro, onRegistrado }) => {
  const [step, setStep] = useState(0);
  const [formDatosPersonales, setFormDatosPersonales] = useState(false);
  const [formDatosContacto, setFormDatosContacto] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);

  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    edad: ""
  });

  const [datosContacto, setDatosContacto] = useState({
    sufreEnfermedad: false,
    enfermedad: "",
    tieneSeguro: false,
    institucion: "",
    nombreContacto: "",
    telefonoContacto: ""
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagen(file);

    const reader = new FileReader();
    reader.onload = (e) => setImagenUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const miembroRegistrado = {
      ...datosPersonales,
      ...datosContacto,
      imagen: imagenUrl
    };
    onRegistrado && onRegistrado(miembroRegistrado);
    console.log("🧾 Enviado:", miembroRegistrado);

    // Reset form
    setDatosPersonales({ nombre: "", telefono: "", direccion: "", edad: "" });
    setDatosContacto({
      sufreEnfermedad: false, enfermedad: "", tieneSeguro: false,
      institucion: "", nombreContacto: "", telefonoContacto: ""
    });
    setImagen(null);
    setImagenUrl(null);
    setStep(0);
  };

  useEffect(() => {
    if (miembro) {
      setDatosPersonales({
        nombre: miembro.datosPersonales?.nombre || "",
        telefono: miembro.datosPersonales?.telefono || "",
        direccion: miembro.datosPersonales?.direccion || "",
        edad: miembro.datosPersonales?.edad || ""
      });
      setDatosContacto({
        sufreEnfermedad: miembro.datosContacto?.sufreEnfermedad || false,
        enfermedad: miembro.datosContacto?.enfermedad || "",
        tieneSeguro: miembro.datosContacto?.tieneSeguro || false,
        institucion: miembro.datosContacto?.institucion || "",
        nombreContacto: miembro.datosContacto?.nombreContacto || "",
        telefonoContacto: miembro.datosContacto?.telefonoContacto || ""
      });
      setImagenUrl(miembro.imagen || "");
    }
  }, [miembro]);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>Datos personales</StepLabel>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <TextField label="Nombre completo" fullWidth margin="normal"
                value={datosPersonales.nombre}
                onChange={(e) => setDatosPersonales({ ...datosPersonales, nombre: e.target.value })}
              />
              <TextField label="Teléfono" fullWidth margin="normal"
                value={datosPersonales.telefono}
                onChange={(e) => setDatosPersonales({ ...datosPersonales, telefono: e.target.value })}
              />
              <TextField label="Dirección" fullWidth margin="normal"
                value={datosPersonales.direccion}
                onChange={(e) => setDatosPersonales({ ...datosPersonales, direccion: e.target.value })}
              />
              <TextField label="Edad" type="number" fullWidth margin="normal"
                value={datosPersonales.edad}
                onChange={(e) => setDatosPersonales({ ...datosPersonales, edad: e.target.value })}
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => setStep(1)} variant="contained">Continuar</Button>
            </CardActions>
          </Card>
        </Step>

        <Step>
          <StepLabel>Datos de contacto</StepLabel>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Switch
                checked={datosContacto.sufreEnfermedad}
                onChange={(e) => setDatosContacto({ ...datosContacto, sufreEnfermedad: e.target.checked })}
              /> ¿Sufre alguna enfermedad?
              {datosContacto.sufreEnfermedad && (
                <TextField label="Enfermedad" fullWidth margin="normal"
                  value={datosContacto.enfermedad}
                  onChange={(e) => setDatosContacto({ ...datosContacto, enfermedad: e.target.value })}
                />
              )}
              <Switch
                checked={datosContacto.tieneSeguro}
                onChange={(e) => setDatosContacto({ ...datosContacto, tieneSeguro: e.target.checked })}
              /> ¿Tiene seguro?
              {datosContacto.tieneSeguro && (
                <TextField label="Institución" fullWidth margin="normal"
                  value={datosContacto.institucion}
                  onChange={(e) => setDatosContacto({ ...datosContacto, institucion: e.target.value })}
                />
              )}
              <TextField label="Nombre de contacto" fullWidth margin="normal"
                value={datosContacto.nombreContacto}
                onChange={(e) => setDatosContacto({ ...datosContacto, nombreContacto: e.target.value })}
              />
              <TextField label="Teléfono contacto" fullWidth margin="normal"
                value={datosContacto.telefonoContacto}
                onChange={(e) => setDatosContacto({ ...datosContacto, telefonoContacto: e.target.value })}
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => setStep(2)} variant="contained">Continuar</Button>
              <Button onClick={() => setStep(0)}>Regresar</Button>
            </CardActions>
          </Card>
        </Step>

        <Step>
          <StepLabel>Foto</StepLabel>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <input type="file" accept="image/*" onChange={handleImage} />
              {imagenUrl && (
                <Box mt={2}>
                  <img src={imagenUrl} alt="Preview" width="300" />
                </Box>
              )}
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleSubmit}>Registrar</Button>
              <Button onClick={() => setStep(1)}>Regresar</Button>
            </CardActions>
          </Card>
        </Step>
      </Stepper>
    </Box>
  );
};

export default FormMiembro;
