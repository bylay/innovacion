import React from 'react';
import { useOfflineDatabase } from './useOfflineDatabase';

const DashboardEquipo = () => {
  // Consumimos nuestro motor de datos local
  const { db } = useOfflineDatabase();
  const { equipo, telemetria, estado_actual } = db.orden_trabajo;

  // Pequeña lógica para cambiar el color según la temperatura
  const tempColor = telemetria.temperatura_motor > 90 ? 'text-danger' : 'text-success';

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Copiloto F1 - Telemetría IoT</h2>
        <span style={styles.badge}>{estado_actual.replace('_', ' ').toUpperCase()}</span>
      </header>

      <div style={styles.card}>
        <h3>{equipo}</h3>
        <hr />
        
        <div style={styles.grid}>
          {/* Indicador de Temperatura */}
          <div style={styles.indicator}>
            <p>Temperatura del Motor</p>
            <h1 className={tempColor}>{telemetria.temperatura_motor}°C</h1>
          </div>

          {/* Indicador de Vibración */}
          <div style={styles.indicator}>
            <p>Estado de Vibración</p>
            <h1 style={{ color: telemetria.vibracion === 'Anormal' ? 'orange' : 'green' }}>
              {telemetria.vibracion}
            </h1>
          </div>
        </div>

        {/* Alertas Automáticas */}
        <div style={styles.alertSection}>
          <h4>⚠️ Alertas Preventivas</h4>
          <ul>
            {telemetria.alertas_iot.map((alerta, index) => (
              <li key={index} style={styles.alertItem}>
                {alerta}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Estilos básicos en línea (puedes pasarlos a tu hoja de estilos o usar Bootstrap/Tailwind)
const styles = {
  container: { padding: '20px', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  badge: { backgroundColor: '#ffd700', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' },
  card: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
  grid: { display: 'flex', justifyContent: 'space-around', margin: '20px 0' },
  indicator: { textAlign: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', width: '45%' },
  alertSection: { marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', borderLeft: '5px solid #ffecb5' },
  alertItem: { color: '#856404', fontWeight: 'bold' }
};

export default DashboardEquipo;