// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
    mode: 'htmlmixed',
    theme: 'monokai',
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-F": "findPersistent",
        "Ctrl-H": "replace",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Ctrl-[": "foldCode",
        "Ctrl-]": "unfoldCode",
        "Alt-Click": "multipleCursor",
        "Ctrl-D": "selectNextOccurrence",
        "Ctrl-U": "undoSelection",
        "Tab": "emmetExpandAbbreviation",
        "Esc": "singleCursor"
    }
});
const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
    mode: 'css',
    theme: 'monokai',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-F": "findPersistent",
        "Ctrl-H": "replace",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Ctrl-[": "foldCode",
        "Ctrl-]": "unfoldCode",
        "Alt-Click": "multipleCursor",
        "Ctrl-D": "selectNextOccurrence",
        "Ctrl-U": "undoSelection",
        "Tab": "emmetExpandAbbreviation",
        "Esc": "singleCursor"
    }
});
const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
    mode: 'javascript',
    theme: 'monokai',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-F": "findPersistent",
        "Ctrl-H": "replace",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Ctrl-[": "foldCode",
        "Ctrl-]": "unfoldCode",
        "Alt-Click": "multipleCursor",
        "Ctrl-D": "selectNextOccurrence",
        "Ctrl-U": "undoSelection"
    }
});
// Set HTML editor as default
let activeEditor = htmlEditor;
// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all editors
        document.querySelectorAll('.CodeMirror').forEach(editor => {
            editor.style.display = 'none';
        });
        
        // Show selected editor
        const tabType = tab.getAttribute('data-tab');
        if (tabType === 'html') {
            activeEditor = htmlEditor;
            htmlEditor.getWrapperElement().style.display = 'block';
        } else if (tabType === 'css') {
            activeEditor = cssEditor;
            cssEditor.getWrapperElement().style.display = 'block';
        } else if (tabType === 'js') {
            activeEditor = jsEditor;
            jsEditor.getWrapperElement().style.display = 'block';
        }
        
        // Refresh the editor to ensure proper rendering
        activeEditor.refresh();
    });
});
// Update preview using srcdoc approach (simpler than blob URLs)
function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();
    
    const previewFrame = document.getElementById('preview-frame');
    
    // Parse the HTML to extract body content and remove external resources
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract title if exists
    const title = doc.querySelector('title')?.innerText || 'Preview';
    
    // Remove external resource references (link tags with href and script tags with src)
    const externalLinks = doc.querySelectorAll('link[href]');
    externalLinks.forEach(link => link.remove());
    
    const externalScripts = doc.querySelectorAll('script[src]');
    externalScripts.forEach(script => script.remove());
    
    // Get the body content without the body tag itself
    const bodyContent = doc.body.innerHTML;
    
    // Create a complete HTML document with inline CSS and JavaScript
    const completeHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>${css}</style>
</head>
<body>
    ${bodyContent}
    <script>
        // Override console.log to redirect to our console
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = function(...args) {
            parent.postMessage({
                type: 'console',
                method: 'log',
                args: args.map(arg => String(arg))
            }, '*');
            originalLog.apply(console, args);
        };
        
        console.warn = function(...args) {
            parent.postMessage({
                type: 'console',
                method: 'warn',
                args: args.map(arg => String(arg))
            }, '*');
            originalWarn.apply(console, args);
        };
        
        console.error = function(...args) {
            parent.postMessage({
                type: 'console',
                method: 'error',
                args: args.map(arg => String(arg))
            }, '*');
            originalError.apply(console, args);
        };
        
        // User's JavaScript code
        ${js}
    </script>
