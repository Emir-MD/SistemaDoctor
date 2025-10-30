// src/components/SparklineComponent.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from '@mui/material';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const SparklineComponent = ({ etiquetas = [], valores = [], color = '#1976d2', titulo, subtitulo }) => {
  const data = etiquetas.map((etiqueta, index) => ({
    name: etiqueta,
    value: valores[index]
  }));

  return (
    <Card sx={{ mb: 4 }}>
      <Box sx={{ p: 2, backgroundColor: 'white', mx: 'auto' }}>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>
          {titulo}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 300 }}>
          {subtitulo}
        </Typography>

        <Table size="small" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              {etiquetas.map((label, i) => (
                <TableCell key={i}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {valores.map((val, i) => (
                <TableCell key={i}>{val}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SparklineComponent;
