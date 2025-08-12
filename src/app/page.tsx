'use client';

import { useState, useRef, useEffect } from 'react';
import fortunes from './data/fortunes.json';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'loading' | 'success';
  content: string;
  command?: string;
}

export default function Home() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to tipmebro.wtf terminal' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [interactiveCommand, setInteractiveCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const paymentMethods = {
    'gocardless': {
      name: 'GoCardless',
      description: 'Bank transfer (instant)',
      action: 'Redirecting to GoCardless...',
      url: 'https://gocardless.com'
    },
    'stripe': {
      name: 'Stripe',
      description: 'Credit/Debit cards',
      action: 'Redirecting to Stripe...',
      url: 'https://donate.stripe.com/fZuaEPavV7LPbxq9KPfAc00'
    },
    'monzo': {
      name: 'Monzo Referral',
      description: 'Sign up with my referral code',
      action: 'Monzo referral link: https://join.monzo.com/c/y869pymt',
      url: 'https://join.monzo.com/c/y869pymt'
    },
    'bitcoin': {
      name: 'Bitcoin',
      description: 'Cryptocurrency',
      action: 'Bitcoin address: bc1qpwvvrjzdwjgw94wknas7yk0qlurh46exwqjvdp',
      url: null
    },
    'ethereum': {
      name: 'Ethereum',
      description: 'Cryptocurrency',
      action: 'Ethereum address: 0xE008a63c0a6B1CC4678A2702556b6b9D25086C0c',
      url: null
    },
    'usdt': {
      name: 'USDT',
      description: 'Tether (ERC-20)',
      action: 'USDT address: 0xE008a63c0a6B1CC4678A2702556b6b9D25086C0c',
      url: null
    }
  };

  const commands: Record<string, ((args?: string[]) => string | Promise<string>) | (() => string | Promise<string>)> = {
    help: () => `Available Commands:

BASIC:
  help                    - Show this help message
  clear                   - Clear terminal
  exit                    - Close terminal

DONATION:
  donate                  - Start donation process

FUN:
  cat                     - Interactive ASCII cat
  matrix                  - Matrix-style characters
  rainbow                 - Rainbow text effect
  typing                  - Typewriter effect demo
  clock                   - Show current time
  weather                 - Simulated weather report
  fortune                 - Get a random fortune
  cowsay <message>        - Make a cow say something
  banner <text>           - Create a text banner`,

    donate: async () => {
      setIsLoading(true);
      setHistory(prev => [...prev, { type: 'loading', content: 'Loading donation options...' }]);

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);

      // Replace loading message with success message
      setHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        if (newHistory[lastIndex] && newHistory[lastIndex].type === 'loading') {
          newHistory[lastIndex] = { type: 'success', content: '✓ Donation options loaded successfully' };
        }
        return newHistory;
      });

      return `Choose your payment method:

  gocardless              - Bank transfer (instant)
  stripe                  - Credit/Debit cards  
  monzo                   - Monzo referral (we both get £5!)
  bitcoin                 - Bitcoin cryptocurrency
  ethereum                - Ethereum cryptocurrency
  usdt                    - USDT (ERC-20)

Type the payment method to proceed (e.g., "gocardless")`;
    },

    clear: async () => {
      // Add dramatic clearing sequence
      setHistory(prev => [...prev, { type: 'loading', content: '[CLEAN] Initiating terminal purge...' }]);

      await new Promise(resolve => setTimeout(resolve, 300));

      setHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        if (newHistory[lastIndex] && newHistory[lastIndex].type === 'loading') {
          newHistory[lastIndex] = { type: 'success', content: '✓ Purge sequence initiated' };
        }
        return newHistory;
      });

      await new Promise(resolve => setTimeout(resolve, 200));
      setHistory(prev => [...prev, { type: 'output', content: '[WIPE] Wiping terminal memory...' }]);

      await new Promise(resolve => setTimeout(resolve, 200));
      setHistory(prev => [...prev, { type: 'output', content: '[BUFFER] Clearing display buffer...' }]);

      await new Promise(resolve => setTimeout(resolve, 300));
      setHistory(prev => [...prev, { type: 'output', content: '[DONE] Terminal cleared successfully' }]);

      await new Promise(resolve => setTimeout(resolve, 500));

      // Actually clear everything including this command
      setHistory([]);

      return '';
    },

    exit: async () => {
      // Add dramatic shutdown sequence with visual effects
      setHistory(prev => [...prev, { type: 'loading', content: '[!] CRITICAL: Initiating system shutdown...' }]);

      await new Promise(resolve => setTimeout(resolve, 500));

      setHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        if (newHistory[lastIndex] && newHistory[lastIndex].type === 'loading') {
          newHistory[lastIndex] = { type: 'success', content: '✓ Shutdown sequence initiated' };
        }
        return newHistory;
      });

      await new Promise(resolve => setTimeout(resolve, 300));
      setHistory(prev => [...prev, { type: 'output', content: '[SAVE] Saving session data...' }]);

      await new Promise(resolve => setTimeout(resolve, 400));
      setHistory(prev => [...prev, { type: 'output', content: '[NET] Closing network connections...' }]);

      await new Promise(resolve => setTimeout(resolve, 300));
      setHistory(prev => [...prev, { type: 'output', content: '[KILL] Terminating processes...' }]);

      await new Promise(resolve => setTimeout(resolve, 500));
      setHistory(prev => [...prev, { type: 'output', content: '[LOCK] Securing system...' }]);

      await new Promise(resolve => setTimeout(resolve, 400));
      setHistory(prev => [...prev, { type: 'output', content: '[WARN] WARNING: System shutdown in progress...' }]);

      await new Promise(resolve => setTimeout(resolve, 600));
      setHistory(prev => [...prev, { type: 'output', content: 'Goodbye, human. The terminal will miss you.' }]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add dramatic final message
      setHistory(prev => [...prev, { type: 'error', content: 'SYSTEM SHUTDOWN COMPLETE' }]);

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to close the window, but if it fails, just show a message
      try {
        window.close();
      } catch (e) {
        setHistory(prev => [...prev, { type: 'error', content: 'Unable to close window automatically. Please close manually.' }]);
      }

      return '';
    },

    cat: () => {
      return `  /\\_/\\
 ( o.o )
  > ^ <

Would you like to pet the cat? (y/n)`;
    },

    rainbow: () => {
      const colors = ['[RED]', '[ORANGE]', '[YELLOW]', '[GREEN]', '[BLUE]', '[PURPLE]'];
      const rainbowText = 'RAINBOW TEXT';
      return colors.map((color, i) => `${color} ${rainbowText[i] || ''}`).join(' ');
    },

    clock: () => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      return `Current Time: ${time}
Date: ${date}
Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    },

    weather: () => {
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy', 'Snowy'];
      const temp = Math.floor(Math.random() * 30) + 10;
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      return `Weather Report
${condition}
Temperature: ${temp}°C
Wind: ${Math.floor(Math.random() * 20) + 5} km/h
Humidity: ${Math.floor(Math.random() * 40) + 40}%`;
    },

    cowsay: (args?: string[]) => {
      const message = args?.join(' ') || 'Hello from the terminal!';
      const lines = message.split('\n');
      const maxLength = Math.max(...lines.map(line => line.length));
      const topBorder = ' ' + '_'.repeat(maxLength + 2);
      const bottomBorder = ' ' + '-'.repeat(maxLength + 2);
      const cow = `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

      let output = topBorder + '\n';
      lines.forEach(line => {
        const padding = ' '.repeat(maxLength - line.length);
        output += `| ${line}${padding} |\n`;
      });
      output += bottomBorder + '\n' + cow;
      return output;
    },

    banner: (args?: string[]) => {
      const bannerText = args?.join(' ') || 'BANNER';
      return `
╔${'═'.repeat(bannerText.length + 4)}╗
║  ${bannerText}  ║
╚${'═'.repeat(bannerText.length + 4)}╝
      `.trim();
    },

    matrix: () => {
      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      let matrix = '';
      for (let i = 0; i < 10; i++) {
        let line = '';
        for (let j = 0; j < 40; j++) {
          line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
        matrix += line + '\n';
      }
      return `Matrix Code Generated!\n\n${matrix}`;
    },

    typing: () => {
      return `This is a typewriter effect demo...
Each character appears one by one...
Just like in old movies!
Pretty cool, right?`;
    },

    fortune: () => {
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    }
  };

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    const [cmd, ...args] = trimmedCommand.split(' ');

    let output = '';

    if (trimmedCommand === '') {
      return '';
    }

    // Check for payment method selection
    if (paymentMethods[cmd as keyof typeof paymentMethods]) {
      const method = paymentMethods[cmd as keyof typeof paymentMethods];

      setIsLoading(true);
      setHistory(prev => [...prev, { type: 'loading', content: `Processing ${method.name} payment...` }]);

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsLoading(false);

      // Replace loading message with success message
      setHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        if (newHistory[lastIndex] && newHistory[lastIndex].type === 'loading') {
          newHistory[lastIndex] = { type: 'success', content: `✓ ${method.name} payment processed successfully` };
        }
        return newHistory;
      });

      if (method.url && cmd === 'monzo') {
        output = `${method.action}

How it works:
• Click the link to sign up for Monzo
• Use my referral code when creating your account
• We both get £5 when you make your first purchase
• No cost to you - it's a win-win!

Redirecting to Monzo signup in 3 seconds...`;
        setTimeout(() => window.open(method.url, '_blank'), 3000);
      } else if (method.url) {
        output = `${method.action}
Redirecting in 3 seconds...`;
        setTimeout(() => window.open(method.url, '_blank'), 3000);
      } else {
        output = `${method.action}

Do you want to copy this wallet address? (y/n)`;
        // Set interactive state for crypto commands
        setWaitingForInput(true);
        setInteractiveCommand(cmd);
      }
    }
    // Check for built-in commands
    else if (commands[cmd]) {
      const command = commands[cmd];

      // Add loading message for commands that need it
      const needsLoading = ['cat', 'rainbow', 'clock', 'weather', 'cowsay', 'banner', 'matrix', 'typing', 'fortune'];
      if (needsLoading.includes(cmd)) {
        let loadingMessage = '';
        switch (cmd) {
          case 'cat':
            loadingMessage = '[CAT] Summoning the cat...';
            break;
          case 'rainbow':
            loadingMessage = '[RGB] Creating rainbow effect...';
            break;
          case 'clock':
            loadingMessage = '[TIME] Getting current time...';
            break;
          case 'weather':
            loadingMessage = '[WX] Checking weather conditions...';
            break;
          case 'cowsay':
            loadingMessage = '[COW] Preparing cow message...';
            break;
          case 'banner':
            loadingMessage = '[BANNER] Creating banner...';
            break;
          case 'matrix':
            loadingMessage = '[MATRIX] Generating matrix code...';
            break;
          case 'typing':
            loadingMessage = '[TYPE] Preparing typewriter effect...';
            break;
          case 'fortune':
            loadingMessage = '[FORTUNE] Consulting the fortune co✓ie...';
            break;
        }

        setHistory(prev => [...prev, { type: 'loading', content: loadingMessage }]);

        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 800));

        // Replace loading with success
        setHistory(prev => {
          const newHistory = [...prev];
          const lastIndex = newHistory.length - 1;
          if (newHistory[lastIndex] && newHistory[lastIndex].type === 'loading') {
            let successMessage = '';
            switch (cmd) {
              case 'cat':
                successMessage = '[✓] Cat summoned successfully';
                break;
              case 'rainbow':
                successMessage = '[✓] Rainbow effect created';
                break;
              case 'clock':
                successMessage = '[✓] Time retrieved successfully';
                break;
              case 'weather':
                successMessage = '[✓] Weather report generated';
                break;
              case 'cowsay':
                successMessage = '[✓] Cow message prepared';
                break;
              case 'banner':
                successMessage = '[✓] Banner created successfully';
                break;
              case 'matrix':
                successMessage = '[✓] Matrix code generated successfully';
                break;
              case 'typing':
                successMessage = '[✓] Typewriter effect ready';
                break;
              case 'fortune':
                successMessage = '[✓] Fortune retrieved successfully';
                break;
            }
            newHistory[lastIndex] = { type: 'success', content: successMessage };
          }
          return newHistory;
        });
      }

      try {
        const result = command(args);
        if (typeof result === 'string') {
          output = result;
          // Check if this is an interactive command
          if (result.includes('Would you like to') && result.includes('(y/n)')) {
            setWaitingForInput(true);
            setInteractiveCommand(cmd);
          }
        } else if (result instanceof Promise) {
          output = await result;
          // Check if this is an interactive command
          if (output.includes('Would you like to') && output.includes('(y/n)')) {
            setWaitingForInput(true);
            setInteractiveCommand(cmd);
          }
        }
      } catch (error) {
        output = `Error executing command: ${error}`;
      }
    }

    else {
      output = `Command not found: ${cmd}. Type "help" for available commands.`;
    }

    return output;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim() || isLoading) return;

    const command = currentCommand.trim();

    // Handle interactive responses
    if (waitingForInput) {
      const response = command.toLowerCase();
      let output = '';

      if (interactiveCommand === 'cat') {
        if (response === 'y' || response === 'yes') {
          output = `  /\\_/\\
 ( o.o )
  > ^ <  *purrs happily*

The cat loves your attention!`;
        } else if (response === 'n' || response === 'no') {
          output = `  /\\_/\\
 ( o.o )
  > ^ <  *lo✓s disappointed*

The cat walks away...`;
        } else {
          output = 'Please answer with y/n';
          setCurrentCommand('');
          return;
        }
      } else if (interactiveCommand === 'bitcoin' || interactiveCommand === 'ethereum' || interactiveCommand === 'usdt') {
        // Handle crypto wallet copying
        if (response === 'y' || response === 'yes') {
          // Extract the address from the previous output
          const lastOutput = history[history.length - 1];
          if (lastOutput && lastOutput.type === 'output') {
            const addressMatch = lastOutput.content.match(/([a-zA-Z0-9]{26,}|0x[a-fA-F0-9]{40})/);
            const address = addressMatch ? addressMatch[1] : '';

            if (address) {
              // Copy to clipboard
              navigator.clipboard.writeText(address).then(() => {
                console.log('Crypto address copied to clipboard');
              }).catch(err => {
                console.error('Failed to copy address: ', err);
              });

              output = `Address copied to clipboard: ${address}`;
            } else {
              output = 'Could not find wallet address to copy.';
            }
          } else {
            output = 'Could not find wallet address to copy.';
          }
        } else if (response === 'n' || response === 'no') {
          output = 'Address not copied.';
        } else {
          output = 'Please answer with y/n';
          setCurrentCommand('');
          return;
        }
      }

      // Add response to history
      setHistory(prev => [...prev,
      { type: 'input', content: `$ ${command}`, command },
      { type: 'output', content: output }
      ]);

      setWaitingForInput(false);
      setInteractiveCommand('');
      setCurrentCommand('');

      // Auto-scroll to bottom
      setTimeout(() => {
        if (historyRef.current) {
          historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
      }, 100);

      return;
    }

    const output = await executeCommand(command);

    // Add command to history
    setHistory(prev => [...prev,
    { type: 'input', content: `$ ${command}`, command },
    { type: 'output', content: output || '' }
    ]);

    // Add to command history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setCurrentCommand('');

    // Auto-scroll to bottom
    setTimeout(() => {
      if (historyRef.current) {
        historyRef.current.scrollTop = historyRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();

    // Additional security measures
    const preventInspection = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'S')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventDevTools = () => {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        document.body.innerHTML = 'Developer tools detected. Access denied.';
      }
    };

    // Add event listeners
    document.addEventListener('keydown', preventInspection);
    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('resize', preventDevTools);

    // Check for dev tools on load
    setTimeout(preventDevTools, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventInspection);
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('resize', preventDevTools);
    };
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-history" ref={historyRef}>
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            {line.type === 'input' ? (
              <span className="terminal-prompt">{line.content}</span>
            ) : line.type === 'error' ? (
              <span className="terminal-error">{line.content}</span>
            ) : line.type === 'loading' ? (
              <span className="terminal-loading">{line.content}</span>
            ) : line.type === 'success' ? (
              <span className="terminal-success">{line.content}</span>
            ) : (
              <span className="terminal-output">{line.content}</span>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-current-line">
          <span className="terminal-prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
            disabled={isLoading}
            placeholder={waitingForInput ? "Enter y/n..." : ""}
          />
        </form>
      </div>
    </div>
  );
}
