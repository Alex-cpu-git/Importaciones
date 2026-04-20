import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud, FiLoader } from 'react-icons/fi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../core/firebase/config';
import type { Machine } from '../types';
import './MachineryModal.css';

interface MachineryModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: Machine | null;
  onSave: (machine: Machine) => void;
}

export default function MachineryModal({ isOpen, onClose, machine, onSave }: MachineryModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Machine>({
    id: '',
    name: '',
    brand: '',
    type: '',
    year: new Date().getFullYear(),
    status: 'En Stock',
    price: 0,
    stock: 0,
    imageUrl: '',
    imageUrls: [],
  });

  useEffect(() => {
    if (machine) {
      setFormData({
        ...machine,
        imageUrls: machine.imageUrls || (machine.imageUrl ? [machine.imageUrl] : []),
      });
    } else {
      setFormData({
        id: `MQ-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: '',
        brand: '',
        type: '',
        year: new Date().getFullYear(),
        status: 'En Stock',
        price: 0,
        stock: 0,
        imageUrl: '',
        imageUrls: [],
      });
    }
  }, [machine, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      try {
        setIsUploading(true);
        const uploadPromises = files.map(async (file) => {
          const storageRef = ref(storage, `machinery/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        });
        const urlArray = await Promise.all(uploadPromises);
        
        setFormData(prev => {
          const newUrls = [...(prev.imageUrls || []), ...urlArray];
          return {
            ...prev,
            imageUrl: prev.imageUrl || newUrls[0],
            imageUrls: newUrls
          };
        });
      } catch (error) {
        console.error("Error subiendo las fotos a Firebase:", error);
        alert("Ocurrió un error al subir las imágenes.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => {
      const newUrls = (prev.imageUrls || []).filter((_, i) => i !== indexToRemove);
      return {
        ...prev,
        imageUrl: newUrls.length > 0 ? newUrls[0] : '',
        imageUrls: newUrls
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="modal-header">
          <h2>{machine ? 'Editar Máquina' : 'Nueva Máquina'}</h2>
          <button className="close-btn" onClick={onClose}><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row image-upload-row">
            <div className="image-preview-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', minWidth: '100px' }}>
              {isUploading && (
                <div className="image-preview" style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '12px' }}>
                    <FiLoader size={24} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                  </div>
                </div>
              )}
              {(formData.imageUrls && formData.imageUrls.length > 0) ? (
                formData.imageUrls.map((url, i) => (
                  <div key={i} className="image-preview" style={{ position: 'relative' }}>
                    <img src={url} alt={`Preview ${i}`} />
                    <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '22px', height: '22px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', zIndex: 10 }}>&times;</button>
                  </div>
                ))
              ) : !isUploading ? (
                <div className="image-preview">
                  <div className="placeholder-image"><FiUploadCloud size={32} /></div>
                </div>
              ) : null}
            </div>
            <div className="form-group flex-1">
              <label>Imágenes del Equipo (puedes elegir varias)</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="file-input" />
              <small>Formatos soportados: JPG, PNG, WEBP.</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nombre / Modelo</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipo </label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Año de Fabricación</label>
              <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cantidad (Stock)</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="En Stock">En Stock</option>
                <option value="Importación">Importación</option>
                <option value="Reservado">Reservado</option>
              </select>
            </div>
          </div>

          <div className="features-section">
            <div className="features-header">
              <h3>Características Adicionales (Opcional)</h3>
              <button
                type="button"
                className="btn-add-feature"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  features: [...(prev.features || []), { key: '', value: '' }]
                }))}
              >
                + Agregar Característica
              </button>
            </div>

            <div className="features-list">
              {formData.features?.map((feature, index) => (
                <div className="feature-row" key={index}>
                  <input
                    type="text"
                    placeholder="Ej: Motor, Capacidad, Tracción..."
                    value={feature.key}
                    onChange={(e) => {
                      const newFeatures = [...(formData.features || [])];
                      newFeatures[index].key = e.target.value;
                      setFormData(prev => ({ ...prev, features: newFeatures }));
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Ej: V8 400HP, 3m³, 4x4..."
                    value={feature.value}
                    onChange={(e) => {
                      const newFeatures = [...(formData.features || [])];
                      newFeatures[index].value = e.target.value;
                      setFormData(prev => ({ ...prev, features: newFeatures }));
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="btn-remove-feature"
                    title="Eliminar característica"
                    onClick={() => {
                      const newFeatures = formData.features?.filter((_, i) => i !== index);
                      setFormData(prev => ({ ...prev, features: newFeatures }));
                    }}
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              {(!formData.features || formData.features.length === 0) && (
                <div className="empty-features-msg">
                  No hay características adicionales. Haz clic en "Agregar Característica" para añadir especificaciones técnicas.
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isUploading}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={isUploading}>
              {isUploading ? 'Procesando...' : 'Guardar Máquina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
