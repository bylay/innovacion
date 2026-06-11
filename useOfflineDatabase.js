import { useState, useEffect } from 'react';

// Datos iniciales que simulan lo que vendría de un servidor
const initialState = {
  usuario_actual: {
    id: "TEC-001",
    nombre: "Roberto",
    rol: "Técnico Mantenedor"
  },
  orden_trabajo: {
    id: "OT-7489",
    equipo: "Camión de Extracción CAEX-05",
    estado_actual: "pendiente_seguridad", // Puede ser: pendiente_seguridad, en_proceso, finalizado
    telemetria: {
      temperatura_motor: 95,
      vibracion: "Anormal",
      alertas_iot: ["Falla sensor ABS trasero", "Presión neumático baja"]
    },
    kitting_bodega: {
      estado_solicitud: "no_enviado", // Puede ser: no_enviado, en_preparacion, listo_retiro
      items_requeridos: ["Kit Frenos CAEX", "Sensor ABS", "Torquímetro"]
    }
  },
  seguridad_epermit: {
    checklist_completo: false,
    firma_tecnico: false,
    validacion_remota_supervisor: false
  }
};

export const useOfflineDatabase = () => {
  // Inicializamos el estado buscando en localStorage, si no hay nada, usamos el initialState
  const [db, setDb] = useState(() => {
    const localData = localStorage.getItem('mineria_prototype_db');
    return localData ? JSON.parse(localData) : initialState;
  });

  // Cada vez que 'db' cambie, lo guardamos automáticamente en localStorage
  useEffect(() => {
    localStorage.setItem('mineria_prototype_db', JSON.stringify(db));
  }, [db]);

  // --- FUNCIONES PARA ACTUALIZAR EL ESTADO ---

  // 1. Marcar el checklist de seguridad y la firma del técnico
  const firmarSeguridadTecnico = () => {
    setDb(prev => ({
      ...prev,
      seguridad_epermit: {
        ...prev.seguridad_epermit,
        checklist_completo: true,
        firma_tecnico: true
      }
    }));
  };

  // 2. Simular la validación remota del supervisor (Desbloquea la OT)
  const validarSupervisorRemoto = () => {
    setDb(prev => ({
      ...prev,
      seguridad_epermit: {
        ...prev.seguridad_epermit,
        validacion_remota_supervisor: true
      },
      orden_trabajo: {
        ...prev.orden_trabajo,
        estado_actual: "en_proceso" // La tarea ya se puede iniciar
      }
    }));
  };

  // 3. Enviar alerta a bodega (Kitting automatizado)
  const solicitarKitting = () => {
    setDb(prev => ({
      ...prev,
      orden_trabajo: {
        ...prev.orden_trabajo,
        kitting_bodega: {
          ...prev.orden_trabajo.kitting_bodega,
          estado_solicitud: "en_preparacion"
        }
      }
    }));
  };

  // 4. Resetear la base de datos (Útil para reiniciar la presentación del prototipo)
  const resetDatabase = () => {
    setDb(initialState);
  };

  return {
    db,
    firmarSeguridadTecnico,
    validarSupervisorRemoto,
    solicitarKitting,
    resetDatabase
  };
};