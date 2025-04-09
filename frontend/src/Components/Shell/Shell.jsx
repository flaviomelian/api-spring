import React, { useState, useRef, useEffect } from 'react';
import { getAllProjects } from '../../services/services';
import './Shell.css';

const Shell = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState('');
  const [path, setPath] = useState(['home', 'user']);
  const inputRef = useRef(null);
  const [fileSystem, setFileSystem] = useState({});

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  const handleGetAllProjects = async () => {
    const projects = await getAllProjects();
    const fs = mapProjectsToFileSystem(projects);
    setFileSystem(fs);
  };

  const mapProjectsToFileSystem = (projects) => {
    const projectFolders = {};
  
    projects.forEach((project) => {
      projectFolders[project.name] = {
        [`readme_${project.id}.md`]: `# Proyecto ${project.name}\nEmpresa: ${project.enterprise}`,
      };
    });
  
    return {
      home: {
        user: {
          proyectos: projectFolders,
          'bienvenida.txt': 'Bienvenido a tu terminal personal de gestión de proyectos',
        },
      },
    };
  };
  

  const appendOutput = (output) => {
    setHistory(prev => [...prev, { command, output }]);
    setCommand('');
  };

  const getCurrentDir = () => {
    return path.reduce((dir, p) => dir[p], fileSystem);
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const args = command.trim().split(' ');
    const cmd = args[0];

    const currentDir = getCurrentDir();

    switch (cmd) {
      case 'ls':
        appendOutput(Object.keys(currentDir).join('  '));
        break;

      case 'cd':
        if (args.length < 2) {
          appendOutput('Uso: cd <directorio>');
        } else {
          const target = args[1];
          if (target === '..') {
            if (path.length > 1) setPath(prev => prev.slice(0, -1));
          } else if (currentDir[target] && typeof currentDir[target] === 'object') {
            setPath(prev => [...prev, target]);
          } else {
            appendOutput(`cd: ${target}: No es un directorio`);
          }
        }
        break;

      case 'pwd':
        appendOutput('/' + path.join('/'));
        break;

      case 'clear':
        setHistory([]);
        break;
        
      case 'cls':
        setHistory([]);
        break;

      case 'cat':
        if (args.length < 2) {
          appendOutput('Uso: cat <archivo>');
        } else {
          const file = currentDir[args[1]];
          if (typeof file === 'string') {
            appendOutput(file);
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
            delete currentDir[name];
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
          const newContent = prompt(`Editando ${name}`, content);
          if (newContent !== null) {
            currentDir[name] = newContent;
            appendOutput(`${name} guardado.`);
          }
        }
        break;
      
      case 'history':
        appendOutput(history.map((cmd, index) => `${index + 1} ${cmd}`).join('\n'));
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
            appendOutput(renderTree(fileSystem.current));
            break;
        }
    
      case 'download':
        break;

      case 'help': appendOutput('Comandos disponibles:\nls -> Listar directorios y archivos\npwd -> Imprimir el directorio actual'); break;

      default:
        appendOutput(`${cmd}: comando no encontrado.\nComandos disponibles:\nls -> Listar directorios y archivos\npwd -> Imprimir el directorio actual\nclear/cls -> limpiar la terminal\ncat <archivo> -> leer el contenido del archivo\nrm <archivo|carpeta> -> borrar ese archivo o carpeta\nnano <archivo> -> editar o crear un archivo`);
    }

    history.push(cmd) //esto se puede hacer no?
  };

  return (
    <div className="shell-container" onClick={() => inputRef.current.focus()}>
      {history.map((entry, index) => (
        <div key={index}>
          <div className="shell-line">
            <span className="shell-path">user@bash</span>:<span className="shell-dir">~/{path.join('/')}</span>$ {entry.command}
          </div>
          <pre dangerouslySetInnerHTML={{ __html: entry.output }} />
        </div>
      ))}
      <form onSubmit={handleCommand}>
        <div className="shell-line">
          <span className="shell-path">user@bash</span>:<span className="shell-dir">~/{path.join('/')}</span>$&nbsp;
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="shell-input"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default Shell;
