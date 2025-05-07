/**
 * Componente `ReportComponent` para generar un informe visual de estado del proyecto y exportarlo como PDF.
 * 
 * Este componente muestra un informe visual con gráficos de distribución y estado de tareas de un proyecto.
 * Los datos se toman desde el almacenamiento local (`localStorage`), y se genera un informe con gráficos tipo tarta
 * (Pie Chart) y de barras (Bar Chart) usando la librería `chart.js`. Además, proporciona la funcionalidad de exportar
 * el informe como un archivo PDF mediante la librería `jsPDF` y `html2canvas`.
 * 
 * @component
 * @example
 * Ejemplo de uso
 * <ReportComponent />
 * 
 * @returns {React.Element} El componente `ReportComponent` que renderiza un informe visual y permite exportarlo como PDF.
 */
import React from 'react';
import './ReportComponent.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ReportComponent = () => {
    
    // Recupera los datos del proyecto y las tareas del localStorage
    const project = JSON.parse(localStorage.getItem('project'));
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const progressTasks = JSON.parse(localStorage.getItem('progressTasks'));
    const revisionTasks = JSON.parse(localStorage.getItem('revisionTasks'));
    const doneTasks = JSON.parse(localStorage.getItem('doneTasks'));

    /**
     * Función para exportar el informe como un archivo PDF.
     * Utiliza `html2canvas` para capturar la imagen del reporte y `jsPDF` para generar el archivo PDF.
     */
    const exportPDF = async () => {
        const element = document.querySelector('.report-dashboard');
        element.style.backgroundColor = '#077ccf';  // Cambia el color de fondo
        element.style.overflow = 'visible';

        const button = document.querySelector('.download');
        button.style.visibility = 'hidden';  // Oculta el botón de descarga mientras se genera el PDF

        setTimeout(async () => {
            const canvas = await html2canvas(element, { scale: 2, useCORS: true });
            button.style.visibility = 'visible';  // Muestra nuevamente el botón de descarga

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addImage(imgData, 'PNG', 20, 20, 555, 0);
            pdf.save(`informe-${project.name}.pdf`);
        }, 0);
    };

    // Cálculos de las tareas por estado
    const taskCounts = {
        "Por hacer": tasks.length,
        "En progreso": progressTasks.length,
        "En revisión": revisionTasks.length,
        "Hechas": doneTasks.length
    };

    // Configuración para los gráficos de texto (tamaño, color, etc.)
    const chartTextOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#042b51',
                    font: { size: 24, family: 'Arial' }
                }
            },
            tooltip: {
                bodyFont: { size: 14, family: 'Arial' },
                titleFont: { size: 16, family: 'Arial' }
            }
        },
        scales: {
            x: {
                ticks: { color: '#444', font: { size: 13, family: 'Arial' } },
                grid: { color: '#ddd' }
            },
            y: {
                ticks: { color: '#444', font: { size: 13, family: 'Arial' } },
                grid: { color: '#ddd' }
            }
        }
    };

    // Datos para el gráfico de tarta (Pie Chart)
    const pieData = {
        labels: Object.keys(taskCounts),
        datasets: [{
            label: 'Tareas por estado',
            data: Object.values(taskCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { ...chartTextOptions.plugins }
    };

    // Datos para el gráfico de barras (Bar Chart)
    const barData = {
        labels: Object.keys(taskCounts),
        datasets: [{
            label: 'Estado de las tareas',
            data: Object.values(taskCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        ...chartTextOptions
    };

    // Si no se encuentra el proyecto, mostrar mensaje de error
    if (!project) {
        return <div>No se encontró el proyecto.</div>;
    }

    // Renderiza el informe con gráficos y tareas organizadas por estado
    return (
        <div className='report-dashboard'>
            <h1>Informe de estado del proyecto {project.name} a {new Date().toLocaleString()}</h1>
            <div className='data-report'>
                <div className='to-do'>
                    <h2>Por hacer</h2>
                    <ul>
                        {tasks?.map((task, index) => (
                            <li key={index}>
                                <h3>{task.content}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='progress'>
                    <h2>En progreso</h2>
                    <ul>
                        {progressTasks?.map((task, index) => (
                            <li key={index}>
                                <h3>{task.content}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='review'>
                    <h2>En revisión</h2>
                    <ul>
                        {revisionTasks?.map((task, index) => (
                            <li key={index}>
                                <h3>{task.content}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='done'>
                    <h2>Hechas</h2>
                    <ul>
                        {doneTasks?.map((task, index) => (
                            <li key={index}>
                                <h3>{task.content}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="charts">
                <div className='pie-chart'>
                    <h3>Distribución de tareas</h3>
                    <Pie data={pieData} options={pieOptions} />
                </div>
                <div className='bar-chart'>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
            <button className='btn btn-primary clean download' onClick={exportPDF}>Descargar informe del proyecto</button>
        </div>
    );
};

export default ReportComponent;
