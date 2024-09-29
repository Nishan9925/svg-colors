import React, { useState, useEffect } from 'react';
import ProcessStep from './components/ProcessStep';
import AddNewStep from './components/AddNewStep'; 
import axios from 'axios'; 
import './App.css';

const App = () => {
  const [steps, setSteps] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get('/data.json'); // Ensure this path is correct
        setSteps(response.data); // Set state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSteps();
  }, []);

  const handleEditStep = (id, newLabel, newColor) => {
    const updatedSteps = steps.map(step => 
      step.id === id ? { ...step, label: newLabel, color: newColor } : step
    );
    setSteps(updatedSteps);
  };

  const handleDeleteStep = (id) => {
    const updatedSteps = steps.filter(step => step.id !== id);
    setSteps(updatedSteps);
  };

  const handleAddStep = (newLabel, newColor, svgContent) => {
    const newStep = {
      id: steps.length + 1,
      label: newLabel,
      color: newColor,
      svgPath: svgContent,
    };
    setSteps([...steps, newStep]);
    setIsAdding(false);
  };

  return (
    <div className="app">
      <div className="steps-container">
        {steps.map((step) => (
          <ProcessStep 
            key={step.id} 
            step={step}
            onEdit={handleEditStep}
            onDelete={handleDeleteStep}
          />
        ))}
        <div className="process-step add-step-container">
          <button onClick={() => setIsAdding(!isAdding)} className="add-button">
            {isAdding ? "Cancel" : "+"}
          </button>
        </div>
      </div>

      {isAdding && (
        <AddNewStep onAdd={handleAddStep} />
      )}
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from 'react';
// import ProcessStep from './components/ProcessStep';
// import AddNewStep from './components/AddNewStep'; 
// import axios from 'axios'; 
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './App.css';

// const App = () => {
//   const [steps, setSteps] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);

//   useEffect(() => {
//     const fetchSteps = async () => {
//       try {
//         const response = await axios.get('/data.json'); // Ensure this path is correct
//         setSteps(response.data); // Set state with the fetched data
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchSteps();
//   }, []);

//   const handleEditStep = (id, newLabel, newColor) => {
//     const updatedSteps = steps.map(step => 
//       step.id === id ? { ...step, label: newLabel, color: newColor } : step
//     );
//     setSteps(updatedSteps);
//   };

//   const handleDeleteStep = (id) => {
//     const updatedSteps = steps.filter(step => step.id !== id);
//     setSteps(updatedSteps);
//   };

//   const handleAddStep = (newLabel, newColor, svgContent) => {
//     const newStep = {
//       id: steps.length + 1,
//       label: newLabel,
//       color: newColor,
//       svgPath: svgContent,
//     };
//     setSteps([...steps, newStep]);
//     setIsAdding(false);
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return; // Dropped outside the list

//     const reorderedSteps = Array.from(steps);
//     const [movedStep] = reorderedSteps.splice(result.source.index, 1);
//     reorderedSteps.splice(result.destination.index, 0, movedStep);

//     setSteps(reorderedSteps);
//   };

//   return (
//     <div className="app">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="steps">
//           {(provided) => (
//             <div 
//               className="steps-container" 
//               ref={provided.innerRef} 
//               {...provided.droppableProps}
//             >
//               {steps.map((step, index) => (
//                 <Draggable key={step.id} draggableId={step.id.toString()} index={index}>
//                   {(provided) => (
//                     <div 
//                       ref={provided.innerRef} 
//                       {...provided.draggableProps} 
//                       {...provided.dragHandleProps}
//                     >
//                       <ProcessStep 
//                         step={step}
//                         onEdit={handleEditStep}
//                         onDelete={handleDeleteStep}
//                       />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//               <div className="process-step add-step-container">
//                 <button onClick={() => setIsAdding(!isAdding)} className="add-button">
//                   {isAdding ? "Cancel" : "+"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {isAdding && (
//         <AddNewStep onAdd={handleAddStep} />
//       )}
//     </div>
//   );
// };

// export default App;
