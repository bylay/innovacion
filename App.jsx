import React, { useState } from 'react';
import DashboardEquipo from './DashboardEquipo';
import FormularioSeguridad from './FormularioSeguridad';
import EstadoBodega from './EstadoBodega';

const App = () => {
  // Estado para controlar qué pestaña está viendo el técnico
  const [vistaActual, setVistaActual] = useState('telemetria');

  return (
    <div style={styles.appContainer}>
      {/* Marco que simula la pantalla de una tablet industrial */}
      <div style={styles.tabletFrame}>
        
        {/* Barra de Navegación */}
        <nav style={styles.navBar}>
          <button 
            onClick={() => setVistaActual('telemetria')} 
            style={vistaActual === 'telemetria' ? styles.activeTab : styles.tab}
          >
            📊 Telemetría
          </button>
          <button 
            onClick={() => setVistaActual('seguridad')} 
            style={vistaActual === 'seguridad' ? styles.activeTab : styles.tab}
          >
            🛡️ Seguridad (ART)
          </button>
          <button 
            onClick={() => setVistaActual('bodega')} 
            style={vistaActual === 'bodega' ? styles.activeTab : styles.tab}
          >
            📦 Pañol / Kitting
          </button>
        </nav>

        {/* Contenido Dinámico según la pestaña seleccionada */}
        <div style={styles.content}>
          {vistaActual === 'telemetria' && <DashboardEquipo />}
          {vistaActual === 'seguridad' && <FormularioSeguridad />}
          {vistaActual === 'bodega' && <EstadoBodega />}
        </div>

      </div>
    </div>
  );
};

// Estilos para darle aspecto de tablet y aplicación móvil
const styles = {
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#343a40', // Fondo oscuro de fondo de pantalla
    fontFamily: 'system-ui, sans-serif'
  },
  tabletFrame: {
    width: '100%',
    maxWidth: '800px',
    height: '90vh',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  navBar: {
    display: 'flex',
    backgroundColor: '#212529',
    padding: '10px'
  },
  tab: {
    flex: 1,
    padding: '15px',
    backgroundColor: 'transparent',
    color: '#adb5bd',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s'
  },
  activeTab: {
    flex: 1,
    padding: '15px',
    backgroundColor: '#495057',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    overflowY: 'auto', // Permite hacer scroll si el contenido es muy largo
    backgroundColor: '#f8f9fa'
  }
};

export default App;