</body>
</html>`;
    
    // Set iframe content using srcdoc
    previewFrame.srcdoc = completeHTML;
    
    // Force a refresh of the iframe to ensure proper sizing
    setTimeout(() => {
        // Trigger a resize event to ensure iframe adjusts to container
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
    }, 100);
}
// Initial preview update
setTimeout(updatePreview, 100);
// Update preview on code change with debounce
let timeout;
function debounceUpdate() {
    clearTimeout(timeout);
    timeout = setTimeout(updatePreview, 300);
}
htmlEditor.on('change', debounceUpdate);
cssEditor.on('change', debounceUpdate);
jsEditor.on('change', debounceUpdate);
// Button event listeners
document.getElementById('run-btn').addEventListener('click', updatePreview);
document.getElementById('refresh-btn').addEventListener('click', updatePreview);
document.getElementById('find-btn').addEventListener('click', () => {
    activeEditor.execCommand('findPersistent');
});
document.getElementById('clear-btn').addEventListener('click', () => {
    if (activeEditor === htmlEditor) {
        htmlEditor.setValue('');
    } else if (activeEditor === cssEditor) {
        cssEditor.setValue('');
    } else if (activeEditor === jsEditor) {
        jsEditor.setValue('');
    }
});
// Emmet support
CodeMirror.defineExtension("emmetExpandAbbreviation", function() {
    if (window.emmet) {
        const range = this.listSelections()[0];
        const cursor = this.getCursor();
        const line = this.getLine(cursor.line);
        const pos = cursor.ch;
        
        // Find abbreviation start
        let start = pos;
        while (start > 0 && /[a-zA-Z0-9#\.>\[\]\(\)\{\}\*\+\^\$]/.test(line.charAt(start - 1))) {
            start--;
        }
        
        const abbreviation = line.substring(start, pos);
        if (abbreviation) {
            const expanded = emmet.expandAbbreviation(abbreviation, 'html');
            if (expanded && expanded !== abbreviation) {
                this.replaceRange(expanded, {line: cursor.line, ch: start}, {line: cursor.line, ch: pos});
                this.setCursor({line: cursor.line, ch: start + expanded.length});
            }
        }
    }
});
// Console functionality
const consoleContainer = document.getElementById('console-container');
const consoleOutput = document.getElementById('console-output');
const consoleInput = document.getElementById('console-input');
const consoleToggleBtn = document.getElementById('console-toggle-btn');
const consoleClearBtn = document.getElementById('console-clear-btn');
const consoleDivider = document.getElementById('console-divider');
// Toggle console visibility
consoleToggleBtn.addEventListener('click', () => {
    const isOpen = consoleContainer.classList.toggle('open');
    consoleDivider.classList.toggle('visible', isOpen);
    
    // If opening, focus the console input
    if (isOpen) {
        consoleInput.focus();
    }
    
    // Trigger a resize event to ensure proper panel sizing
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
});
// Clear console
consoleClearBtn.addEventListener('click', () => {
    consoleOutput.innerHTML = '';
});
// Console logging
function log(message, type = 'log') {
    const div = document.createElement('div');
    div.className = `console-log-${type}`;
    div.textContent = message;
    consoleOutput.appendChild(div);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}
// Initial console message
log('Web Development Tool Console', 'info');
log('Type help() to see available commands', 'info');
// Process console commands
function processCommand(cmd) {
    if (!cmd.trim()) return;
    
    log(`> ${cmd}`, 'info');
    
    switch (cmd.trim()) {
        case 'help()':
            log('Available commands:', 'info');
            log('  help() - Show this help message', 'info');
            log('  clear() - Clear the console', 'info');
            log('  run() - Run the code', 'info');
            log('  reload() - Reload the preview', 'info');
            break;
        case 'clear()':
            consoleOutput.innerHTML = '';
            break;
        case 'run()':
            updatePreview();
            log('Code executed', 'info');
            break;
        case 'reload()':
            updatePreview();
            log('Preview reloaded', 'info');
            break;
        default:
            try {
                // Try to evaluate the command
                const result = eval(cmd);
                if (result !== undefined) {
                    log(String(result), 'log');
                }
            } catch (e) {
                log(`Error: ${e.message}`, 'error');
            }
    }
}
// Console input event listener
consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        processCommand(consoleInput.value);
        consoleInput.value = '';
    }
});
// Listen for messages from the iframe (console redirects)
window.addEventListener('message', (event) => {
    if (event.data.type === 'console') {
        const { method, args } = event.data;
        const message = args.join(' ');
        log(message, method);
    }
});
// Horizontal resize functionality
const horizontalDivider = document.getElementById('horizontal-divider');
const editorPanel = document.querySelector('.editor-panel');
const previewPanel = document.querySelector('.preview-panel');
const mainContainer = document.querySelector('.main-container');
let isHorizontalResizing = false;
horizontalDivider.addEventListener('mousedown', (e) => {
    isHorizontalResizing = true;
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
});
document.addEventListener('mousemove', (e) => {
    if (!isHorizontalResizing) return;
    
    const containerRect = mainContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const newEditorWidth = ((e.clientX - containerRect.left) / containerWidth) * 100;
    
    if (newEditorWidth > 20 && newEditorWidth < 80) {
        editorPanel.style.flex = `0 0 ${newEditorWidth}%`;
        previewPanel.style.flex = `0 0 ${100 - newEditorWidth}%`;
        
        // Refresh editors to ensure proper rendering
        htmlEditor.refresh();
        cssEditor.refresh();
        jsEditor.refresh();
        
        // Trigger a resize event to ensure iframe adjusts to container
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
    }
});
document.addEventListener('mouseup', () => {
    if (isHorizontalResizing) {
        isHorizontalResizing = false;
        document.body.style.cursor = '';
    }
});
// Console resize functionality
let isConsoleResizing = false;
let startY = 0;
let startHeight = 0;
consoleDivider.addEventListener('mousedown', (e) => {
    if (!consoleContainer.classList.contains('open')) return;
    
    isConsoleResizing = true;
    startY = e.clientY;
    startHeight = consoleContainer.offsetHeight;
    document.body.style.cursor = 'row-resize';
    e.preventDefault();
});
document.addEventListener('mousemove', (e) => {
    if (!isConsoleResizing) return;
    
    const deltaY = startY - e.clientY;
    const newHeight = startHeight + deltaY;
    
    if (newHeight > 100 && newHeight < window.innerHeight - 200) {
        consoleContainer.style.height = `${newHeight}px`;
        
        // Trigger a resize event to ensure iframe adjusts to container
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
    }
});
document.addEventListener('mouseup', () => {
    if (isConsoleResizing) {
        isConsoleResizing = false;
        document.body.style.cursor = '';
    }
});

// Add a window resize handler to ensure iframe resizes properly
window.addEventListener('resize', () => {
    // Force a refresh of the iframe when the window is resized
    const previewFrame = document.getElementById('preview-frame');
    if (previewFrame) {
        // Get the current srcdoc
        const currentSrcdoc = previewFrame.srcdoc;
        // Reset and restore to force a proper resize
        previewFrame.srcdoc = '';
        setTimeout(() => {
            previewFrame.srcdoc = currentSrcdoc;
        }, 10);
    }
});