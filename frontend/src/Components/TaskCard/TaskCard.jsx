import React, { useRef, useEffect } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import './TaskCard.css';  // Asegúrate de tener estilos para el TaskCard

const ItemType = 'TASK';

const TaskCard = ({ task, onRequestDelete }) => {

    const ref = useRef(null); // Para hacer referencia al componente

    // Configuración de `useDrag` para el drag and drop
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemType,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Asegúrate de que el dragPreview esté configurado para mostrar el elemento tal cual
    useEffect(() => {
        if (preview && ref.current) {
            preview(ref.current);  // Esto establece el preview como el elemento mismo
        }
    }, [preview]);

    // Estilo del elemento mientras se está arrastrando
    const dragStyle = {
        opacity: 1,  // Garantizamos que se mantenga opaco
        cursor: 'move',  // Cambiar el cursor cuando el usuario esté arrastrando
        position: isDragging ? 'absolute' : 'relative', // Aseguramos la posición al arrastrar
    };

    return (
        <div
            ref={(node) => {
                drag(node); // Esto es necesario para el drag
                ref.current = node; // Referencia para el preview
            }}
            style={dragStyle}
            className='task-card'
        >
            <div className='task-card-header'>
                <h2>{task.content}</h2>
                <button className='kanban-button delete' onClick={onRequestDelete}>❌</button>
            </div>
            <p>Prioridad: {task.priority}</p>
            <p>Días estimados: {task.time}</p>
            <p>Asignado a: {task.assignedTo}</p>
        </div>
    );
};

export default TaskCard;
