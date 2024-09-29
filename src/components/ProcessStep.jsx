import React, { useState, useEffect } from 'react';
import '../../public/styles/ProcessStep.css';

const ProcessStep = ({ step, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(step.label);
  const [editedColor, setEditedColor] = useState(step.color);

  // Sync initial values when step changes
  useEffect(() => {
    setEditedLabel(step.label);
    setEditedColor(step.color);
  }, [step]);

  const handleEdit = () => {
    onEdit(step.id, editedLabel, editedColor);
    setIsEditing(false);
  };

  return (
    <div className="process-step">
      <div className="svg-container" style={{ backgroundColor: 'transparent' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: step.svgPath.replace(
              /<svg([^>]*)>/,
              `<svg width="200" height="200"$1 fill="url(#gradient)">`
            )
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}> {/* Center the label */}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
              style={{ marginBottom: '5px' }} // Add some margin for spacing
            />
            <input
              type="color"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              style={{ marginBottom: '5px' }} // Add some margin for spacing
            />
            <button onClick={handleEdit}>Save</button>
          </div>
        ) : (
          <div>
            <p style={{ color: editedColor, margin: '0' }}>{step.label}</p> {/* Display label here */}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
      <button onClick={() => onDelete(step.id)}>Delete</button>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: editedColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#fff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ProcessStep;
