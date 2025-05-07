/**
 * Componente `Shell` para simular una terminal interactiva en la que el usuario puede navegar por directorios,
 * listar archivos, ver contenido de archivos, y ejecutar comandos de gestión de archivos. 
 * 
 * Este componente emula una terminal de sistema de archivos donde el usuario puede ejecutar varios comandos como `ls`, 
 * `cd`, `pwd`, `cat`, entre otros. La estructura de directorios y archivos es simulada, y se generan salidas personalizadas 
 * según el comando ejecutado. Los datos de los proyectos y archivos se cargan desde una fuente externa (API) y se mapean 
 * en un sistema de archivos virtual para interactuar con él.
 * 
 * @component
 * @example
 * Ejemplo de uso
 * <Shell />
 * 
 * @returns {React.Element} El componente `Shell` que simula una terminal interactiva para gestionar proyectos y archivos.
 */
import React, { useState, useRef, useEffect } from 'react';
import { getAllProjects } from '../../services/services';
import './Shell.css';

const Shell = () => {
  // Estado para el historial de comandos y las salidas generadas
  const [history, setHistory] = useState([]);
  // Estado para el comando que el usuario escribe en la terminal
  const [command, setCommand] = useState('');
  // Estado para almacenar el directorio actual en la terminal
  const [path, setPath] = useState(['home', 'user']);
  // Referencia al input de la terminal
  const inputRef = useRef(null);
  // Estado para representar el sistema de archivos simulado
  const [fileSystem, setFileSystem] = useState({});
  // Banner ASCII mostrado en la terminal al cargar la aplicación
  const asciiBanner = `
<pre class="ascii-banner">
    .-------------------------------------------.
    |       ___      ____                       |
    |     //   ) )  // | |    __//_   //    / / |
    |    //___/ /  //__| |   ( //  ) //____/ /  |
    |   / __  (   / ___  |    \\     / ____  /   |
    |  //    ) ) //    | |(__//_)  //    / /    |
    | //____/ / //     | |  //    //    / /     |
    |                                           |
    '-------------------------------------------'
                                
    Bienvenido a tu terminal de proyectos!
</pre>
`;
  // Referencia al contenedor principal de la terminal para hacer scroll automático
  const shellContainerRef = useRef(null);

  // Efecto para manejar el desplazamiento automático de la terminal
  useEffect(() => {
    if (shellContainerRef.current) {
      shellContainerRef.current.scrollTop = shellContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Efecto para mostrar el banner ASCII y cargar los proyectos cuando el componente se monta
  useEffect(() => {
    appendOutput(asciiBanner); // Mostrar el banner ASCII
    handleGetAllProjects();    // Cargar los proyectos desde el servidor
  }, []);

  // Efecto que recarga los proyectos cada vez que el componente se renderiza
  useEffect(() => {
    handleGetAllProjects();
  }, []);

  // Función para obtener todos los proyectos desde la API
  const handleGetAllProjects = async () => {
    const projects = await getAllProjects();  // Llamada a la API para obtener los proyectos
    const fs = mapProjectsToFileSystem(projects);  // Mapea los proyectos al sistema de archivos
    setFileSystem(fs);  // Actualiza el sistema de archivos
  };

  // Función para mapear los proyectos obtenidos a una estructura de archivos
  const mapProjectsToFileSystem = (projects) => {
    const projectFolders = {};
  
    // Para cada proyecto, crear una carpeta con el nombre del proyecto y su archivo README
    projects.forEach((project) => {
      projectFolders[`${project.name.replaceAll(" ", "-")}/`] = {
        [`readme_${project.id}.md`]: `# Proyecto ${project.name}\nEmpresa: ${project.enterprise}`,
      };
    });
  
    return {
      home: {
        user: {
          'proyectos/': projectFolders,  // Carpeta de proyectos
          'bienvenida.txt': 'Bienvenido a tu terminal personal de gestión de proyectos',  // Archivo de bienvenida
        },
      },
    };
  };

  // Función para agregar salidas de comandos al historial
  const appendOutput = (output) => {
    setHistory(prev => [...prev, { command, output }]);
    setCommand('');
  };

  // Función para obtener el directorio actual desde el estado `path`
  const getCurrentDir = () => {
    return path.reduce((dir, p) => dir[p], fileSystem);
  };

  // Función principal para manejar los comandos de la terminal
  const handleCommand = (e) => {
    e.preventDefault();
    const args = command.trim().split(' ');
    const cmd = args[0];

    const currentDir = getCurrentDir();  // Obtener el directorio actual

    // Ejecutar el comando según lo que el usuario haya escrito
    switch (cmd) {
      case 'ls':
        appendOutput(Object.keys(currentDir).join('  '));  // Listar directorios y archivos
        break;

      case 'cd':
        if (args.length < 2) {
          appendOutput('Uso: cd <directorio>');
        } else {
          const target = args[1];
          if (target === '..') {
            if (path.length > 1) setPath(prev => prev.slice(0, -1));  // Subir un nivel
          } else if (currentDir[target] && typeof currentDir[target] === 'object') {
            setPath(prev => [...prev, target]);  // Cambiar a un subdirectorio
          } else {
            appendOutput(`cd: ${target}: No es un directorio`);
          }
        }
        break;

      case 'pwd':
        appendOutput('/' + path.join('/'));  // Mostrar el directorio actual
        break;

      case 'clear':
        setHistory([]);  // Limpiar la terminal
        break;
        
      case 'cls':
        setHistory([]);  // Limpiar la terminal (comando alternativo)
        break;

      case 'cat':
        if (args.length < 2) {
          appendOutput('Uso: cat <archivo>');
        } else {
          const file = currentDir[args[1]];
          if (typeof file === 'string') {
            appendOutput(file);  // Mostrar contenido del archivo
          } else {
            appendOutput(`cat: ${args[1]}: No es un archivo o no existe`);
          }
        }
        break;

      case 'rm':
        if (args.length < 2) {
          appendOutput('Uso: rm <archivo|carpeta>');
        } else {
          const name = args[1];
          if (currentDir[name]) {
            delete currentDir[name];  // Eliminar archivo o carpeta
            appendOutput(`${name} eliminado.`);
          } else {
            appendOutput(`${name}: No encontrado`);
          }
        }
        break;

      case 'nano':
        if (args.length < 2) {
          appendOutput('Uso: nano <archivo>');
        } else {
          const name = args[1];
          const content = currentDir[name] || '';
          const newContent = prompt(`Editando ${name}`, content);  // Editar archivo
          if (newContent !== null) {
            currentDir[name] = newContent;
            appendOutput(`${name} guardado.`);
          }
        }
        break;
      
      case 'history':
        appendOutput(history.map((cmd, index) => `${index + 1} ${cmd}`).join('\n'));  // Mostrar historial de comandos
        break;

      case 'tree':
        {
            const renderTree = (node, prefix = '') => {
                return Object.entries(node).map(([key, value], index, array) => {
                    const isLast = index === array.length - 1;
                    const connector = isLast ? '└── ' : '├── ';
                    const newPrefix = prefix + (isLast ? '    ' : '│   ');
                    const colorClass = typeof value === 'object' ? 'folder' : 'file';
                    let line = `<span class="${colorClass}">${prefix}${connector}${key}</span>`;
                    if (typeof value === 'object') {
                    line += '\n' + renderTree(value, newPrefix).join('\n');
                    }
                    return line;
                }).join('\n');
            };
            appendOutput(renderTree(fileSystem.current));  // Mostrar la estructura de directorios
            break;
        }
    
      case 'download':
        break;

      case 'help':
        appendOutput('Comandos disponibles:\nls -> Listar directorios y archivos\npwd -> Imprimir el directorio actual\nclear/cls -> limpiar la terminal\ncat <archivo> -> leer el contenido del archivo\nrm <archivo|carpeta> -> borrar ese archivo o carpeta\nnano <archivo> -> editar o crear un archivo');
        break;

      case '/h':
        appendOutput('Comandos disponibles:\nls -> Listar directorios y archivos\npwd -> Imprimir el directorio actual\nclear/cls -> limpiar la terminal\ncat <archivo> -> leer el contenido del archivo\nrm <archivo|carpeta> -> borrar ese archivo o carpeta\nnano <archivo> -> editar o crear un archivo');
        break;

      default:
        appendOutput(`${cmd}: comando no encontrado.\nComandos disponibles:\nls -> Listar directorios y archivos\npwd -> Imprimir el directorio actual\nclear/cls -> limpiar la terminal\ncat <archivo> -> leer el contenido del archivo\nrm <archivo|carpeta> -> borrar ese archivo o carpeta\nnano <archivo> -> editar o crear un archivo`);
    }

    history.push(cmd);  // Añadir el comando al historial
  };

  return (
    <div className="shell-container" ref={shellContainerRef} onClick={() => inputRef.current.focus()}>
      {history.map((entry, index) => (
        <div key={index}>
          <pre dangerouslySetInnerHTML={{ __html: `<b>${entry.output}</b>`} } />
        </div>
      ))}
      <form onSubmit={handleCommand}>
        <div className="shell-line">
          <span className="shell-path">user@bash</span>:<span className="shell-dir">~/{path.join('/')}</span>
          <div>
            $&nbsp;
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="shell-input"
              autoFocus
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shell;
