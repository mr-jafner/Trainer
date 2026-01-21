// ============================================================
// APP CONFIGURATION
// OpenBSD System Administration Learning Platform
// ============================================================

export const config = {
  title: 'OpenBSD Admin',
  subtitle: 'Visual guide to system administration',
  
  // Unique storage key for this project
  storageKey: 'openbsd-admin-progress',
  
  theme: {
    primary: 'orange',       // OpenBSD's color
    bgDark: 'slate-900',
    bgMedium: 'slate-800', 
    bgLight: 'slate-700',
    dataflow: '#3b82f6',     // blue
    conceptmap: '#22c55e',   // green
    faulttree: '#f59e0b',    // amber
  },
  
  shortcuts: {
    quickReview: 'q',
    reference: 'r',
    export: 'e',
    print: 'p',
    help: '?',
  },
  
  features: {
    sandbox: false,          // No CLI sandbox for this platform
    exercises: false,        // Reference-focused, not exercise-focused
    reference: true,         // Config syntax reference panel
    notes: true,
    bookmarks: true,
    export: true,
    print: true,
  },
};

// ============================================================
// REFERENCE DATA
// Config file syntax and common commands
// ============================================================

export const referenceData = {
  sections: [
    // --------------------------------------------------------
    // CONFIG FILE SYNTAX
    // --------------------------------------------------------
    {
      id: 'httpd-conf',
      title: 'httpd.conf',
      content: `# /etc/httpd.conf

# Global options
prefork 3                    # Number of server processes

# Server block
server "example.com" {
    listen on * port 80
    listen on * tls port 443
    
    # TLS configuration
    tls {
        certificate "/etc/ssl/example.com.crt"
        key "/etc/ssl/private/example.com.key"
    }
    
    # Document root (relative to chroot /var/www)
    root "/htdocs/example.com"
    
    # Directory index
    directory index index.html
    
    # Location blocks (matched in order)
    location "/.well-known/acme-challenge/*" {
        root "/acme"
        request strip 2
    }
    
    location "/api/*" {
        fastcgi socket "/run/app.sock"
    }
    
    location "/*" {
        # For SPAs: serve index.html for all routes
        request rewrite "/index.html"
    }
    
    # Block access
    location "/secret/*" {
        block return 403
    }
    
    # Redirect
    location "/old/*" {
        block return 301 "https://example.com/new/$1"
    }
}

# Alias for www subdomain
server "www.example.com" {
    listen on * port 80
    block return 301 "https://example.com$REQUEST_URI"
}

# Types (usually in separate file)
types {
    include "/usr/share/misc/mime.types"
}`
    },
    {
      id: 'relayd-conf',
      title: 'relayd.conf',
      content: `# /etc/relayd.conf

# Macros
ext_addr="egress"

# Global options
log state changes
log connection errors

# HTTP protocol definition
http protocol "https" {
    tls keypair "example.com"
    
    # Pass headers to backend
    match request header set "X-Forwarded-For" value "$REMOTE_ADDR"
    match request header set "X-Forwarded-Proto" value "https"
    
    # Return codes to pass through
    return error
}

# Relay definition
relay "www" {
    listen on $ext_addr port 443 tls
    protocol "https"
    forward to <httpd> port 80
}

# Backend table
table <httpd> { 127.0.0.1 }

# Redirect HTTP to HTTPS
relay "http_redirect" {
    listen on $ext_addr port 80
    protocol "http"
    forward to <httpd> port 80
}`
    },
    {
      id: 'pf-conf',
      title: 'pf.conf',
      content: `# /etc/pf.conf

# Macros
ext_if = "vio0"              # External interface
tcp_services = "{ ssh, http, https }"

# Tables
table <bruteforce> persist

# Options
set skip on lo               # Skip loopback
set block-policy drop        # Silently drop blocked packets

# Normalization
match in all scrub (no-df random-id)

# NAT (if needed)
# match out on $ext_if from 192.168.1.0/24 nat-to ($ext_if)

# Default deny
block all

# Allow outbound
pass out quick on $ext_if

# Allow inbound services
pass in on $ext_if proto tcp to port $tcp_services

# SSH brute force protection
pass in on $ext_if proto tcp to port ssh \\
    keep state (max-src-conn 5, max-src-conn-rate 3/10, \\
    overload <bruteforce> flush global)

# Block brute forcers
block in quick from <bruteforce>

# Allow ping (optional)
pass in on $ext_if inet proto icmp icmp-type echoreq`
    },
    {
      id: 'doas-conf',
      title: 'doas.conf',
      content: `# /etc/doas.conf
# Simple rules, evaluated top-to-bottom, last match wins

# Allow wheel group to run any command as root
permit persist :wheel

# Allow specific user to run specific command without password
permit nopass jeff as root cmd /usr/sbin/rcctl

# Allow user to run commands as www user
permit jeff as www

# Deny a specific command
deny jeff cmd /sbin/reboot

# Keep environment variables
permit persist keepenv :wheel

# Pass specific environment variables
permit setenv { PKG_PATH http://... } jeff cmd pkg_add`
    },
    {
      id: 'rc-conf',
      title: 'rc.conf.local',
      content: `# /etc/rc.conf.local
# Local daemon configuration - overrides /etc/rc.conf

# Enable daemons
httpd_flags=""               # Empty means "start normally"
relayd_flags=""
smtpd_flags=""

# Disable daemons (set to NO)
sndiod_flags=NO

# Daemon-specific options
sshd_flags="-o PermitRootLogin=no"
ntpd_flags="-s"              # Set time immediately at boot

# Package daemon (from packages, not base)
pkg_scripts="redis postgresql"

# Network configuration
# (Usually in /etc/hostname.if files instead)`
    },
    // --------------------------------------------------------
    // COMMON COMMANDS
    // --------------------------------------------------------
    {
      id: 'rcctl-cmds',
      title: 'rcctl commands',
      content: `# Service management with rcctl

# Check status
rcctl check httpd            # Is it running?
rcctl ls started             # List all running services
rcctl ls failed              # List services that failed to start
rcctl ls on                  # List enabled services
rcctl ls all                 # List all available services

# Start/stop/restart
rcctl start httpd
rcctl stop httpd
rcctl restart httpd
rcctl reload httpd           # Reload config without restart

# Enable/disable at boot
rcctl enable httpd
rcctl disable httpd

# Get/set flags
rcctl get httpd              # Show all settings
rcctl get httpd flags        # Show just flags
rcctl set httpd flags "-v"   # Set flags

# For pkg_scripts (packages)
rcctl enable postgresql
rcctl start postgresql`
    },
    {
      id: 'pkg-cmds',
      title: 'Package commands',
      content: `# Package management

# Search
pkg_info -Q vim              # Search available packages
pkg_info -Q "description:*editor*"

# Install
pkg_add vim                  # Install package
pkg_add vim-8.2.0-no_x11     # Specific version/flavor
pkg_add -u                   # Update all packages
pkg_add -u vim               # Update specific package

# Remove
pkg_delete vim               # Remove package
pkg_delete -a                # Remove unused dependencies

# Query installed
pkg_info                     # List all installed
pkg_info vim                 # Info about specific package
pkg_info -L vim              # List files in package
pkg_info -f vim              # Show install message again

# Find what owns a file
pkg_info -E /usr/local/bin/vim

# Check for issues
pkg_check                    # Verify installed packages`
    },
    {
      id: 'pf-cmds',
      title: 'pf commands',
      content: `# Firewall management with pfctl

# Load/reload rules
pfctl -f /etc/pf.conf        # Load ruleset
pfctl -nf /etc/pf.conf       # Test syntax only (dry run)

# Enable/disable
pfctl -e                     # Enable pf
pfctl -d                     # Disable pf

# View rules
pfctl -sr                    # Show filter rules
pfctl -sn                    # Show NAT rules
pfctl -sa                    # Show everything

# View state
pfctl -ss                    # Show state table
pfctl -si                    # Show statistics

# Tables
pfctl -t bruteforce -T show  # Show table contents
pfctl -t bruteforce -T add 1.2.3.4
pfctl -t bruteforce -T delete 1.2.3.4
pfctl -t bruteforce -T flush # Clear table

# Logging
tcpdump -n -e -ttt -i pflog0 # Watch blocked packets`
    },
    {
      id: 'file-cmds',
      title: 'Files & permissions',
      content: `# File permissions

# View
ls -la                       # Long listing with permissions
stat file                    # Detailed file info

# Change ownership
chown www:www file           # Change owner and group
chown -R www:www dir/        # Recursive

# Change permissions
chmod 755 dir/               # rwxr-xr-x
chmod 644 file               # rw-r--r--
chmod -R 755 dir/            # Recursive

# Common permission patterns
# 755 = directories, executables
# 644 = regular files
# 600 = private files (keys, configs with secrets)

# Web server typical setup
chown -R www:www /var/www/htdocs/site/
chmod -R 755 /var/www/htdocs/site/
find /var/www/htdocs/site -type f -exec chmod 644 {} \\;`
    },
    {
      id: 'system-cmds',
      title: 'System commands',
      content: `# System administration

# Updates
syspatch                     # Apply binary patches (release only)
syspatch -c                  # Check for available patches
syspatch -l                  # List installed patches
syspatch -r                  # Revert last patch

# System upgrade (between releases)
sysupgrade                   # Download and schedule upgrade
sysupgrade -n                # Download only, no reboot
sysupgrade -r                # Resume interrupted upgrade

# View logs
tail -f /var/log/messages    # System log
tail -f /var/log/daemon      # Daemon log
tail -f /var/log/authlog     # Auth log
tail -f /var/www/logs/access.log
tail -f /var/www/logs/error.log
dmesg                        # Kernel ring buffer

# Disk usage
df -h                        # Filesystem usage
du -sh /var/*                # Directory sizes

# Process management
ps aux                       # All processes
top -s 1                     # Process monitor
fstat                        # Open files by process

# Check what is listening
netstat -an -f inet | grep LISTEN
fstat | grep internet`
    },
  ]
};
