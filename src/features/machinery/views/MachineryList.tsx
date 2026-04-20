import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiImage, FiEye, FiTrash2, FiTag, FiLayers, FiBox } from 'react-icons/fi';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../core/firebase/config';
import type { Machine } from '../types';
import MachineryModal from '../components/MachineryModal';
import MachineDetailModal from '../components/MachineDetailModal';
import './MachineryList.css';

export default function MachineryList() {
  const [machinery, setMachinery] = useState<Machine[]>([]);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [viewingMachine, setViewingMachine] = useState<Machine | null>(null);

  useEffect(() => {
    // Escuchar cambios en la base de datos de Firebase en tiempo real
    const q = query(collection(db, 'machines'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Machine));
      setMachinery(data);
      setFirebaseError(null); // Clear errors if successful
    }, (error: any) => {
      console.error("Error cargando inventario de Firebase:", error);
      setFirebaseError(error.message || "Error al conectar a Firebase. Revisa los permisos.");
    });

    return () => unsubscribe();
  }, []);

  const handleOpenModal = (machine: Machine | null = null) => {
    setEditingMachine(machine);
    setIsModalOpen(true);
  };

  const handleSaveMachine = async (savedMachine: Machine) => {
    try {
      if (editingMachine) {
        // Actualizar máquina existente
        await setDoc(doc(db, 'machines', savedMachine.id), { 
          ...savedMachine, 
          updatedAt: serverTimestamp() 
        }, { merge: true });
      } else {
        // Crear máquina nueva
        await setDoc(doc(db, 'machines', savedMachine.id), { 
          ...savedMachine, 
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("Hubo un error al guardar la máquina en la nube.");
    }
  };

  const handleDeleteMachine = async (item: Machine) => {
    if (window.confirm('🚨 ¿Estás seguro que deseas eliminar permanentemente esta máquina?\n\nEsta acción de administrador no se puede deshacer y se borrará de la nube.')) {
      try {
        await deleteDoc(doc(db, 'machines', item.id));
        
        const urlsToDelete = item.imageUrls?.length ? item.imageUrls : (item.imageUrl ? [item.imageUrl] : []);
        
        for (const url of urlsToDelete) {
          if (url && url.includes('firebasestorage.googleapis.com')) {
            try {
              const imageRef = ref(storage, url);
              await deleteObject(imageRef);
            } catch (storageError) {
              console.error(`Imagen falló al borrarse (${url}):`, storageError);
            }
          }
        }
      } catch (error) {
        console.error("Error eliminando máquina de Firebase:", error);
      }
    }
  };

  return (
    <div className="machinery-container">
      <header className="page-header flex-header">
        <div>
          <h1>Maquinarias</h1>
          <p>Catálogo e inventario de equipos pesados</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal(null)}>
          <FiPlus size={24} strokeWidth={3} /> Nueva Máquina
        </button>
      </header>

      <div className="toolbar glass">
        <div className="search-bar">
          <FiSearch className="icon" />
          <input type="text" placeholder="Buscar por modelo, marca o ID..." />
        </div>
        <button className="btn-secondary">
          <FiFilter /> Filtros
        </button>
      </div>

      {firebaseError && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '12px', margin: '1rem 0', border: '1px solid #f87171' }}>
          <strong>⚠️ Atención: Firebase ha denegado la conexión.</strong>
          <p style={{ marginTop: '0.5rem', fontFamily: 'monospace' }}>{firebaseError}</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Posible Solución: Ve a tu Consola de Firebase &rarr; Firestore Database &rarr; Reglas (Rules), y cambia la regla a: <strong>allow read, write: if true;</strong>
          </p>
        </div>
      )}

      <div className="machine-grid">
        {machinery.map(item => (
          <div className="machine-card glass" key={item.id} onClick={() => setViewingMachine(item)}>
            <div className="machine-card-img-wrapper">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="machine-card-img" />
              ) : (
                <div className="machine-card-img-placeholder"><FiImage size={40} /></div>
              )}
              <span className={`badge status-${item.status.toLowerCase().replace(' ', '')} floating-badge`}>
                {item.status}
              </span>
            </div>
            
            <div className="machine-card-content">
              <div className="machine-card-header">
                <h3 className="machine-name">{item.name}</h3>
                <span className="machine-brand">{item.brand} • {item.year}</span>
              </div>
              
              <div className="machine-card-details">
                <div className="machine-detail-row">
                  <div className="detail-left"><FiTag /> Código</div>
                  <div className="detail-right">{item.id}</div>
                </div>
                <div className="machine-detail-row">
                  <div className="detail-left"><FiLayers /> Segmento</div>
                  <div className="detail-right">{item.type}</div>
                </div>
                <div className="machine-detail-row" style={{ marginTop: '0.25rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--glass-border)' }}>
                  <div className="detail-left"><FiBox /> Inventario</div>
                  <div className="detail-right">
                    <span className={`stock-badge ${item.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                      {item.stock} {item.stock === 1 ? 'unidad' : 'unidades'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="machine-card-footer">
              <div className="fast-actions">
                <button className="btn-fast view" onClick={(e) => { e.stopPropagation(); setViewingMachine(item); }} title="Ver detalle completo">
                  <FiEye size={18} /> <span>Ver</span>
                </button>
                <button className="btn-fast edit" onClick={(e) => { e.stopPropagation(); handleOpenModal(item); }} title="Editar información">
                  <FiEdit2 size={18} /> <span>Editar</span>
                </button>
                <button className="btn-fast delete" onClick={(e) => { e.stopPropagation(); handleDeleteMachine(item); }} title="Eliminar registro">
                  <FiTrash2 size={18} /> <span>Borrar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MachineryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        machine={editingMachine}
        onSave={handleSaveMachine}
      />

      <MachineDetailModal 
        isOpen={!!viewingMachine}
        onClose={() => setViewingMachine(null)}
        machine={viewingMachine}
      />
    </div>
  );
}
