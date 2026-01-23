// ============================================================
// APP CONFIGURATION — Docker & Container Fundamentals (v0)
// ============================================================

export const config = {
  // App identity
  title: 'Docker & Container Fundamentals',
  subtitle: 'Build a working mental model (and debug faster)',

  // localStorage key - use unique name per project to avoid conflicts
  storageKey: 'learning-docker-v0-progress',

  // Visualization theme colors (hex). Used for inline styles.
  theme: {
    dataflow: '#0ea5e9',   // sky-500
    conceptmap: '#22c55e', // green-500
    faulttree: '#f97316',  // orange-500
  },

  // Feature flags
  features: {
    quickReview: true,
    reference: true,
    notes: true,
    export: true,
    print: true,
  },
};

export const referenceData = {
  sections: [
    {
      id: 'glossary',
      title: 'Glossary',
      content: [
        { term: 'Image', definition: 'An immutable filesystem snapshot + metadata (the template). Built from layers.' },
        { term: 'Container', definition: 'A running (or stopped) process with isolation (namespaces), limits (cgroups), and a writable layer on top of an image.' },
        { term: 'Layer', definition: 'A filesystem diff produced by an image build step. Images are stacks of layers.' },
        { term: 'Registry', definition: 'A service that stores and serves images (e.g., Docker Hub, GHCR).' },
        { term: 'Namespace', definition: 'Kernel feature that gives a process its own “view” of something (PIDs, network, mount points, etc.).' },
        { term: 'cgroup', definition: 'Kernel feature that limits/measures resources for a process group (CPU, memory, I/O).' },
        { term: 'Bind mount', definition: 'Mount a host path into a container path (tight coupling to host filesystem).' },
        { term: 'Named volume', definition: 'Docker-managed persistent storage (portable, lifecycle independent of a container).' },
        { term: 'Bridge network', definition: 'Default Docker network mode. Containers get private IPs; host does NAT/port publishing.' },
        { term: 'Port publish', definition: 'Expose container port to host (e.g., -p 8080:80).' },
      ],
    },
    {
      id: 'commands',
      title: 'Command Cheat Sheet',
      content: [
        { term: 'Build', definition: 'docker build -t myapp:dev .' },
        { term: 'Run', definition: 'docker run --rm -p 8080:80 myapp:dev' },
        { term: 'List', definition: 'docker ps (running) | docker ps -a (all)' },
        { term: 'Logs', definition: 'docker logs <container>' },
        { term: 'Shell', definition: 'docker exec -it <container> sh (or bash)' },
        { term: 'Inspect', definition: 'docker inspect <container-or-image>' },
        { term: 'Disk', definition: 'docker system df | docker system prune' },
        { term: 'Compose', definition: 'docker compose up -d | docker compose logs -f' },
      ],
    },
  ],
};
