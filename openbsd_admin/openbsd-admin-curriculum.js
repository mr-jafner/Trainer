// ============================================================
// CURRICULUM
// OpenBSD System Administration Learning Platform
// 25 modules across 8 categories
// ============================================================

export const curriculum = {
  // ============================================================
  // CATEGORY 1: SYSTEM MODEL
  // ============================================================
  'system-model': {
    id: 'system-model',
    title: 'System Model',
    description: 'How OpenBSD organizes files, users, and security boundaries',
    color: '#22c55e',
    icon: '🏗️',
    modules: [
      {
        id: 'directory-layout',
        title: 'Directory Layout',
        type: 'conceptmap',
        why: 'Knowing where things live prevents guessing and lets you find configs, logs, and data quickly. OpenBSD has strong conventions - learn them once, use them forever.',
        pitfalls: [
          'Editing files in /usr instead of /etc - /usr is for defaults, /etc for local config',
          'Forgetting /var/www is the chroot - paths inside httpd.conf are relative to this',
          'Looking for package configs in /etc instead of /usr/local/etc'
        ],
        content: {
          central: 'Filesystem',
          description: 'Key directories and their purposes',
          branches: [
            {
              id: 'etc',
              label: '/etc',
              color: '#3b82f6',
              details: 'System configuration files. This is where YOU make changes. Base system configs only - packages go in /usr/local/etc.',
              children: ['httpd.conf', 'pf.conf', 'doas.conf', 'rc.conf.local', 'hostname.*']
            },
            {
              id: 'var',
              label: '/var',
              color: '#22c55e',
              details: 'Variable data - logs, mail, databases, web content. Grows over time. Monitor /var/log and /var/www size.',
              children: ['/var/log', '/var/www', '/var/db', '/var/run', '/var/cron']
            },
            {
              id: 'usr',
              label: '/usr',
              color: '#f59e0b',
              details: 'System programs and default configs. Do not edit files here directly - they get overwritten on upgrade. /usr/local is for packages.',
              children: ['/usr/bin', '/usr/sbin', '/usr/share', '/usr/local/*']
            },
            {
              id: 'var-www',
              label: '/var/www (chroot)',
              color: '#ef4444',
              details: 'Web server chroot jail. httpd runs confined here. Paths in httpd.conf are relative to this root. Contains its own /etc, /dev, /tmp.',
              children: ['/htdocs', '/logs', '/run', '/etc (minimal)', '/cgi-bin']
            }
          ]
        }
      },
      {
        id: 'chroot-model',
        title: 'The Chroot Jail',
        type: 'dataflow',
        why: 'Understanding chroot explains why paths in httpd.conf look wrong, why your app cannot resolve DNS, and why file permissions matter even when running as root.',
        pitfalls: [
          'Paths in httpd.conf must be relative to /var/www, not filesystem root',
          'Chrooted processes cannot see /etc/resolv.conf - DNS resolution fails unless you copy it',
          'Logs write to /var/www/logs, not /var/log - look in the right place'
        ],
        content: {
          description: 'How httpd sees the filesystem from inside its jail',
          nodes: [
            { id: 'real-root', label: 'Real /', type: 'boundary', x: 50, y: 150 },
            { id: 'var-www', label: '/var/www', type: 'process', x: 200, y: 150 },
            { id: 'chroot-root', label: 'Chroot /', type: 'boundary', x: 350, y: 150 },
            { id: 'htdocs', label: '/htdocs', type: 'flow', x: 500, y: 80 },
            { id: 'logs', label: '/logs', type: 'flow', x: 500, y: 150 },
            { id: 'run', label: '/run', type: 'flow', x: 500, y: 220 }
          ],
          edges: [
            { from: 'real-root', to: 'var-www' },
            { from: 'var-www', to: 'chroot-root' },
            { from: 'chroot-root', to: 'htdocs' },
            { from: 'chroot-root', to: 'logs' },
            { from: 'chroot-root', to: 'run' }
          ],
          reveals: {
            'real-root': 'The actual filesystem root. You see this when SSH in. httpd cannot see anything here directly.',
            'var-www': 'The chroot boundary. When httpd starts, the kernel makes this its new root. Everything outside becomes invisible.',
            'chroot-root': 'From httpd perspective, this IS root (/). When httpd.conf says root "/htdocs", it means /var/www/htdocs on the real filesystem.',
            'htdocs': 'Web content lives here. /var/www/htdocs/site on real FS = /htdocs/site in httpd.conf.',
            'logs': 'Access and error logs. /var/www/logs on real FS. Rotate these or they grow forever.',
            'run': 'Runtime files - sockets, PID files. FastCGI sockets go here so httpd can reach them inside the chroot.'
          }
        }
      },
      {
        id: 'www-user',
        title: 'The www User',
        type: 'conceptmap',
        why: 'httpd runs as the www user after binding ports. Understanding this explains permission errors and why root ownership is actually safer than www ownership for most files.',
        pitfalls: [
          'Making web files owned by www - this is LESS secure. www only needs read access.',
          'Forgetting group permissions - www:www ownership means nothing if perms are 700',
          'Upload directories need www write access - these are the exception, not the rule'
        ],
        content: {
          central: 'www user',
          description: 'How the web server user model works',
          branches: [
            {
              id: 'why-www',
              label: 'Why www exists',
              color: '#3b82f6',
              details: 'Privilege separation. httpd starts as root (to bind port 80/443), then drops to www. If exploited, attacker only has www powers, not root.',
              children: ['Binds ports as root', 'Drops to www immediately', 'Cannot escalate back']
            },
            {
              id: 'file-access',
              label: 'File access',
              color: '#22c55e',
              details: 'www needs to READ your files. It does not need to own them. root:wheel or your-user:wheel with 644 perms is fine and safer.',
              children: ['Read: yes (644)', 'Write: rarely (uploads only)', 'Execute: no (not for web files)']
            },
            {
              id: 'common-setup',
              label: 'Typical permissions',
              color: '#f59e0b',
              details: 'Static sites: root owns files, 755 dirs, 644 files. www can read. Upload dirs: www:www, 755. Keep write access minimal.',
              children: ['dirs: 755', 'files: 644', 'uploads: www:www 755']
            },
            {
              id: 'socket-access',
              label: 'Socket access',
              color: '#ef4444',
              details: 'FastCGI/slowcgi sockets must be readable by www. Usually in /var/www/run/. Check socket perms if backend is not reachable.',
              children: ['/var/www/run/*.sock', 'Owned by backend user', 'www needs read access']
            }
          ]
        }
      },
      {
        id: 'config-reload',
        title: 'Config Reload Lifecycle',
        type: 'dataflow',
        why: 'Knowing the reload sequence helps you debug config errors and understand why some changes need restart vs reload.',
        pitfalls: [
          'Editing config and forgetting to reload - old config still running',
          'Using restart when reload would work - unnecessary downtime',
          'Not checking config syntax before reload - service stops on bad config'
        ],
        content: {
          description: 'What happens when you reload a service',
          nodes: [
            { id: 'edit', label: 'Edit config', type: 'boundary', x: 50, y: 150 },
            { id: 'check', label: 'Check syntax', type: 'process', x: 200, y: 150 },
            { id: 'reload', label: 'rcctl reload', type: 'process', x: 350, y: 150 },
            { id: 'signal', label: 'SIGHUP sent', type: 'flow', x: 500, y: 150 },
            { id: 'reread', label: 'Config re-read', type: 'process', x: 650, y: 150 },
            { id: 'active', label: 'New config active', type: 'boundary', x: 800, y: 150 }
          ],
          edges: [
            { from: 'edit', to: 'check' },
            { from: 'check', to: 'reload' },
            { from: 'reload', to: 'signal' },
            { from: 'signal', to: 'reread' },
            { from: 'reread', to: 'active' }
          ],
          reveals: {
            'edit': 'Modify the config file. Changes are NOT active yet. The running daemon still uses the old config in memory.',
            'check': 'Many daemons have syntax check flags. httpd -n, pfctl -nf, relayd -n. Always check before reload.',
            'reload': 'rcctl reload sends a signal to the daemon. If syntax was bad, daemon may stop or ignore the reload.',
            'signal': 'SIGHUP tells the daemon to re-read its config. This is gentler than restart - existing connections may continue.',
            'reread': 'Daemon parses the new config file. If successful, new config becomes active. Errors may be logged.',
            'active': 'New configuration is now in effect. Verify by checking behavior or logs.'
          }
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 2: SERVICE LIFECYCLE
  // ============================================================
  'service-lifecycle': {
    id: 'service-lifecycle',
    title: 'Service Lifecycle',
    description: 'Managing daemons with rcctl and rc.conf.local',
    color: '#3b82f6',
    icon: '⚙️',
    modules: [
      {
        id: 'rcctl-basics',
        title: 'rcctl Fundamentals',
        type: 'conceptmap',
        why: 'rcctl is how you manage every service on OpenBSD. Master it and you can start, stop, enable, debug, and query any daemon.',
        pitfalls: [
          'Forgetting to enable after first start - works now, gone after reboot',
          'Using restart when reload works - causes unnecessary downtime',
          'Not checking rcctl ls failed after boot - silent failures'
        ],
        content: {
          central: 'rcctl',
          description: 'Service control command patterns',
          branches: [
            {
              id: 'lifecycle',
              label: 'Lifecycle commands',
              color: '#3b82f6',
              details: 'Control running state. start/stop/restart/reload. reload is preferred when supported - no downtime.',
              children: ['start', 'stop', 'restart', 'reload', 'check']
            },
            {
              id: 'boot',
              label: 'Boot control',
              color: '#22c55e',
              details: 'Control what starts at boot. enable writes to rc.conf.local. disable removes it. This is persistent.',
              children: ['enable', 'disable', 'get', 'set']
            },
            {
              id: 'query',
              label: 'Query commands',
              color: '#f59e0b',
              details: 'Find out what is running and what is configured. Essential for debugging and auditing.',
              children: ['ls started', 'ls stopped', 'ls failed', 'ls on', 'ls all']
            },
            {
              id: 'pkg-scripts',
              label: 'Package services',
              color: '#ef4444',
              details: 'Services from packages (not base) use pkg_scripts in rc.conf.local. Same rcctl commands work.',
              children: ['postgresql', 'redis', 'nginx', 'Any /etc/rc.d/* from pkg']
            }
          ]
        }
      },
      {
        id: 'daemon-states',
        title: 'Daemon State Machine',
        type: 'dataflow',
        why: 'Understanding the states a daemon can be in helps you diagnose why a service is not running and what to check at each stage.',
        pitfalls: [
          'Service enabled but not started - waits for reboot, use rcctl start',
          'Service started but not enabled - lost on reboot, use rcctl enable',
          'Service failed but enabled - will retry on next boot, check logs NOW'
        ],
        content: {
          description: 'States a daemon moves through',
          nodes: [
            { id: 'disabled', label: 'Disabled', type: 'boundary', x: 50, y: 100 },
            { id: 'enabled', label: 'Enabled', type: 'process', x: 200, y: 100 },
            { id: 'starting', label: 'Starting', type: 'flow', x: 350, y: 100 },
            { id: 'running', label: 'Running', type: 'boundary', x: 500, y: 50 },
            { id: 'failed', label: 'Failed', type: 'boundary', x: 500, y: 150 }
          ],
          edges: [
            { from: 'disabled', to: 'enabled' },
            { from: 'enabled', to: 'starting' },
            { from: 'starting', to: 'running' },
            { from: 'starting', to: 'failed' }
          ],
          reveals: {
            'disabled': 'Service will not start at boot. Can still be started manually with rcctl start. No entry in rc.conf.local.',
            'enabled': 'Service will start at boot. Entry exists in rc.conf.local (daemon_flags not set to NO). Does not mean it is running now.',
            'starting': 'Boot or rcctl start triggered. Daemon is initializing. Config is being parsed, ports being bound.',
            'running': 'Daemon is active and serving requests. rcctl check returns 0. PID file exists in /var/run/.',
            'failed': 'Startup failed. Check /var/log/daemon or service-specific log. rcctl ls failed shows these. Fix config and retry.'
          }
        }
      },
      {
        id: 'rc-conf-local',
        title: 'rc.conf.local Patterns',
        type: 'conceptmap',
        why: 'All persistent service configuration lives in rc.conf.local. Understanding the format lets you read and edit it directly when needed.',
        pitfalls: [
          'Editing rc.conf instead of rc.conf.local - your changes get overwritten on upgrade',
          'Setting _flags=NO vs removing the line - both disable, but NO is explicit',
          'Forgetting pkg_scripts for package daemons - they need explicit listing'
        ],
        content: {
          central: 'rc.conf.local',
          description: 'Service configuration file format',
          branches: [
            {
              id: 'enable-pattern',
              label: 'Enable pattern',
              color: '#3b82f6',
              details: 'daemon_flags="" enables with defaults. Empty string means "use defaults, but start". This is what rcctl enable writes.',
              example: 'httpd_flags=""',
              children: ['Empty quotes = defaults', 'Flags go inside quotes', 'rcctl set changes this']
            },
            {
              id: 'disable-pattern',
              label: 'Disable pattern',
              color: '#22c55e',
              details: 'daemon_flags=NO explicitly disables. Clearer than removing the line. rcctl disable writes this.',
              example: 'sndiod_flags=NO',
              children: ['NO = definitely off', 'Survives upgrade', 'Self-documenting']
            },
            {
              id: 'flags-pattern',
              label: 'Custom flags',
              color: '#f59e0b',
              details: 'Pass arguments to the daemon. Check man page for available flags. rcctl set daemon flags "value" writes this.',
              example: 'sshd_flags="-o PermitRootLogin=no"',
              children: ['man daemon for options', 'Quote the value', 'Multiple flags space-separated']
            },
            {
              id: 'pkg-scripts',
              label: 'Package scripts',
              color: '#ef4444',
              details: 'Daemons from packages must be listed in pkg_scripts to start at boot. Order matters - dependencies first.',
              example: 'pkg_scripts="postgresql redis myapp"',
              children: ['Space-separated list', 'Order = start order', 'All must exist in /etc/rc.d/']
            }
          ]
        }
      },
      {
        id: 'startup-failure',
        title: 'Debugging Startup Failures',
        type: 'faulttree',
        why: 'When a service will not start, you need a systematic approach. This tree covers the common causes in order of likelihood.',
        pitfalls: [
          'Not reading the ACTUAL error message - logs tell you exactly what is wrong',
          'Guessing instead of checking - verify each step before moving on',
          'Fixing the symptom not the cause - understand WHY before applying fix'
        ],
        content: {
          root: 'Service will not start',
          branches: [
            {
              fault: 'Configuration errors',
              icon: 'error',
              causes: [
                {
                  cause: 'Syntax error in config',
                  detail: 'Typo, missing brace, invalid directive. Most daemons refuse to start with bad config.',
                  fix: 'Run syntax check: httpd -n, pfctl -nf /etc/pf.conf, relayd -n. Fix reported errors.'
                },
                {
                  cause: 'Missing required config',
                  detail: 'Some daemons need specific directives to be present. Empty or partial config fails.',
                  fix: 'Check man page for required directives. Compare with working config or examples.'
                },
                {
                  cause: 'Invalid paths in config',
                  detail: 'File or directory referenced in config does not exist or is not readable.',
                  fix: 'Check all paths in config. Remember chroot - httpd paths are relative to /var/www.'
                }
              ]
            },
            {
              fault: 'Permission problems',
              icon: 'warning',
              causes: [
                {
                  cause: 'Cannot read config file',
                  detail: 'Daemon user cannot read its own config. Usually wrong ownership.',
                  fix: 'Check ownership: ls -la /etc/daemon.conf. Usually should be root:wheel 644.'
                },
                {
                  cause: 'Cannot write PID file',
                  detail: 'Daemon cannot create /var/run/daemon.pid. Directory permissions wrong.',
                  fix: 'Check /var/run permissions. Should be 755. May need to create subdirectory.'
                },
                {
                  cause: 'Cannot bind to port',
                  detail: 'Ports below 1024 need root. Or another process already using the port.',
                  fix: 'Check with netstat -an | grep LISTEN. Kill conflicting process or change port.'
                }
              ]
            },
            {
              fault: 'Dependency failures',
              icon: 'warning',
              causes: [
                {
                  cause: 'Required service not running',
                  detail: 'Daemon needs another service (database, network) that is not up yet.',
                  fix: 'Check dependencies. Start them first. Adjust pkg_scripts order for boot.'
                },
                {
                  cause: 'Missing files or directories',
                  detail: 'Data directory, socket path, or required files do not exist.',
                  fix: 'Create required directories. Check man page for setup requirements.'
                }
              ]
            },
            {
              fault: 'Resource exhaustion',
              icon: 'error',
              causes: [
                {
                  cause: 'Out of disk space',
                  detail: 'Cannot write to log or data files. Fills up fast if logging is aggressive.',
                  fix: 'df -h to check. Clean up /var/log, rotate logs, add space.'
                },
                {
                  cause: 'File descriptor limits',
                  detail: 'Daemon needs more open files than default allows. Rare but happens.',
                  fix: 'Check limits with ulimit -n. Adjust in login.conf if needed.'
                }
              ]
            }
          ]
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 3: HTTPD
  // ============================================================
  'httpd': {
    id: 'httpd',
    title: 'httpd Configuration',
    description: 'Serving static files, locations, and TLS',
    color: '#f59e0b',
    icon: '🌐',
    modules: [
      {
        id: 'request-flow',
        title: 'Request Processing Flow',
        type: 'dataflow',
        why: 'Understanding how httpd processes a request explains why your location blocks match (or do not), and where to add rewrite rules.',
        pitfalls: [
          'Location blocks match in order - first match wins, put specific paths first',
          'Root directive sets the base - location root overrides it for that path',
          'Request URI vs filesystem path confusion - httpd maps one to the other'
        ],
        content: {
          description: 'How httpd handles an incoming request',
          nodes: [
            { id: 'request', label: 'HTTP Request', type: 'boundary', x: 50, y: 150 },
            { id: 'server-match', label: 'Match server', type: 'process', x: 180, y: 150 },
            { id: 'location-match', label: 'Match location', type: 'process', x: 320, y: 150 },
            { id: 'rewrite', label: 'Apply rewrites', type: 'process', x: 460, y: 150 },
            { id: 'resolve', label: 'Resolve path', type: 'process', x: 600, y: 150 },
            { id: 'serve', label: 'Serve file', type: 'boundary', x: 740, y: 150 }
          ],
          edges: [
            { from: 'request', to: 'server-match' },
            { from: 'server-match', to: 'location-match' },
            { from: 'location-match', to: 'rewrite' },
            { from: 'rewrite', to: 'resolve' },
            { from: 'resolve', to: 'serve' }
          ],
          reveals: {
            'request': 'Client sends request with Host header and path. Example: GET /app/page HTTP/1.1 Host: jafner.com',
            'server-match': 'httpd finds server block matching the Host header. If no match, first server block is used. Virtual hosting works here.',
            'location-match': 'Within matched server, location blocks are checked in config order. First matching location wins. /* matches everything.',
            'rewrite': 'If location has "request rewrite", URI is modified. Useful for SPAs: rewrite all paths to /index.html.',
            'resolve': 'Final URI mapped to filesystem. root directive + URI = file path. Remember: relative to /var/www chroot.',
            'serve': 'File sent to client with appropriate MIME type. 404 if not found, 403 if no permission, 200 if success.'
          }
        }
      },
      {
        id: 'server-blocks',
        title: 'Server Block Structure',
        type: 'conceptmap',
        why: 'Each server block defines a virtual host. Understanding the structure lets you host multiple sites and configure each differently.',
        pitfalls: [
          'Forgetting quotes around server name - "example.com" not example.com',
          'Multiple listen directives needed for HTTP+HTTPS - cannot combine in one',
          'First server block is default - catches requests that do not match any host'
        ],
        content: {
          central: 'server { }',
          description: 'Components of a server block',
          branches: [
            {
              id: 'identity',
              label: 'Server identity',
              color: '#3b82f6',
              details: 'Server name and aliases. Matched against Host header. Quotes required.',
              example: 'server "example.com" { alias "www.example.com" }',
              children: ['server "name"', 'alias "other-name"', 'First block = default']
            },
            {
              id: 'listen',
              label: 'Listen directives',
              color: '#22c55e',
              details: 'What address and port to bind. Use * for all interfaces. tls keyword enables HTTPS.',
              example: 'listen on * port 80\nlisten on * tls port 443',
              children: ['listen on ADDR port PORT', 'tls keyword', 'Can have multiple']
            },
            {
              id: 'tls',
              label: 'TLS configuration',
              color: '#f59e0b',
              details: 'Certificate and key paths. Paths relative to real filesystem, not chroot.',
              example: 'tls { certificate "/etc/ssl/example.crt" key "/etc/ssl/private/example.key" }',
              children: ['certificate "path"', 'key "path"', 'Outside chroot!']
            },
            {
              id: 'content',
              label: 'Content settings',
              color: '#ef4444',
              details: 'Where files live and what to serve by default. Paths relative to /var/www.',
              example: 'root "/htdocs/example"\ndirectory index index.html',
              children: ['root "/path"', 'directory index FILE', 'directory auto index']
            }
          ]
        }
      },
      {
        id: 'location-blocks',
        title: 'Location Block Patterns',
        type: 'conceptmap',
        why: 'Location blocks let you handle different paths differently - serve files, proxy requests, block access, or redirect.',
        pitfalls: [
          'Locations match in CONFIG order, not specificity - put /api/* before /*',
          'Glob patterns only: * matches anything, no regex support',
          'block return stops processing - nothing after it runs for that location'
        ],
        content: {
          central: 'location { }',
          description: 'Common location block patterns',
          branches: [
            {
              id: 'static',
              label: 'Static files',
              color: '#3b82f6',
              details: 'Serve files from a directory. Override root for this path.',
              example: 'location "/assets/*" { root "/htdocs/app/static" }',
              children: ['root "path"', 'directory index', 'Default behavior']
            },
            {
              id: 'spa',
              label: 'SPA rewrite',
              color: '#22c55e',
              details: 'Single-page apps need all routes to serve index.html. Client-side JS handles routing.',
              example: 'location "/*" { request rewrite "/index.html" }',
              children: ['request rewrite "path"', 'Keeps query string', 'Put after specific locations']
            },
            {
              id: 'redirect',
              label: 'Redirects',
              color: '#f59e0b',
              details: 'Send client to different URL. 301 permanent, 302 temporary. $REQUEST_URI is original path.',
              example: 'location "/old/*" { block return 301 "https://new.com$REQUEST_URI" }',
              children: ['block return 301 "url"', 'block return 302 "url"', '$REQUEST_URI variable']
            },
            {
              id: 'block',
              label: 'Block access',
              color: '#ef4444',
              details: 'Deny access to paths. Return 403 forbidden or 404 not found.',
              example: 'location "/.git/*" { block return 403 }',
              children: ['block return 403', 'block return 404', 'block (drops connection)']
            },
            {
              id: 'fastcgi',
              label: 'FastCGI backend',
              color: '#8b5cf6',
              details: 'Pass requests to backend application via socket. Socket must be in chroot.',
              example: 'location "/api/*" { fastcgi socket "/run/app.sock" }',
              children: ['fastcgi socket "path"', 'Socket in /var/www/run/', 'strip N (remove path prefix)']
            }
          ]
        }
      },
      {
        id: 'tls-setup',
        title: 'TLS Certificate Setup',
        type: 'dataflow',
        why: 'HTTPS requires valid certificates. Understanding the setup flow helps you deploy new sites and renew certs.',
        pitfalls: [
          'Certificate paths are OUTSIDE chroot - use real filesystem paths',
          'Key file must be readable by root only - chmod 600',
          'ACME challenge path must be accessible - location block needed'
        ],
        content: {
          description: 'Setting up TLS with acme-client',
          nodes: [
            { id: 'acme-conf', label: 'acme-client.conf', type: 'boundary', x: 50, y: 150 },
            { id: 'challenge-loc', label: 'Challenge location', type: 'process', x: 200, y: 150 },
            { id: 'run-acme', label: 'Run acme-client', type: 'process', x: 350, y: 150 },
            { id: 'certs', label: 'Certs written', type: 'flow', x: 500, y: 150 },
            { id: 'httpd-tls', label: 'Configure httpd', type: 'process', x: 650, y: 150 },
            { id: 'reload', label: 'Reload httpd', type: 'boundary', x: 800, y: 150 }
          ],
          edges: [
            { from: 'acme-conf', to: 'challenge-loc' },
            { from: 'challenge-loc', to: 'run-acme' },
            { from: 'run-acme', to: 'certs' },
            { from: 'certs', to: 'httpd-tls' },
            { from: 'httpd-tls', to: 'reload' }
          ],
          reveals: {
            'acme-conf': 'Edit /etc/acme-client.conf. Define domain, challenge type (http-01), and where to write certs. See man acme-client.conf.',
            'challenge-loc': 'httpd must serve ACME challenges. Add: location "/.well-known/acme-challenge/*" { root "/acme" request strip 2 }',
            'run-acme': 'Run: acme-client -v example.com. First run registers account and gets certs. Add to cron for renewal.',
            'certs': 'Certs written to paths in acme-client.conf. Typically /etc/ssl/example.com.crt and /etc/ssl/private/example.com.key.',
            'httpd-tls': 'Add tls block to server: tls { certificate "/etc/ssl/example.com.crt" key "/etc/ssl/private/example.com.key" }',
            'reload': 'Reload httpd: rcctl reload httpd. Test with browser or: openssl s_client -connect example.com:443'
          }
        }
      },
      {
        id: 'httpd-403',
        title: 'Debugging 403 Forbidden',
        type: 'faulttree',
        why: 'The dreaded 403. This tree covers the real causes in order of how often they bite you.',
        pitfalls: [
          'MIME type errors are often 403s in disguise - httpd returns HTML error page',
          'Browser dev tools show the symptom, server logs show the cause',
          'Permission fixes need -R for directories - files inside must also be readable'
        ],
        content: {
          root: '403 Forbidden returned',
          branches: [
            {
              fault: 'File permissions',
              icon: 'error',
              causes: [
                {
                  cause: 'www cannot read file',
                  detail: 'File exists but has wrong permissions. www user cannot read it.',
                  fix: 'chmod 644 file (or 755 for dirs). chown does not need to be www - just needs read permission.'
                },
                {
                  cause: 'www cannot traverse directory',
                  detail: 'Directory in path lacks execute permission. www cannot enter it.',
                  fix: 'chmod 755 on ALL directories in the path, not just the final one.'
                },
                {
                  cause: 'Files uploaded with wrong owner',
                  detail: 'scp preserves local UID. Server sees numeric UID that does not exist or has no read access.',
                  fix: 'After upload: doas chown -R www:www /var/www/htdocs/site/ && doas chmod -R 755 /var/www/htdocs/site/'
                }
              ]
            },
            {
              fault: 'Path configuration',
              icon: 'warning',
              causes: [
                {
                  cause: 'Root path wrong in config',
                  detail: 'root directive points to nonexistent directory or wrong location.',
                  fix: 'Check root in httpd.conf. Remember it is relative to /var/www. Verify dir exists.'
                },
                {
                  cause: 'Location block blocking',
                  detail: 'A location block with "block" is matching before your intended location.',
                  fix: 'Check location block order. More specific paths must come BEFORE /* catch-all.'
                },
                {
                  cause: 'No index file',
                  detail: 'Directory request but no index.html and directory listing disabled.',
                  fix: 'Add index file, or add "directory auto index" if listing is desired.'
                }
              ]
            },
            {
              fault: 'Chroot confusion',
              icon: 'warning',
              causes: [
                {
                  cause: 'Path not relative to chroot',
                  detail: 'Used /var/www/htdocs in config instead of /htdocs. httpd sees it as /var/www/var/www/htdocs.',
                  fix: 'Paths in httpd.conf are relative to /var/www. Use /htdocs not /var/www/htdocs.'
                },
                {
                  cause: 'Symlink points outside chroot',
                  detail: 'Symlink target is not inside /var/www. httpd cannot follow it.',
                  fix: 'Move actual files into chroot, or avoid symlinks. Chroot is a hard boundary.'
                }
              ]
            }
          ]
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 4: RELAYD
  // ============================================================
  'relayd': {
    id: 'relayd',
    title: 'relayd (When Needed)',
    description: 'TLS termination and proxying',
    color: '#8b5cf6',
    icon: '🔀',
    modules: [
      {
        id: 'relayd-vs-httpd',
        title: 'When to Use relayd',
        type: 'conceptmap',
        why: 'relayd adds complexity. Use it when httpd alone cannot do what you need. Often httpd native TLS is sufficient.',
        pitfalls: [
          'Adding relayd for TLS when httpd handles it fine - unnecessary complexity',
          'Forgetting to disable httpd TLS when relayd terminates it - double encryption',
          'Not setting X-Forwarded-For - backend sees relayd IP, not client IP'
        ],
        content: {
          central: 'relayd?',
          description: 'Decision framework for using relayd',
          branches: [
            {
              id: 'httpd-enough',
              label: 'httpd is enough',
              color: '#22c55e',
              details: 'For most static sites and simple apps, httpd native TLS works fine. Simpler to configure and debug.',
              children: ['Static files', 'Single backend', 'Simple TLS', 'No load balancing']
            },
            {
              id: 'need-relayd',
              label: 'Need relayd',
              color: '#f59e0b',
              details: 'relayd adds features httpd lacks: load balancing, health checks, header manipulation, multiple backends.',
              children: ['Load balancing', 'Health checks', 'Header rewriting', 'Multiple backends']
            },
            {
              id: 'typical-setup',
              label: 'Typical setup',
              color: '#3b82f6',
              details: 'relayd on port 443 terminates TLS, forwards to httpd on localhost:80. httpd serves content.',
              children: ['relayd: 443 (TLS)', 'httpd: 80 (localhost)', 'Backend apps: high ports']
            },
            {
              id: 'avoid',
              label: 'Avoid unless needed',
              color: '#ef4444',
              details: 'More moving parts = more failure modes. Start with httpd only. Add relayd when you hit its limitations.',
              children: ['Two configs to maintain', 'Two services to monitor', 'Debugging is harder']
            }
          ]
        }
      },
      {
        id: 'relayd-flow',
        title: 'relayd Request Flow',
        type: 'dataflow',
        why: 'When using relayd, requests pass through more stages. Understanding the flow helps debug connection issues.',
        pitfalls: [
          'Client IP lost - must set X-Forwarded-For header in relayd protocol',
          'httpd still needs config - relayd forwards to it, does not replace it',
          'TLS certs in relayd config, not httpd - when relayd terminates TLS'
        ],
        content: {
          description: 'Request flow through relayd to httpd',
          nodes: [
            { id: 'client', label: 'Client', type: 'boundary', x: 50, y: 150 },
            { id: 'relayd-tls', label: 'relayd TLS', type: 'process', x: 180, y: 150 },
            { id: 'relayd-proto', label: 'Protocol rules', type: 'process', x: 320, y: 150 },
            { id: 'forward', label: 'Forward', type: 'flow', x: 460, y: 150 },
            { id: 'httpd', label: 'httpd', type: 'process', x: 600, y: 150 },
            { id: 'response', label: 'Response', type: 'boundary', x: 740, y: 150 }
          ],
          edges: [
            { from: 'client', to: 'relayd-tls' },
            { from: 'relayd-tls', to: 'relayd-proto' },
            { from: 'relayd-proto', to: 'forward' },
            { from: 'forward', to: 'httpd' },
            { from: 'httpd', to: 'response' }
          ],
          reveals: {
            'client': 'Client connects to your server on port 443. Sees relayd, does not know httpd exists.',
            'relayd-tls': 'relayd terminates TLS. Decrypts request. Certs configured in relayd.conf with tls keypair.',
            'relayd-proto': 'Protocol rules applied: headers added/modified, filtering. X-Forwarded-For set here.',
            'forward': 'Plain HTTP forwarded to backend table. Usually localhost:80 where httpd listens.',
            'httpd': 'httpd receives HTTP request (not HTTPS). Processes normally. Does not know about TLS.',
            'response': 'Response flows back through relayd. Re-encrypted with TLS. Sent to client.'
          }
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 5: ACCESS CONTROL
  // ============================================================
  'access-control': {
    id: 'access-control',
    title: 'Access Control',
    description: 'doas, permissions, and the security model',
    color: '#ef4444',
    icon: '🔐',
    modules: [
      {
        id: 'doas-basics',
        title: 'doas Configuration',
        type: 'conceptmap',
        why: 'doas is how you run commands as root (or other users) on OpenBSD. Simpler than sudo, but you need to understand the rule format.',
        pitfalls: [
          'Rules evaluated top-to-bottom, last match wins - put denies after permits',
          'permit vs permit nopass - nopass skips password, use carefully',
          'Testing changes - syntax error locks you out, keep a root shell open'
        ],
        content: {
          central: 'doas.conf',
          description: 'doas rule structure and patterns',
          branches: [
            {
              id: 'rule-format',
              label: 'Rule format',
              color: '#3b82f6',
              details: 'permit/deny [options] identity [as target] [cmd command [args ...]]',
              example: 'permit persist :wheel',
              children: ['permit / deny', 'identity (user or :group)', 'as target', 'cmd specific']
            },
            {
              id: 'options',
              label: 'Options',
              color: '#22c55e',
              details: 'Modify behavior: persist remembers auth, nopass skips it, keepenv preserves environment.',
              example: 'permit nopass jeff cmd /usr/sbin/rcctl',
              children: ['persist (remember)', 'nopass (no password)', 'keepenv', 'setenv { VAR=val }']
            },
            {
              id: 'common-rules',
              label: 'Common patterns',
              color: '#f59e0b',
              details: 'Typical rules you will want.',
              children: ['permit persist :wheel', 'permit nopass USER cmd rcctl', 'permit USER as www']
            },
            {
              id: 'safety',
              label: 'Safety tips',
              color: '#ef4444',
              details: 'Keep a root shell open when editing. Test with doas -C /etc/doas.conf. Have recovery plan.',
              children: ['Keep root shell open', 'doas -C to test', 'Last match wins']
            }
          ]
        }
      },
      {
        id: 'permission-model',
        title: 'Unix Permission Model',
        type: 'conceptmap',
        why: 'File permissions cause most 403 errors. Understanding rwx, numeric modes, and ownership prevents these issues.',
        pitfalls: [
          'Directory needs x to enter, not just r - ls works but cd fails without x',
          'Numeric modes: 7=rwx, 5=rx, 4=r, 0=none - memorize common combos',
          'Group permissions often ignored - but www might access via group'
        ],
        content: {
          central: 'Permissions',
          description: 'User, group, other and rwx',
          branches: [
            {
              id: 'triplet',
              label: 'Permission triplet',
              color: '#3b82f6',
              details: 'rwxrwxrwx = user, group, other. Each position is on or off for that permission class.',
              example: '-rwxr-xr-x = 755',
              children: ['r = read (4)', 'w = write (2)', 'x = execute (1)']
            },
            {
              id: 'common-modes',
              label: 'Common modes',
              color: '#22c55e',
              details: 'Patterns you will use constantly.',
              children: ['755 = dirs, executables', '644 = regular files', '600 = private (keys)', '700 = private dirs']
            },
            {
              id: 'ownership',
              label: 'Ownership',
              color: '#f59e0b',
              details: 'user:group ownership. chown changes it. Files do not need to be owned by www to be served.',
              example: 'chown -R jeff:wheel /var/www/htdocs/site',
              children: ['chown user:group', '-R for recursive', 'www needs read, not own']
            },
            {
              id: 'directory-x',
              label: 'Directory execute bit',
              color: '#ef4444',
              details: 'x on directory means "can enter" (cd into). r means "can list". Need both for ls to work.',
              children: ['r = list contents', 'x = traverse/enter', 'Need x on ALL parents']
            }
          ]
        }
      },
      {
        id: 'permission-debug',
        title: 'Permission Debugging',
        type: 'faulttree',
        why: 'Systematic approach to finding permission problems. Check each level from root to file.',
        pitfalls: [
          'Only checking final file - parent directories also need correct permissions',
          'Forgetting about group - sometimes access is via group membership',
          'SELinux habits - OpenBSD uses traditional Unix permissions, not MAC'
        ],
        content: {
          root: 'Permission denied',
          branches: [
            {
              fault: 'File level',
              icon: 'error',
              causes: [
                {
                  cause: 'File not readable',
                  detail: 'File permissions do not include read for the accessing user/group/other.',
                  fix: 'ls -la file. chmod 644 file for world-readable. Check if www accesses as owner, group, or other.'
                },
                {
                  cause: 'File not executable',
                  detail: 'Script or binary lacks execute permission.',
                  fix: 'chmod +x file or chmod 755 file.'
                }
              ]
            },
            {
              fault: 'Directory level',
              icon: 'warning',
              causes: [
                {
                  cause: 'Cannot traverse parent',
                  detail: 'Some directory in path lacks x permission. Cannot cd through it.',
                  fix: 'Check each directory: ls -ld /var /var/www /var/www/htdocs. All need at least 755.'
                },
                {
                  cause: 'Cannot list directory',
                  detail: 'Directory has x but not r. Can access files if you know names, but cannot list.',
                  fix: 'chmod +r dir or 755 for full access.'
                }
              ]
            },
            {
              fault: 'Ownership',
              icon: 'warning',
              causes: [
                {
                  cause: 'Wrong owner',
                  detail: 'File owned by UID that does not exist or different user. Permissions check fails.',
                  fix: 'chown correct:user file. For web: often root:wheel is fine with 644 perms.'
                },
                {
                  cause: 'Upload preserved local UID',
                  detail: 'scp keeps source UID number. Server does not have that user.',
                  fix: 'After scp: doas chown -R www:www /path/ to fix ownership.'
                }
              ]
            }
          ]
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 6: PF FIREWALL
  // ============================================================
  'pf': {
    id: 'pf',
    title: 'pf Firewall',
    description: 'Host firewall rules and troubleshooting',
    color: '#06b6d4',
    icon: '🛡️',
    modules: [
      {
        id: 'pf-rule-flow',
        title: 'Rule Evaluation Flow',
        type: 'dataflow',
        why: 'pf evaluates rules in order but LAST match wins (unless quick). Understanding this prevents rule ordering bugs.',
        pitfalls: [
          'Last match wins by default - opposite of iptables/location blocks',
          'quick keyword stops processing - use for definite allow/block',
          'block all then pass specific - standard pattern for deny-by-default'
        ],
        content: {
          description: 'How pf evaluates a packet',
          nodes: [
            { id: 'packet', label: 'Packet arrives', type: 'boundary', x: 50, y: 150 },
            { id: 'first', label: 'First rule', type: 'process', x: 180, y: 150 },
            { id: 'next', label: 'Next rule', type: 'process', x: 310, y: 150 },
            { id: 'last', label: 'Last rule', type: 'process', x: 440, y: 150 },
            { id: 'decision', label: 'Final decision', type: 'flow', x: 570, y: 150 },
            { id: 'action', label: 'Pass or block', type: 'boundary', x: 700, y: 150 }
          ],
          edges: [
            { from: 'packet', to: 'first' },
            { from: 'first', to: 'next' },
            { from: 'next', to: 'last' },
            { from: 'last', to: 'decision' },
            { from: 'decision', to: 'action' }
          ],
          reveals: {
            'packet': 'Packet arrives on interface. pf checks if it matches any rules. State table checked first for existing connections.',
            'first': 'First rule in pf.conf checked. If matches, action recorded. Unless "quick" keyword, continue to next rule.',
            'next': 'Each subsequent rule checked. If matches, overwrites previous action. "quick" stops immediately.',
            'last': 'Last matching rule wins (without quick). This is why order matters differently than other firewalls.',
            'decision': 'Final recorded action applied. If no rule matched, default policy (usually block) applies.',
            'action': 'Packet is passed through or blocked/dropped. Logged if rule has "log" keyword.'
          }
        }
      },
      {
        id: 'pf-structure',
        title: 'pf.conf Structure',
        type: 'conceptmap',
        why: 'pf.conf has a specific order: macros, tables, options, normalization, rules. Deviating causes errors.',
        pitfalls: [
          'Sections must be in order - macros before rules that use them',
          'No commas in lists, use { item1 item2 } with spaces',
          'Forgetting to reload after edit - pfctl -f /etc/pf.conf'
        ],
        content: {
          central: 'pf.conf',
          description: 'Configuration file sections',
          branches: [
            {
              id: 'macros',
              label: 'Macros',
              color: '#3b82f6',
              details: 'Variables for reuse. Define interfaces, ports, addresses. Use $name to reference.',
              example: 'ext_if = "vio0"\ntcp_services = "{ ssh http https }"',
              children: ['name = "value"', 'Lists: { a b c }', '$name to reference']
            },
            {
              id: 'tables',
              label: 'Tables',
              color: '#22c55e',
              details: 'Dynamic address lists. Can add/remove at runtime. Good for blocklists.',
              example: 'table <bruteforce> persist',
              children: ['table <name> { IPs }', 'persist survives reload', 'pfctl -t name -T add/del']
            },
            {
              id: 'options',
              label: 'Options',
              color: '#f59e0b',
              details: 'Global settings. skip lo0 is common (do not filter loopback).',
              example: 'set skip on lo\nset block-policy drop',
              children: ['set skip on lo', 'set block-policy', 'set state-policy']
            },
            {
              id: 'rules',
              label: 'Filter rules',
              color: '#ef4444',
              details: 'The actual pass/block rules. Last match wins unless quick. Order matters.',
              example: 'block all\npass out quick\npass in on $ext_if proto tcp to port $tcp_services',
              children: ['block / pass', 'in / out', 'on interface', 'proto tcp/udp', 'to port X']
            }
          ]
        }
      },
      {
        id: 'pf-common-rules',
        title: 'Common Rule Patterns',
        type: 'conceptmap',
        why: 'Standard patterns cover most host firewall needs. Start with these, customize as needed.',
        pitfalls: [
          'Blocking outbound too aggressively - your server needs to reach apt repos, DNS, etc.',
          'Forgetting ICMP - blocking ping can make debugging hard',
          'Overcomplicating - simple rules are easier to audit and debug'
        ],
        content: {
          central: 'Common rules',
          description: 'Patterns for host firewall',
          branches: [
            {
              id: 'deny-default',
              label: 'Deny by default',
              color: '#ef4444',
              details: 'Block everything, then allow specific services. Safest approach.',
              example: 'block all\npass out quick\npass in on $ext_if proto tcp to port { ssh http https }',
              children: ['block all first', 'pass out quick', 'pass in specific ports']
            },
            {
              id: 'ssh-protect',
              label: 'SSH protection',
              color: '#f59e0b',
              details: 'Rate limit SSH to prevent brute force. Overload table blocks repeat offenders.',
              example: 'pass in on $ext_if proto tcp to port ssh keep state (max-src-conn 5, max-src-conn-rate 3/10, overload <bruteforce> flush global)',
              children: ['max-src-conn', 'max-src-conn-rate', 'overload <table>']
            },
            {
              id: 'allow-icmp',
              label: 'Allow ping',
              color: '#22c55e',
              details: 'ICMP echo lets you ping the server. Useful for monitoring and debugging.',
              example: 'pass in inet proto icmp icmp-type echoreq',
              children: ['proto icmp', 'icmp-type echoreq', 'Helps debugging']
            },
            {
              id: 'logging',
              label: 'Logging',
              color: '#3b82f6',
              details: 'Add "log" to rules to record matches. View with tcpdump -i pflog0.',
              example: 'block log all',
              children: ['log keyword', 'tcpdump -i pflog0', 'pflog0 interface']
            }
          ]
        }
      },
      {
        id: 'pf-debug',
        title: 'Debugging Connection Issues',
        type: 'faulttree',
        why: 'When you cannot connect to a service, pf is often the culprit. Systematic debugging finds the block.',
        pitfalls: [
          'Assuming service is down when it is actually blocked - check pf first',
          'Not checking state table - established connections use state, not rules',
          'Testing from same machine - loopback skipped, test from external host'
        ],
        content: {
          root: 'Cannot connect to service',
          branches: [
            {
              fault: 'pf blocking',
              icon: 'error',
              causes: [
                {
                  cause: 'No pass rule for port',
                  detail: 'Service port not in allowed list. Default deny blocks it.',
                  fix: 'Add pass rule: pass in on $ext_if proto tcp to port NNNN'
                },
                {
                  cause: 'Rule order wrong',
                  detail: 'Block rule after pass rule overwrites it (last match wins).',
                  fix: 'Add "quick" to pass rule, or reorder. pfctl -sr to see evaluated order.'
                },
                {
                  cause: 'IP in block table',
                  detail: 'Your IP landed in a dynamic blocklist (bruteforce protection, etc).',
                  fix: 'pfctl -t bruteforce -T show. Delete your IP: pfctl -t bruteforce -T delete YOUR.IP'
                }
              ]
            },
            {
              fault: 'Service issues',
              icon: 'warning',
              causes: [
                {
                  cause: 'Service not running',
                  detail: 'pf is fine but service is down. Connection refused.',
                  fix: 'rcctl check service. netstat -an | grep LISTEN to see what is listening.'
                },
                {
                  cause: 'Listening on wrong address',
                  detail: 'Service bound to localhost only, not external interface.',
                  fix: 'Check service config. Many default to 127.0.0.1. Change to 0.0.0.0 or specific IP.'
                }
              ]
            },
            {
              fault: 'Diagnosis tools',
              icon: 'info',
              causes: [
                {
                  cause: 'Check if blocked',
                  detail: 'Watch pflog to see if packets are being blocked.',
                  fix: 'tcpdump -n -e -ttt -i pflog0. Try connecting. See if block logged.'
                },
                {
                  cause: 'Check current rules',
                  detail: 'See what rules are active.',
                  fix: 'pfctl -sr shows filter rules. pfctl -ss shows state table.'
                },
                {
                  cause: 'Test syntax',
                  detail: 'Check pf.conf for errors before loading.',
                  fix: 'pfctl -nf /etc/pf.conf (dry run). Fix errors before pfctl -f.'
                }
              ]
            }
          ]
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 7: PACKAGES & UPDATES
  // ============================================================
  'packages': {
    id: 'packages',
    title: 'Packages & Updates',
    description: 'Installing software and keeping the system current',
    color: '#84cc16',
    icon: '📦',
    modules: [
      {
        id: 'pkg-workflow',
        title: 'Package Management Workflow',
        type: 'dataflow',
        why: 'pkg_add/pkg_delete/pkg_info are your tools for managing software. Understanding the workflow prevents dependency issues.',
        pitfalls: [
          'Not running pkg_add -u regularly - packages get stale, security issues accumulate',
          'Removing packages without checking dependents - may break other software',
          'Forgetting pkg_scripts in rc.conf.local - package daemons need explicit enable'
        ],
        content: {
          description: 'Finding, installing, and removing packages',
          nodes: [
            { id: 'search', label: 'Search', type: 'boundary', x: 50, y: 150 },
            { id: 'info', label: 'Check info', type: 'process', x: 170, y: 150 },
            { id: 'install', label: 'Install', type: 'process', x: 290, y: 150 },
            { id: 'configure', label: 'Configure', type: 'process', x: 410, y: 150 },
            { id: 'enable', label: 'Enable service', type: 'process', x: 530, y: 150 },
            { id: 'running', label: 'Running', type: 'boundary', x: 650, y: 150 }
          ],
          edges: [
            { from: 'search', to: 'info' },
            { from: 'info', to: 'install' },
            { from: 'install', to: 'configure' },
            { from: 'configure', to: 'enable' },
            { from: 'enable', to: 'running' }
          ],
          reveals: {
            'search': 'pkg_info -Q name searches available packages. Use partial names. Multiple results show flavors and versions.',
            'info': 'pkg_info -d package shows description before install. Check it is what you want and note dependencies.',
            'install': 'pkg_add package installs with dependencies. May prompt for flavor choice. -v for verbose output.',
            'configure': 'Check install message (pkg_info -M package). Often says where config goes (/usr/local/etc/) and setup steps.',
            'enable': 'For daemons: add to pkg_scripts in rc.conf.local, then rcctl enable/start. Not automatic!',
            'running': 'Service is running. Check with rcctl check. Logs usually in /var/log/daemon or package-specific location.'
          }
        }
      },
      {
        id: 'system-updates',
        title: 'System Update Process',
        type: 'dataflow',
        why: 'OpenBSD separates base system (syspatch/sysupgrade) from packages (pkg_add -u). Both need regular attention.',
        pitfalls: [
          'Confusing syspatch and sysupgrade - patch is within release, upgrade is between releases',
          'Not rebooting after syspatch - kernel patches need reboot to take effect',
          'Updating packages before base - can cause library mismatches'
        ],
        content: {
          description: 'Keeping OpenBSD current',
          nodes: [
            { id: 'check', label: 'Check available', type: 'boundary', x: 50, y: 150 },
            { id: 'backup', label: 'Backup first', type: 'process', x: 180, y: 150 },
            { id: 'syspatch', label: 'syspatch', type: 'process', x: 310, y: 150 },
            { id: 'reboot', label: 'Reboot', type: 'process', x: 440, y: 150 },
            { id: 'pkgup', label: 'pkg_add -u', type: 'process', x: 570, y: 150 },
            { id: 'verify', label: 'Verify', type: 'boundary', x: 700, y: 150 }
          ],
          edges: [
            { from: 'check', to: 'backup' },
            { from: 'backup', to: 'syspatch' },
            { from: 'syspatch', to: 'reboot' },
            { from: 'reboot', to: 'pkgup' },
            { from: 'pkgup', to: 'verify' }
          ],
          reveals: {
            'check': 'syspatch -c lists available patches. pkg_add -u -n shows what packages would update. Plan your maintenance window.',
            'backup': 'Before major updates, backup /etc and any custom configs. Snapshot if virtualized. Have rollback plan.',
            'syspatch': 'Run syspatch to apply binary patches. For -release only (not -current). Quick, applies to running system.',
            'reboot': 'Kernel patches need reboot. Schedule it. After reboot, verify services came back up.',
            'pkgup': 'pkg_add -u updates all packages. Do after base system is current. May take a while.',
            'verify': 'Check services are running: rcctl ls failed. Test critical functionality. Review /var/log/messages.'
          }
        }
      },
      {
        id: 'sysupgrade',
        title: 'Release Upgrades',
        type: 'dataflow',
        why: 'sysupgrade moves between OpenBSD releases (e.g., 7.4 to 7.5). Different from patches within a release.',
        pitfalls: [
          'Skipping releases - upgrade one version at a time, not 7.3 to 7.5 directly',
          'Not reading upgrade guide - each release has specific notes at openbsd.org',
          'Forgetting to upgrade packages after - base and packages must match'
        ],
        content: {
          description: 'Upgrading between OpenBSD releases',
          nodes: [
            { id: 'plan', label: 'Read upgrade guide', type: 'boundary', x: 50, y: 150 },
            { id: 'backup', label: 'Full backup', type: 'process', x: 200, y: 150 },
            { id: 'sysupgrade', label: 'sysupgrade', type: 'process', x: 350, y: 150 },
            { id: 'reboot', label: 'Reboot (auto)', type: 'flow', x: 500, y: 150 },
            { id: 'packages', label: 'pkg_add -u', type: 'process', x: 650, y: 150 },
            { id: 'cleanup', label: 'Cleanup', type: 'boundary', x: 800, y: 150 }
          ],
          edges: [
            { from: 'plan', to: 'backup' },
            { from: 'backup', to: 'sysupgrade' },
            { from: 'sysupgrade', to: 'reboot' },
            { from: 'reboot', to: 'packages' },
            { from: 'packages', to: 'cleanup' }
          ],
          reveals: {
            'plan': 'Read https://www.openbsd.org/faq/upgrade[XX].html for your target version. Note config changes, removed features.',
            'backup': 'Full backup: /etc, /home, databases, web content. Test restore before proceeding.',
            'sysupgrade': 'Run sysupgrade. Downloads sets, verifies signatures, schedules install. Then reboots automatically.',
            'reboot': 'System reboots into upgrade mode. Installs new base system. Reboots again into new version.',
            'packages': 'IMPORTANT: pkg_add -u immediately. Packages must match base version. May need manual intervention for major changes.',
            'cleanup': 'Remove old files: sysmerge for config file updates. Check upgrade guide for specific cleanup steps.'
          }
        }
      }
    ]
  },

  // ============================================================
  // CATEGORY 8: MAINTENANCE
  // ============================================================
  'maintenance': {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Logs, backups, and regular health checks',
    color: '#64748b',
    icon: '🔧',
    modules: [
      {
        id: 'log-locations',
        title: 'Log File Locations',
        type: 'conceptmap',
        why: 'Knowing where logs live is essential for debugging. OpenBSD keeps logs in predictable places.',
        pitfalls: [
          'Looking in /var/log for httpd logs - they are in /var/www/logs (chroot!)',
          'Not checking daemon log - many errors only appear here',
          'Forgetting logs rotate - old issues may be in .0 or .gz files'
        ],
        content: {
          central: 'Log files',
          description: 'Where to find different logs',
          branches: [
            {
              id: 'system',
              label: 'System logs',
              color: '#3b82f6',
              details: 'General system messages. Most important log to check first.',
              children: ['/var/log/messages', '/var/log/daemon', '/var/log/authlog', 'dmesg (kernel)']
            },
            {
              id: 'web',
              label: 'Web server logs',
              color: '#22c55e',
              details: 'httpd logs in chroot. Access log shows requests, error log shows problems.',
              children: ['/var/www/logs/access.log', '/var/www/logs/error.log', 'Per-server logs possible']
            },
            {
              id: 'packages',
              label: 'Package logs',
              color: '#f59e0b',
              details: 'Package daemons log to their own files or syslog. Check /var/log/ and /usr/local/var/.',
              children: ['Check daemon docs', '/var/log/daemon often', '/usr/local/var/ sometimes']
            },
            {
              id: 'rotation',
              label: 'Log rotation',
              color: '#ef4444',
              details: 'newsyslog rotates logs. Old logs get .0, .1, .gz suffix. Configure in /etc/newsyslog.conf.',
              children: ['newsyslog.conf', 'rotated files: .0, .1.gz', 'Configure size/time triggers']
            }
          ]
        }
      },
      {
        id: 'backup-strategy',
        title: 'Backup Strategy',
        type: 'conceptmap',
        why: 'Backups let you recover from disasters. Know what to back up and how to restore.',
        pitfalls: [
          'Backing up only /etc - forgetting /var/www, databases, user data',
          'Never testing restore - backup is useless if you cannot restore',
          'Keeping backups on same disk - fire/disk failure takes both'
        ],
        content: {
          central: 'Backups',
          description: 'What to backup and how',
          branches: [
            {
              id: 'what',
              label: 'What to backup',
              color: '#3b82f6',
              details: 'System config, web content, databases, user data. Skip /usr (reinstall from packages).',
              children: ['/etc (configs)', '/var/www/htdocs', 'Databases', '/home']
            },
            {
              id: 'how',
              label: 'Backup methods',
              color: '#22c55e',
              details: 'dump for full filesystem, tar/rsync for files, pg_dump for postgres. Multiple methods = defense in depth.',
              children: ['dump (full FS)', 'tar/rsync (files)', 'pg_dump (databases)', 'VM snapshots']
            },
            {
              id: 'where',
              label: 'Backup storage',
              color: '#f59e0b',
              details: 'Offsite critical. At minimum: different disk. Better: different machine. Best: different location.',
              children: ['Different disk', 'Different machine', 'Offsite/cloud', '3-2-1 rule']
            },
            {
              id: 'restore',
              label: 'Restore testing',
              color: '#ef4444',
              details: 'Periodically test restore to verify backups work. Document the procedure. Time the process.',
              children: ['Test quarterly', 'Document steps', 'Time the restore', 'Verify data integrity']
            }
          ]
        }
      },
      {
        id: 'health-checks',
        title: 'Regular Health Checks',
        type: 'dataflow',
        why: 'Proactive monitoring catches problems before they cause outages. Build these checks into your routine.',
        pitfalls: [
          'Only checking when something breaks - by then damage is done',
          'Not setting up monitoring - manual checks get forgotten',
          'Ignoring small warnings - they become big problems'
        ],
        content: {
          description: 'Routine checks to run',
          nodes: [
            { id: 'services', label: 'Check services', type: 'process', x: 50, y: 150 },
            { id: 'disk', label: 'Check disk', type: 'process', x: 200, y: 150 },
            { id: 'patches', label: 'Check patches', type: 'process', x: 350, y: 150 },
            { id: 'logs', label: 'Check logs', type: 'process', x: 500, y: 150 },
            { id: 'backups', label: 'Verify backups', type: 'process', x: 650, y: 150 }
          ],
          edges: [
            { from: 'services', to: 'disk' },
            { from: 'disk', to: 'patches' },
            { from: 'patches', to: 'logs' },
            { from: 'logs', to: 'backups' }
          ],
          reveals: {
            services: 'rcctl ls failed shows stopped services. rcctl check daemon for specific services. Also: netstat -an | grep LISTEN to see what is listening.',
            disk: 'df -h shows filesystem usage. Watch for >80% on / or /var. du -sh /var/* to find what is consuming space if needed.',
            patches: 'syspatch -c shows available patches (for -release). pkg_add -u -n shows what packages would be updated. Apply as appropriate.',
            logs: 'grep -i error /var/log/messages recent entries. Check /var/www/logs/error.log. Look for patterns, not just individual errors.',
            backups: 'Confirm backup job ran (check cron logs). Periodically do test restore to verify backups are valid. Old backups are useless if corrupted.',
          }
        }
      }
    ]
  },
};
