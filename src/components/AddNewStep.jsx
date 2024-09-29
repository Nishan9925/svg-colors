import React, { useState } from 'react';

const AddNewStep = ({ onAdd }) => {
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#000000');
  const [svgFile, setSvgFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (svgFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgContent = event.target.result;
        
        // Replace all fill attributes in the SVG content
        const updatedSvgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
        onAdd(label, color, updatedSvgContent);
      };
      reader.readAsText(svgFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Step Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <input
        type="file"
        accept=".svg"
        onChange={(e) => setSvgFile(e.target.files[0])}
        required
      />
      <button type="submit">Add Step</button>
    </form>
  );
};

export default AddNewStep;

