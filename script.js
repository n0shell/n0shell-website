/* ==========================================================================
   N0SHELL TERMINAL PORTFOLIO - JAVASCRIPT CONTROLLER
   Handles live clock, command line execution, interactive buttons & effects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Live Clock in Terminal Header
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }

    // 2. Interactive Command Line & Buttons Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const commandButtons = document.querySelectorAll('.cmd-btn');

    // Helper function to scroll terminal to bottom
    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Function to execute commands dynamically
    function executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        
        // Echo user command in terminal
        const echoLine = document.createElement('div');
        echoLine.className = 'terminal-line';
        echoLine.innerHTML = `<span class="prompt">n0shell@arch ~ %</span> <span class="command">${escapeHtml(cmd)}</span>`;
        terminalBody.insertBefore(echoLine, document.querySelector('.interactive-prompt-line'));

        let responseHTML = '';

        switch (cleanCmd) {
            case 'help':
                responseHTML = `
                    <div class="output-block">
                        <p>Comandos disponibles:</p>
                        <p> - <strong>bio</strong>: Muestra información personal y descripción.</p>
                        <p> - <strong>projects</strong>: Lista los repositorios destacados.</p>
                        <p> - <strong>skills</strong>: Muestra habilidades y herramientas.</p>
                        <p> - <strong>socials</strong>: Enlaces a redes sociales y contacto.</p>
                        <p> - <strong>clear</strong>: Limpia la pantalla de la terminal.</p>
                    </div>
                `;
                break;

            case 'bio':
            case 'cat bio.txt':
                responseHTML = `
                    <div class="output-block">
                        <p class="bio-text">&gt; Hola, soy <strong>n0shell</strong>. Desarrollador y entusiasta del software minimalista, sistemas Linux y aplicaciones web offline-first. Aunque uso Windows 11 en el día a día, me mola configurar Arch Linux para programar.</p>
                    </div>
                `;
                break;

            case 'projects':
            case 'ls ./projects':
            case 'ls':
                responseHTML = `
                    <div class="output-block">
                        <p class="output-comment"># Repositorios principales (excluyendo n0teams, n0shell-websiteA y n0shell Public)</p>
                        <p>1. <strong>n0gym</strong> - App web offline-first de fitness (JS + IndexedDB + Capacitor).</p>
                        <p>2. <strong>Dotfiles & Configs</strong> - Arch Linux custom GRUB & term themes.</p>
                        <p>Visita <a href="https://github.com/n0shell" target="_blank" style="color:var(--accent-green)">github.com/n0shell</a> para más.</p>
                    </div>
                `;
                break;

            case 'skills':
            case 'neofetch':
            case 'neofetch --skills':
                responseHTML = `
                    <div class="output-block">
                        <p><strong>[SYSTEMS]</strong> Windows 11 (Main) / Arch Linux (Dev & Custom)</p>
                        <p><strong>[LANGS]</strong> HTML5, CSS3, JavaScript (ES6+), Node.js</p>
                        <p><strong>[TOOLS]</strong> Git, VS Code, Vencord, Terminal Ecosystem</p>
                    </div>
                `;
                break;

            case 'socials':
            case 'cat socials.cfg':
                responseHTML = `
                    <div class="output-block">
                        <p>💬 Discord: <a href="https://discord.gg/rECDwZdgbp" target="_blank" style="color:var(--discord-color)">discord.gg/rECDwZdgbp</a></p>
                        <p>📺 YouTube: <a href="https://www.youtube.com/@n0shell-ptp" target="_blank" style="color:var(--youtube-color)">@n0shell-ptp</a></p>
                        <p>🐙 GitHub: <a href="https://github.com/n0shell" target="_blank" style="color:var(--accent-green)">github.com/n0shell</a></p>
                    </div>
                `;
                break;

            case 'clear':
                const sections = terminalBody.querySelectorAll('.terminal-section, .output-block, .terminal-line:not(.interactive-prompt-line)');
                sections.forEach(el => {
                    if (!el.classList.contains('ascii-banner')) {
                        el.style.display = 'none';
                    }
                });
                responseHTML = '<div class="output-block"><p>&gt; Terminal limpia.</p></div>';
                break;

            case '':
                responseHTML = '';
                break;

            default:
                responseHTML = `
                    <div class="output-block">
                        <p style="color: #ff5f56;">zsh: command not found: ${escapeHtml(cmd)}. Escribe <strong>help</strong> para ver los comandos.</p>
                    </div>
                `;
                break;
        }

        if (responseHTML) {
            const respDiv = document.createElement('div');
            respDiv.innerHTML = responseHTML;
            terminalBody.insertBefore(respDiv, document.querySelector('.interactive-prompt-line'));
        }

        scrollToBottom();
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                terminalInput.value = '';
                executeCommand(cmd);
            }
        });
    }

    commandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd === 'clear') {
                executeCommand('clear');
            } else {
                executeCommand(cmd);
            }
        });
    });

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    terminalBody.addEventListener('click', () => {
        if (terminalInput) {
            terminalInput.focus();
        }
    });

    console.log('%c [INIT] n0shell terminal portfolio loaded successfully. ', 'background: #00ff66; color: #000; font-weight: bold;');
});
