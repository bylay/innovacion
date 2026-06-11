import React, { useEffect } from 'react';
import { useOfflineDatabase } from './useOfflineDatabase';

const FormularioSeguridad = () => {
  // Consumimos el estado y las acciones de nuestra base de datos local
  const { 
    db, 
    firmarSeguridadTecnico, 
    validarSupervisorRemoto, 
    solicitarKitting 
  } = useOfflineDatabase();

  const { seguridad_epermit, orden_trabajo } = db;
  const isBloqueado = orden_trabajo.estado_actual === 'pendiente_seguridad';

  // Efecto para automatizar la solicitud a bodega (Kitting)
  // Se dispara cuando el supervisor valida remotamente
  useEffect(() => {
    if (seguridad_epermit.validacion_remota_supervisor && orden_trabajo.kitting_bodega.estado_solicitud === 'no_enviado') {
      solicitarKitting();
      alert("✅ E-Permit aprobado. Alerta enviada automáticamente al Pañol Inteligente para preparación de Kit.");
    }
  }, [seguridad_epermit.validacion_remota_supervisor, orden_trabajo.kitting_bodega.estado_solicitud, solicitarKitting]);

  const handleFirmaTecnico = () => {
    firmarSeguridadTecnico();
  };

  const handleValidacionSupervisor = () => {
    validarSupervisorRemoto();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Pauta Digital de Seguridad (ART)</h2>
        {isBloqueado ? (
          <span style={styles.badgeDanger}>TAREA BLOQUEADA</span>
        ) : (
          <span style={styles.badgeSuccess}>TAREA DESBLOQUEADA</span>
        )}
      </header>

      <div style={styles.card}>
        <p><strong>Operario:</strong> {db.usuario_actual.nombre} - {db.usuario_actual.id}</p>
        <p><strong>Equipo:</strong> {orden_trabajo.equipo}</p>
        <hr />

        <div style={styles.checklist}>
          <h4>Checklist Crítico</h4>
          <label style={styles.checkItem}>
            <input type="checkbox" checked={seguridad_epermit.firma_tecnico} readOnly />
            1. Verificación de EPP completo y en buen estado.
          </label>
          <label style={styles.checkItem}>
            <input type="checkbox" checked={seguridad_epermit.firma_tecnico} readOnly />
            2. Área de trabajo delimitada y despejada.
          </label>
          <label style={styles.checkItem}>
            <input type="checkbox" checked={seguridad_epermit.firma_tecnico} readOnly />
            3. Herramientas aisladas y desenergización confirmada.
          </label>
        </div>

        {/* Botones de Acción */}
        <div style={styles.actions}>
          <button 
            style={{...styles.btn, backgroundColor: seguridad_epermit.firma_tecnico ? '#6c757d' : '#007bff'}}
            onClick={handleFirmaTecnico}
            disabled={seguridad_epermit.firma_tecnico}
          >
            {seguridad_epermit.firma_tecnico ? '✅ Firmado por Técnico' : '✍️ Firmar ART (Biometría)'}
          </button>

          <button 
            style={{
              ...styles.btn, 
              backgroundColor: !seguridad_epermit.firma_tecnico || seguridad_epermit.validacion_remota_supervisor ? '#6c757d' : '#28a745'
            }}
            onClick={handleValidacionSupervisor}
            disabled={!seguridad_epermit.firma_tecnico || seguridad_epermit.validacion_remota_supervisor}
          >
            {seguridad_epermit.validacion_remota_supervisor ? '✅ Validado por Supervisor' : '📱 Simular Aprobación Remota Supervisor'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos básicos en línea
const styles = {
  container: { padding: '20px', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  badgeDanger: { backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' },
  badgeSuccess: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' },
  card: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  checklist: { margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' },
  checkItem: { fontSize: '16px', display: 'flex', gap: '10px', alignItems: 'center' },
  actions: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  btn: { padding: '15px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }
};

export default FormularioSeguridad;