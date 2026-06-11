import React, { useState } from 'react';
import { useOfflineDatabase } from './useOfflineDatabase';

const EstadoBodega = () => {
  const { db, resetDatabase } = useOfflineDatabase();
  const { kitting_bodega, equipo, id } = db.orden_trabajo;
  
  // Estado local simulado para que el profesor vea cómo la bodega "entrega" el pedido
  const [pedidoListo, setPedidoListo] = useState(false);

  // Determinar el color y mensaje de estado
  const isEnPreparacion = kitting_bodega.estado_solicitud === 'en_preparacion';
  const isNoEnviado = kitting_bodega.estado_solicitud === 'no_enviado';

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Pañol Inteligente - Estado de Kitting</h2>
      </header>

      <div style={styles.card}>
        <h3>Orden: {id} - {equipo}</h3>
        <hr />

        {/* Indicador visual del estado del pedido */}
        <div style={styles.statusBox}>
          {isNoEnviado && (
            <p style={{ color: '#6c757d', fontWeight: 'bold' }}>
              ⏳ Esperando aprobación de seguridad para enviar alerta a bodega...
            </p>
          )}
          
          {isEnPreparacion && !pedidoListo && (
            <p style={{ color: '#004085', fontWeight: 'bold' }}>
              ⚙️ Alerta recibida. Los bodegueros están preparando tu kit...
            </p>
          )}

          {pedidoListo && (
            <p style={{ color: '#155724', fontWeight: 'bold' }}>
              ✅ ¡Kit listo para retiro! Puedes pasar directamente a la ventanilla express.
            </p>
          )}
        </div>

        <div style={styles.itemsList}>
          <h4>Herramientas y Repuestos Asignados:</h4>
          <ul>
            {kitting_bodega.items_requeridos.map((item, index) => (
              <li key={index} style={styles.item}>
                📦 {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Botones de control para la presentación */}
        <div style={styles.actions}>
          <button 
            style={{...styles.btn, backgroundColor: isEnPreparacion && !pedidoListo ? '#28a745' : '#6c757d'}}
            disabled={!isEnPreparacion || pedidoListo}
            onClick={() => setPedidoListo(true)}
          >
            {pedidoListo ? 'Entregado' : 'Simular: Bodega finaliza preparación'}
          </button>

          <button 
            style={{...styles.btn, backgroundColor: '#dc3545', marginTop: '10px'}}
            onClick={resetDatabase}
          >
            🔄 Reiniciar Prototipo (Volver al estado inicial)
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos básicos
const styles = {
  container: { padding: '20px', fontFamily: 'system-ui, sans-serif' },
  header: { marginBottom: '20px' },
  card: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  statusBox: { padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px', textAlign: 'center', margin: '20px 0', fontSize: '18px' },
  itemsList: { margin: '20px 0' },
  item: { fontSize: '16px', padding: '5px 0' },
  actions: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  btn: { padding: '15px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }
};

export default EstadoBodega;