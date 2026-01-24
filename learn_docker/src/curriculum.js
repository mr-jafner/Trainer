// ============================================================
// CURRICULUM — Docker & Container Fundamentals (v0)
// Mental models > memorization. Build → Run → Debug.
// ============================================================

export const curriculum = {
  // ------------------------------------------------------------
  // CATEGORY 1: The Container Mental Model
  // ------------------------------------------------------------
  mentalModel: {
    id: 'mentalModel',
    title: 'Container Mental Model',
    description: 'What containers actually are (and what they are not)',
    color: '#0ea5e9',
    icon: '🧠',
    modules: [

{
  id: 'mm-00',
  title: 'Cheat Sheet: 5 Things to Remember',
  type: 'conceptmap',
  why: 'This is a one-page mental compression: relationships and “rules of thumb” you can recall under pressure.',
  pitfalls: [
    'Treating it like a tutorial — it’s a map, not a movie.',
    'Trying to memorize commands without the mental model.',
  ],
  content: {
    central: 'Docker Cheat Sheet (v0)',
    description: 'Atoms (terms) live in the reference panel. This page is the relationships.',
    branches: [
      {
        id: 'mm-00-image',
        label: 'Image vs Container',
        color: '#22c55e',
        details: 'Image = template (read-only layers). Container = running instance (adds a writable layer).',
        example: 'Deleting a container deletes its writable layer; volumes persist.',
        children: [
          'Image: immutable snapshot of filesystem + metadata',
          'Container: a process + mounts + network + writable layer',
          'Volume: persistent data outside the container layer',
        ],
      },
      {
        id: 'mm-00-build',
        label: 'Build vs Run',
        color: '#0ea5e9',
        details: 'Build creates an image (layers + cache). Run creates a container (mounts + networking + PID 1).',
        example: 'Build problems: Dockerfile, context, caching. Run problems: env, ports, volumes, permissions.',
        children: [
          'Build: docker build → image',
          'Run: docker run / compose up → container',
          '“Works in build” ≠ “works at runtime” (missing env, wrong ports, mounts)',
        ],
      },
      {
        id: 'mm-00-cache',
        label: 'Layer Caching',
        color: '#a855f7',
        details: 'Cache hits happen when a step’s inputs are unchanged. Order Dockerfile steps to keep expensive steps stable.',
        example: 'Copy package.json → install deps → then copy the rest of the source.',
        children: [
          'Put “rarely changes” steps first',
          'Use .dockerignore to shrink context',
          'Multi-stage builds keep runtime images small',
        ],
      },
      {
        id: 'mm-00-vol',
        label: 'Persistence',
        color: '#f59e0b',
        details: 'Containers are cattle; volumes are memory. Bind mounts = host path. Named volumes = Docker-managed.',
        example: 'Databases usually use named volumes.',
        children: [
          'Bind mount: ./src:/app/src (great for dev)',
          'Named volume: pgdata:/var/lib/postgresql/data',
          'Do not mount over /app unless you mean to replace image contents',
        ],
      },
      {
        id: 'mm-00-net',
        label: 'Networking',
        color: '#ef4444',
        details: 'Host port mapping exposes a container port to the host. Inside a Compose network, services talk by name.',
        example: 'Host uses localhost:8080; containers use http://web:80 or db:5432.',
        children: [
          'Bridge: default; containers get private IPs',
          'Port mapping: -p 8080:80 (host:container)',
          'Compose DNS: service name becomes hostname',
        ],
      },
    ],
  },
},
      {
        id: 'mm-01',
        title: 'What Is a Container, Really?',
        type: 'conceptmap',
        why: 'This replaces the vague "lightweight VM" idea with a kernel-level mental model. You’ll use it anytime Docker behaves "weird" (processes, files, networking, permissions).',
        pitfalls: [
          "Assuming a container is a VM — you’ll reach for VM fixes (and miss the real cause).",
          "Forgetting “container == process” — PID 1 behavior surprises you (signals, exit codes).",
          "Thinking isolation is absolute — containers share the host kernel; some escapes are possible if you run as root carelessly."
        ],
        content: {
          central: 'A container is a process with isolation + limits',
          description: 'Container behavior comes from three main ingredients.',
          branches: [
            {
              id: 'mm-01-ns',
              label: 'Namespaces',
              color: '#22c55e',
              details: 'Namespaces give a process its own “view” of system resources (like its own map of reality). Think “separate rooms” in the same building.',
              example: 'Examples: PID namespace (process list), net namespace (interfaces/IPs), mount namespace (filesystem mounts).',
              children: [
                'PID: what processes you can see',
                'NET: what networks you can see',
                'MOUNT: what filesystems are mounted',
                'UTS: hostname/domainname',
                'USER: UID/GID mapping',
                'IPC: shared memory/semaphores',
              ],
            },
            {
              id: 'mm-01-cg',
              label: 'cgroups',
              color: '#0ea5e9',
              details: 'cgroups enforce and measure resource usage. Think “utility meter + circuit breaker” for CPU, memory, and I/O.',
              example: 'If memory limit is hit, the OOM killer can terminate processes inside the container.',
              children: [
                'CPU shares/quotas',
                'Memory limits + OOM',
                'Block I/O limits',
                'PIDs limit (process count)',
              ],
            },
            {
              id: 'mm-01-fs',
              label: 'Filesystem layers',
              color: '#f97316',
              details: 'Images are read-only layer stacks. A container adds a thin writable layer on top. Think “transparent sheets” with a scratchpad on top.',
              example: 'Deleting a file may create a “whiteout” in the writable layer rather than removing it from lower layers.',
              children: [
                'Image layers (read-only)',
                'Writable layer (container-specific)',
                'Copy-on-write behavior',
                'Union filesystem (overlayfs)',
              ],
            },
            {
              id: 'mm-01-rt',
              label: 'Runtime (Docker/Containerd)',
              color: '#a855f7',
              details: 'A runtime wires the namespaces/cgroups/filesystem together and starts the process. Docker is an opinionated UX around lower-level building blocks.',
              example: 'Docker CLI → Docker Engine → containerd → runc → Linux kernel features.',
              children: [
                'docker / podman (UX)',
                'containerd (runtime manager)',
                'runc (OCI runtime)',
                'OCI image/runtime specs',
              ],
            },
          ],
        },
      },

      {
        id: 'mm-02',
        title: 'Image vs Container (Template vs Instance)',
        type: 'dataflow',
        why: "Most Docker confusion is mixing up images and containers. This flow helps you predict what changes persist (and where).",
        pitfalls: [
          "Making changes inside a running container and expecting them to survive a re-run — they won’t unless baked into an image or stored in a volume.",
          "Tagging confusion (latest, dev, sha) — you “ran the wrong thing” and debug the wrong artifact.",
          "Assuming containers share writable state — each container has its own writable layer."
        ],
        content: {
          description: 'From Dockerfile to image to running container to persistent state.',
          nodes: [
            { id: 'src', label: 'Source Code', type: 'boundary', x: 60, y: 120 },
            { id: 'df', label: 'Dockerfile', type: 'process', x: 220, y: 120 },
            { id: 'build', label: 'docker build', type: 'process', x: 380, y: 120 },
            { id: 'img', label: 'Image (RO)', type: 'flow', x: 540, y: 120 },
            { id: 'run', label: 'docker run', type: 'process', x: 700, y: 120 },
            { id: 'ctr', label: 'Container (RW)', type: 'flow', x: 860, y: 120 },
            { id: 'vol', label: 'Volume', type: 'boundary', x: 860, y: 240 },
          ],
          edges: [
            { from: 'src', to: 'df' },
            { from: 'df', to: 'build' },
            { from: 'build', to: 'img' },
            { from: 'img', to: 'run' },
            { from: 'run', to: 'ctr' },
            { from: 'ctr', to: 'vol' },
          ],
          reveals: {
            src: 'Your app code. This is *not* inside the image unless you COPY it during build (or mount it during run).',
            df: 'Build recipe. Each instruction can create a new layer (and a new cache boundary).',
            build: 'Turns “recipe + context” into an immutable image: a stack of read-only layers.',
            img: 'Template. No process is running. Changing an image means building a new image (new layers).',
            run: 'Creates a container: adds writable layer + sets up namespaces/cgroups + starts PID 1.',
            ctr: 'Instance. Processes run here. Changes to container filesystem live in its writable layer.',
            vol: 'Persistent storage that outlives containers. Use it for databases, uploads, dev caches, etc.',
          },
        },
      },

      {
        id: 'mm-03',
        title: 'Build Context, .dockerignore, and “Why Is My Image Huge?”',
        type: 'conceptmap',
        why: "This helps you reason about what Docker can see during build and why images accidentally balloon (node_modules, build artifacts, secrets).",
        pitfalls: [
          "Forgetting .dockerignore — your entire repo (including junk) becomes build input, slows builds, and bloats layers.",
          "COPYing secrets into images — they can leak via layers/history.",
          "Thinking “I deleted it later” removes it — layers are additive; deleted files can still exist in previous layers."
        ],
        content: {
          central: 'Build context is the input universe',
          description: 'docker build sends a “context” to the daemon. Cache keys and image size depend on what’s inside.',
          branches: [
            {
              id: 'mm-03-ctx',
              label: 'Context',
              color: '#0ea5e9',
              details: 'Docker sends a tarball of the build context to the builder. If the context is huge, everything is slow (even before any RUN executes).',
              example: 'docker build . uses the current directory as context.',
              children: [
                'Everything in the context can affect cache',
                'Remote builders need the context uploaded',
                'Large contexts = slow builds',
              ],
            },
            {
              id: 'mm-03-ignore',
              label: '.dockerignore',
              color: '#22c55e',
              details: 'Controls what is *excluded* from the context. Think of it as “gitignore for the builder.”',
              example: 'Ignore node_modules, dist/, .git, secrets, large datasets.',
              children: [
                'Exclude build outputs',
                'Exclude dependencies that are rebuilt inside',
                'Exclude secrets',
              ],
            },
            {
              id: 'mm-03-layers',
              label: 'Layer permanence',
              color: '#f97316',
              details: 'Layers are immutable diffs. “Delete later” does not erase earlier layer contents; it only hides them in higher layers.',
              example: 'A secret added in layer 3 still exists even if removed in layer 4.',
              children: [
                'Minimize what you COPY',
                'Combine related steps carefully',
                'Use multi-stage builds for artifacts',
              ],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 2: Images & Dockerfiles
  // ------------------------------------------------------------
  images: {
    id: 'images',
    title: 'Images & Dockerfiles',
    description: 'How builds work, why caching works, and common Dockerfile patterns',
    color: '#22c55e',
    icon: '🧱',
    modules: [
      {
        id: 'img-01',
        title: 'The Build Pipeline (Data Flow)',
        type: 'dataflow',
        why: "Knowing the build pipeline lets you predict cache hits/misses and spot where time is going. This is the difference between “Docker is slow” and “this step invalidates cache.”",
        pitfalls: [
          "COPYing everything early — any tiny change busts cache for all later steps.",
          "RUN apt-get update alone — you’ll get stale indexes or broken installs later.",
          "Not pinning base images — rebuilds can change under your feet."
        ],
        content: {
          description: 'What happens during docker build (at a mental-model level).',
          nodes: [
            { id: 'ctx', label: 'Build Context', type: 'boundary', x: 60, y: 140 },
            { id: 'parse', label: 'Parse Dockerfile', type: 'process', x: 220, y: 140 },
            { id: 'step', label: 'Step Execution', type: 'process', x: 380, y: 140 },
            { id: 'cache', label: 'Layer Cache', type: 'process', x: 380, y: 240 },
            { id: 'layers', label: 'New Layers', type: 'flow', x: 540, y: 140 },
            { id: 'img', label: 'Final Image', type: 'boundary', x: 700, y: 140 },
          ],
          edges: [
            { from: 'ctx', to: 'parse' },
            { from: 'parse', to: 'step' },
            { from: 'step', to: 'cache' },
            { from: 'cache', to: 'step' },
            { from: 'step', to: 'layers' },
            { from: 'layers', to: 'img' },
          ],
          reveals: {
            ctx: 'Everything the builder can reference with COPY/ADD. Shrink it with .dockerignore for speed and safety.',
            parse: 'Dockerfile is read top-to-bottom. Earlier decisions shape cache boundaries.',
            step: 'Each instruction is evaluated. If cache key matches, Docker reuses the previous layer output instead of re-running.',
            cache: 'Cache keys depend on: instruction text + files referenced + previous layer hash (and sometimes build args).',
            layers: 'Cache miss means a new filesystem diff layer is created. Later steps build on it.',
            img: 'Image is a labeled pointer to a layer stack. Tags can point to the same image ID.',
          },
        },
      },

      {
        id: 'img-02',
        title: 'Layer Caching: How to Make It Work For You',
        type: 'conceptmap',
        why: "This gives you a simple rule: put the most stable stuff first, the most frequently changing stuff last. You’ll feel it instantly in rebuild times.",
        pitfalls: [
          "Installing dependencies after copying full source — every code change forces full dependency reinstall.",
          "Using ADD when you mean COPY — ADD has extra behavior (archives, URLs) that can surprise you.",
          "Over-optimizing with giant RUN lines — you gain cache stability but lose readability and debuggability."
        ],
        content: {
          central: 'Cache wants stable early layers',
          description: 'Write Dockerfiles to maximize cache reuse without becoming unreadable.',
          branches: [
            {
              id: 'img-02-order',
              label: 'Ordering heuristic',
              color: '#22c55e',
              details: 'Order steps from “rarely changes” → “often changes”. Cache invalidates forward from the first changed step.',
              example: 'COPY package*.json first, npm ci, then COPY src/.',
              children: [
                'Base image + OS deps early',
                'Language deps next',
                'App source late',
                'Config last (if it changes often)',
              ],
            },
            {
              id: 'img-02-multi',
              label: 'Multi-stage builds',
              color: '#0ea5e9',
              details: 'Build in one stage, ship only runtime artifacts in the final stage. Smaller images, fewer CVEs, faster pulls.',
              example: 'builder stage compiles; runtime stage copies dist/ only.',
              children: [
                'Keep build tools out of runtime image',
                'Use a slim base for final stage',
                'Copy only artifacts you need',
              ],
            },
            {
              id: 'img-02-lock',
              label: 'Determinism',
              color: '#f97316',
              details: 'Repeatable builds reduce “works on my machine” ghosts.',
              example: 'Pin base images (e.g., node:20-bookworm-slim) and use lockfiles (package-lock, poetry.lock).',
              children: [
                'Pin versions where it matters',
                'Use lockfiles',
                'Avoid “latest” in production',
              ],
            },
          ],
        },
      },

      {
        id: 'img-03',
        title: 'Dockerfile Patterns That Age Well',
        type: 'conceptmap',
        why: "These patterns keep images smaller, builds faster, and runtime behavior predictable — without turning your Dockerfile into avant‑garde poetry.",
        pitfalls: [
          "Running as root by default — raises blast radius for mistakes and escapes.",
          "Forgetting HEALTHCHECK/timeout expectations — orchestration thinks “it’s fine” when it’s dead inside.",
          "Using shell form CMD with signals — your app may not receive SIGTERM correctly."
        ],
        content: {
          central: 'A good Dockerfile is a contract',
          description: 'The Dockerfile should encode: how to build, how to run, and what assumptions are safe.',
          branches: [
            {
              id: 'img-03-user',
              label: 'Non-root runtime',
              color: '#22c55e',
              details: 'Create a user and run the app as that user. It prevents a lot of accidental self‑harm.',
              example: 'RUN adduser -D app && USER app',
              children: [
                'USER app (in final stage)',
                'Own writable dirs (chown)',
                'Least privilege',
              ],
            },
            {
              id: 'img-03-cmd',
              label: 'ENTRYPOINT vs CMD',
              color: '#0ea5e9',
              details: 'ENTRYPOINT defines “what it is”. CMD defines default args. Prefer exec form to pass signals properly.',
              example: 'ENTRYPOINT ["node","server.js"]  (exec form)',
              children: [
                'Exec form for proper signals',
                'Use CMD for defaults',
                'Avoid “bash -c …” unless needed',
              ],
            },
            {
              id: 'img-03-env',
              label: 'Config via env',
              color: '#f97316',
              details: 'Inject config at runtime (ENV vars, secrets, mounted files) rather than baking environment-specific config into the image.',
              example: 'docker run -e PORT=8080 …',
              children: [
                '12-factor-ish config',
                'No secrets in image',
                'Same image across envs',
              ],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 3: Runtime, Volumes, Persistence
  // ------------------------------------------------------------
  runtime: {
    id: 'runtime',
    title: 'Runtime & Persistence',
    description: 'What happens when you run containers, and where state should live',
    color: '#f97316',
    icon: '💾',
    modules: [
      {
        id: 'run-01',
        title: 'The Run Pipeline (Data Flow)',
        type: 'dataflow',
        why: "When a container won’t start, this flow tells you which stage to interrogate: image, runtime config, filesystem, network, process.",
        pitfalls: [
          "Assuming “container is up” means “app is ready” — it might be running but unhealthy.",
          "Forgetting PID 1 rules — signal handling and zombie reaping bite you.",
          "Mounting over paths you need — bind mounts can hide files from the image."
        ],
        content: {
          description: 'What docker run actually does, in the order it matters.',
          nodes: [
            { id: 'cli', label: 'docker run', type: 'boundary', x: 60, y: 140 },
            { id: 'cfg', label: 'Create Spec', type: 'process', x: 220, y: 140 },
            { id: 'fs', label: 'Mount FS', type: 'process', x: 380, y: 140 },
            { id: 'iso', label: 'NS + cgroups', type: 'process', x: 540, y: 140 },
            { id: 'net', label: 'Net Setup', type: 'process', x: 540, y: 240 },
            { id: 'pid1', label: 'Start PID 1', type: 'process', x: 700, y: 140 },
            { id: 'app', label: 'App Running', type: 'boundary', x: 860, y: 140 },
          ],
          edges: [
            { from: 'cli', to: 'cfg' },
            { from: 'cfg', to: 'fs' },
            { from: 'fs', to: 'iso' },
            { from: 'iso', to: 'net' },
            { from: 'iso', to: 'pid1' },
            { from: 'net', to: 'pid1' },
            { from: 'pid1', to: 'app' },
          ],
          reveals: {
            cli: 'You provide image + flags: ports, env, mounts, network, user, limits.',
            cfg: 'Docker creates a runtime specification (OCI-ish): what to run, what to mount, what to limit.',
            fs: 'Image layers are mounted read-only; container gets a writable layer; volumes/bind mounts are attached.',
            iso: 'Namespaces isolate process views; cgroups apply resource limits/metrics.',
            net: 'Network namespace + interfaces + DNS + port publishing (if requested).',
            pid1: 'Starts the container’s main process. If it exits, container stops. PID 1 handles signals differently than normal processes.',
            app: 'At this point the process is running — but your service might not be *ready* until it finishes init and listens on ports.',
          },
        },
      },

      {
        id: 'run-02',
        title: 'Volumes: Bind Mounts vs Named Volumes',
        type: 'conceptmap',
        why: "This makes persistence predictable. You’ll stop losing data and stop “mounting over” your app by accident.",
        pitfalls: [
          "Bind-mounting your whole repo into /app in production — you overwrite the image’s packaged app.",
          "Assuming Docker volumes are backed up automatically — they’re just directories managed by Docker.",
          "Storing mutable data in the container filesystem — it vanishes with container lifecycle."
        ],
        content: {
          central: 'State must live outside the container',
          description: 'Choose the right persistence tool for the job.',
          branches: [
            {
              id: 'run-02-bind',
              label: 'Bind mounts',
              color: '#0ea5e9',
              details: 'Mount a host path into the container. Great for development (live reload), risky for portability.',
              example: 'docker run -v $(pwd):/app …',
              children: [
                'Dev workflows',
                'Tight coupling to host paths',
                'Can hide image files',
              ],
            },
            {
              id: 'run-02-vol',
              label: 'Named volumes',
              color: '#22c55e',
              details: 'Docker-managed storage with a name. Portable across hosts (within Docker), safer defaults for databases.',
              example: 'docker run -v pgdata:/var/lib/postgresql/data …',
              children: [
                'Great for databases',
                'Independent of container lifecycle',
                'Managed location + permissions',
              ],
            },
            {
              id: 'run-02-tmp',
              label: 'tmpfs',
              color: '#f97316',
              details: 'In-memory filesystem. Fast, ephemeral. Useful for sensitive temp data and performance.',
              example: '--tmpfs /tmp:rw,size=64m',
              children: [
                'Fast scratch space',
                'Ephemeral',
                'Counts against memory',
              ],
            },
          ],
        },
      },

      {
        id: 'run-03',
        title: 'Environment Variables, Secrets, and Config Files',
        type: 'conceptmap',
        why: "You’ll avoid the two classic mistakes: shipping secrets in images, and hardcoding environment-specific config.",
        pitfalls: [
          "Baking API keys into images — they can leak via layers, registries, or logs.",
          "Using ENV for giant blobs (certs) — it’s awkward and leaks into process listings and dumps.",
          "Different image per environment — you lose reproducibility and drift increases."
        ],
        content: {
          central: 'Same image, different runtime config',
          description: 'Inject configuration at runtime; keep images environment-agnostic.',
          branches: [
            {
              id: 'run-03-env',
              label: 'Env vars',
              color: '#22c55e',
              details: 'Best for small, non-sensitive config: ports, feature flags, log level.',
              example: '-e LOG_LEVEL=debug -e PORT=8080',
              children: ['Simple and ubiquitous', 'Easy to override', 'Not ideal for secrets'],
            },
            {
              id: 'run-03-file',
              label: 'Mounted config files',
              color: '#0ea5e9',
              details: 'Mount a config file into the container. Good for structured config and certs.',
              example: '-v ./config.yml:/app/config.yml:ro',
              children: ['Great for certs', 'Can be read-only', 'Works well with Compose'],
            },
            {
              id: 'run-03-secret',
              label: 'Secrets',
              color: '#f97316',
              details: 'Keep secrets out of images and out of source control. In Compose, you can mount secrets as files.',
              example: 'Use Docker Compose secrets (file-mounted) or an external secret manager.',
              children: ['Least leakage', 'Audit-friendly', 'Rotatable'],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 4: Networking & Compose
  // ------------------------------------------------------------
  networking: {
    id: 'networking',
    title: 'Networking & Docker Compose',
    description: 'How containers talk to each other and to the host',
    color: '#a855f7',
    icon: '🕸️',
    modules: [
      {
        id: 'net-01',
        title: 'Docker Networking Basics: Bridge, Host, Port Mapping',
        type: 'conceptmap',
        why: "Most “can’t connect” bugs are just a wrong mental model of where the port is open. This map teaches you to ask: host port or container port? same network namespace or not?",
        pitfalls: [
          "Mixing up 127.0.0.1 inside a container vs on the host — it points to different worlds.",
          "Publishing the wrong direction (-p host:container) — everything *looks* right but nothing listens.",
          "Binding your app to localhost inside container — other containers can’t reach it."
        ],
        content: {
          central: 'Ports live in network namespaces',
          description: 'Docker networking is mostly namespaces + NAT + DNS.',
          branches: [
            {
              id: 'net-01-bridge',
              label: 'Bridge (default)',
              color: '#0ea5e9',
              details: 'Containers get private IPs on a virtual bridge. Host can publish ports via NAT to reach them.',
              example: 'docker run -p 8080:80 nginx  → host:8080 → container:80',
              children: [
                'Container has private IP',
                'Port publishing uses NAT',
                'Containers can talk on same bridge',
                'DNS provided by Docker',
              ],
            },
            {
              id: 'net-01-host',
              label: 'Host network',
              color: '#f97316',
              details: 'Container shares host network namespace. No port publishing needed — but less isolation.',
              example: 'docker run --network host … (Linux only; behavior differs on Docker Desktop).',
              children: [
                'No NAT',
                'Ports are host ports',
                'Less isolation',
              ],
            },
            {
              id: 'net-01-map',
              label: 'Port mapping',
              color: '#22c55e',
              details: '“-p A:B” means: listen on host port A and forward to container port B.',
              example: '-p 5432:5432 (host) → (container)',
              children: [
                'A is host side',
                'B is container side',
                'Use 0.0.0.0 to listen broadly',
              ],
            },
            {
              id: 'net-01-dns',
              label: 'Container DNS',
              color: '#a855f7',
              details: 'On a user-defined network (like Compose creates), containers can resolve each other by service name.',
              example: 'web talks to db at hostname “db” in Compose.',
              children: [
                'Service-name DNS',
                'Same network required',
                'Avoid hardcoding IPs',
              ],
            },
          ],
        },
      },

      {
        id: 'net-02',
        title: 'Compose Mental Model: A Tiny Orchestrator',
        type: 'dataflow',
        why: "Compose is the sweet spot for multi-container apps before Kubernetes: reproducible local stacks, consistent wiring, and less CLI yak-shaving.",
        pitfalls: [
          "Expecting depends_on to mean “ready” — it only controls start order, not health.",
          "Using localhost between services — in Compose, use the service name.",
          "Putting secrets directly in docker-compose.yml — they leak via git and logs."
        ],
        content: {
          description: 'What happens when you run docker compose up.',
          nodes: [
            { id: 'yml', label: 'compose.yml', type: 'boundary', x: 60, y: 140 },
            { id: 'plan', label: 'Plan Services', type: 'process', x: 220, y: 140 },
            { id: 'net', label: 'Create Network', type: 'process', x: 380, y: 140 },
            { id: 'vol', label: 'Create Volumes', type: 'process', x: 380, y: 240 },
            { id: 'start', label: 'Start Containers', type: 'process', x: 540, y: 140 },
            { id: 'dns', label: 'Service DNS', type: 'flow', x: 700, y: 140 },
            { id: 'stack', label: 'App Stack', type: 'boundary', x: 860, y: 140 },
          ],
          edges: [
            { from: 'yml', to: 'plan' },
            { from: 'plan', to: 'net' },
            { from: 'plan', to: 'vol' },
            { from: 'net', to: 'start' },
            { from: 'vol', to: 'start' },
            { from: 'start', to: 'dns' },
            { from: 'dns', to: 'stack' },
          ],
          reveals: {
            yml: 'Your declarative spec: services, images/build, env, ports, volumes, networks.',
            plan: 'Compose computes what needs to exist and what can be reused (networks, volumes, containers).',
            net: 'Compose typically creates a project-scoped user-defined bridge network.',
            vol: 'Named volumes get created (or reused) so state persists across container rebuilds/recreates.',
            start: 'Each service becomes a container with the configured mounts, env, ports, and network attachments.',
            dns: 'Service name → container IP mapping. Use service names (db, redis) instead of localhost.',
            stack: 'Your multi-container application behaves like a small distributed system (because it is).',
          },
        },
      },

      {
        id: 'net-03',
        title: 'A Minimal Compose Pattern for “Web + DB”',
        type: 'conceptmap',
        why: "This gives you a default skeleton that works for most hobby apps: web service, database, persistent volume, and sane networking.",
        pitfalls: [
          "Not persisting DB data — you rebuild and your database “mysteriously reset”.",
          "Publishing DB port publicly when you don’t need it — you enlarge attack surface.",
          "Using build args as runtime config — they don’t behave the same way."
        ],
        content: {
          central: 'Web + DB as two services',
          description: 'A reusable pattern with predictable wiring and persistence.',
          branches: [
            {
              id: 'net-03-web',
              label: 'Web service',
              color: '#0ea5e9',
              details: 'Build from Dockerfile or use a prebuilt image. Publish only the web port.',
              example: 'ports: ["8080:8080"]  env: ["DATABASE_URL=postgres://…@db:5432/app"]',
              children: ['Expose web only', 'Use env vars', 'Healthcheck optional'],
            },
            {
              id: 'net-03-db',
              label: 'DB service',
              color: '#22c55e',
              details: 'Use an official image, attach a named volume, and only publish DB port if your host needs to connect.',
              example: 'volumes: ["pgdata:/var/lib/postgresql/data"]',
              children: ['Named volume', 'No public ports by default', 'Init via env vars'],
            },
            {
              id: 'net-03-net',
              label: 'Network',
              color: '#a855f7',
              details: 'Compose creates a user-defined network. Services discover each other by name.',
              example: 'web connects to db at hostname “db”.',
              children: ['Service-name DNS', 'No IPs', 'Isolated project network'],
            },
            {
              id: 'net-03-ops',
              label: 'Ops loop',
              color: '#f97316',
              details: 'Learn the 4 verbs: up, down, logs, exec.',
              example: 'docker compose up -d; docker compose logs -f; docker compose exec web sh',
              children: ['Up/down', 'Logs', 'Exec', 'Rebuild'],
            },
          ],
        },
      },
    ],
  },

  // ------------------------------------------------------------
  // CATEGORY 5: Troubleshooting Fault Trees
  // ------------------------------------------------------------
  troubleshooting: {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fault trees for common issues (debug by narrowing the stage)',
    color: '#ef4444',
    icon: '🧯',
    modules: [
{
  id: 'ft-01',
  title: 'Container Won’t Start',
  type: 'faulttree',
  why: 'A container “not starting” usually means PID 1 exits, crashes, or gets killed. This tree forces you to classify the bucket first so you stop guessing.',
  pitfalls: [
    'Staring at the Dockerfile when the problem is runtime config (ports, env, mounts).',
    'Ignoring exit code + logs — they are the clue.',
    'Debugging the wrong container — confirm which one Compose actually started.',
  ],
  content: {
    root: 'Container exits immediately / keeps restarting / never becomes healthy',
    branches: [
      {
        fault: 'Debug ladder (do this first)',
        icon: 'info',
        causes: [
          {
            cause: '1) Is it running? Which one?',
            detail: 'Confirm the container you think is failing is the one actually failing.',
            fix: 'docker ps -a  (or: docker compose ps)  → note STATUS, exit code, restart count.'
          },
          {
            cause: '2) What did it say?',
            detail: 'Logs + exit code are your fastest signal.',
            fix: 'docker logs <ctr> --tail=200  → then: docker inspect <ctr> (State.ExitCode, State.Error, Health).'
          },
          {
            cause: '3) Can you reproduce interactively?',
            detail: 'Drop into the image to remove Compose/env/entrypoint variables.',
            fix: 'docker run --rm -it --entrypoint sh <image>  (or bash)  → run the command manually.'
          },
          {
            cause: '4) Reduce variables',
            detail: 'Disable mounts, remove ports, use minimal env, then add pieces back one at a time.',
            fix: 'Temporarily comment out volumes/ports in compose.yml; add back after it starts cleanly.'
          },
        ],
      },
      {
        fault: 'Process lifecycle',
        icon: 'error',
        causes: [
          {
            cause: 'PID 1 command exits',
            detail: 'Containers stop when PID 1 exits — even “successfully.”',
            fix: 'Check: docker logs <ctr>. Verify CMD/ENTRYPOINT. For servers, ensure the process stays in the foreground (no daemonize).'
          },
          {
            cause: 'Signal handling / PID 1 quirks',
            detail: 'PID 1 ignores some signals by default and can fail to reap zombies, causing weird shutdown behavior.',
            fix: 'Prefer exec-form ENTRYPOINT/CMD. Consider a tiny init (e.g., tini) for long-running multi-process containers.'
          },
          {
            cause: 'Entrypoint/CMD mismatch',
            detail: 'Shell-form commands + quoting can change args; ENTRYPOINT + CMD composition can surprise you.',
            fix: 'Inspect: docker image inspect <img> (Config.Entrypoint/Cmd). Prefer JSON exec-form and test the resolved command in an interactive shell.'
          },
          {
            cause: 'Healthcheck failing (starts but “unhealthy”)',
            detail: 'The process runs, but the healthcheck fails, so Compose/restarts/depends_on logic may behave as if it never started.',
            fix: 'docker inspect <ctr> (State.Health) and logs. Validate the healthcheck command inside the container; increase timeouts if startup is slow.'
          },
        ],
      },
      {
        fault: 'Runtime config & environment',
        icon: 'warning',
        causes: [
          {
            cause: 'Missing/invalid env vars',
            detail: 'App crashes on startup because required config is missing (DB URL, API keys, etc.).',
            fix: 'Make config errors explicit at startup. In Compose, set env properly (env_file / environment). Confirm with: docker exec <ctr> env.'
          },
          {
            cause: 'Mount hides required files',
            detail: 'A bind mount over /app replaces what was in the image. Your start script or dependencies disappear.',
            fix: 'Confirm mounts: docker inspect <ctr>. Avoid mounting over critical paths; mount subdirectories instead.'
          },
          {
            cause: 'Wrong WORKDIR / relative paths',
            detail: 'Your command assumes a working directory that is not set (or differs between build and run).',
            fix: 'Check Dockerfile WORKDIR and your compose.yml working_dir. Validate paths in an interactive shell.'
          },
        ],
      },
      {
        fault: 'Filesystem & permissions',
        icon: 'warning',
        causes: [
          {
            cause: 'Permission denied on volume',
            detail: 'Non-root container can’t write to mounted volume path.',
            fix: 'Chown the host/volume directory or align container USER uid/gid. Avoid “just run as root” as the default fix.'
          },
          {
            cause: 'Missing executable / wrong line endings',
            detail: '“No such file or directory” can be a line-ending/shebang/exec-bit issue (especially on Windows).',
            fix: 'Ensure scripts are LF, have a valid shebang, and are executable. Try: docker run -it --entrypoint sh <img> and ls -la the script.'
          },
          {
            cause: 'Out of disk / inode exhaustion',
            detail: 'Image layers, build cache, volumes, or logs can fill Docker’s storage even if the host looks fine.',
            fix: 'docker system df  → docker system prune (careful). Also check volumes: docker volume ls; docker builder prune.'
          },
        ],
      },
      {
        fault: 'Ports & host conflicts',
        icon: 'warning',
        causes: [
          {
            cause: 'Port already in use on host',
            detail: 'Publishing a host port fails or the service is unreachable because another process owns the port.',
            fix: 'Change host port (-p 8081:80). Find offenders: lsof -i :8080 (host) or netstat. On Windows, use: netstat -ano | findstr :8080.'
          },
          {
            cause: 'App bound to localhost inside container',
            detail: 'Service listens only on 127.0.0.1 in the container; other containers (and sometimes the host) can’t reach it.',
            fix: 'Configure app to bind to 0.0.0.0 (all interfaces). Confirm with ss/netstat inside the container.'
          },
        ],
      },
      {
        fault: 'Architecture / platform',
        icon: 'warning',
        causes: [
          {
            cause: 'Architecture mismatch (exec format error)',
            detail: 'You built/pulled an image for a different CPU architecture than your runtime.',
            fix: 'docker image inspect <img> (Architecture/Os). Rebuild with --platform or pull the correct variant.'
          },
        ],
      },
    ],
  },
},
{
  id: 'ft-02',
  title: 'Can’t Connect',
  type: 'faulttree',
  why: 'Connection issues are usually “wrong address,” “wrong port,” “wrong network,” or “service not listening.” This tree separates host→container from container→container.',
  pitfalls: [
    'Mixing up host port vs container port (e.g., -p 8080:80).',
    'Using localhost inside a container to reach another container.',
    'Forgetting that Compose gives you DNS by service name.',
  ],
  content: {
    root: 'Client can’t reach service (timeout / connection refused / DNS fail)',
    branches: [
      {
        fault: 'Debug ladder (separate the hop)',
        icon: 'info',
        causes: [
          {
            cause: '1) Is the server actually running?',
            detail: 'A network problem can look identical to a crashed app.',
            fix: 'docker ps  → check status. Then: docker logs <server-ctr>.'
          },
          {
            cause: '2) Identify the hop',
            detail: 'Host→container is different from container→container.',
            fix: 'From host: use localhost:<hostPort>. From another container: use <serviceName>:<containerPort> (no host port).'
          },
          {
            cause: '3) Test from inside the network',
            detail: 'Run a throwaway container on the same network to test DNS + routing.',
            fix: 'docker run --rm -it --network <net> alpine sh  → apk add curl; curl http://service:port'
          },
        ],
      },
      {
        fault: 'Wrong address / name',
        icon: 'error',
        causes: [
          {
            cause: 'Using localhost inside a container',
            detail: 'Inside a container, localhost means “this container,” not the host or another service.',
            fix: 'In Compose, connect to other services by service name (e.g., db:5432). To reach the host, use host.docker.internal (Docker Desktop).'
          },
          {
            cause: 'DNS name doesn’t exist',
            detail: 'Service discovery works on user-defined networks; legacy setups can behave differently.',
            fix: 'Use Compose (default network) or create a user-defined network: docker network create mynet; run containers with --network mynet.'
          },
        ],
      },
      {
        fault: 'Wrong port mapping',
        icon: 'warning',
        causes: [
          {
            cause: 'Host port vs container port confusion',
            detail: 'You published -p 8080:80 but try to reach 80 on the host, or 8080 inside the network.',
            fix: 'Confirm: docker port <server-ctr>. Host uses the left side (8080). Containers use the container port (80).'
          },
          {
            cause: 'Service listens on the wrong interface',
            detail: 'If the app binds to 127.0.0.1 inside the container, other containers can’t reach it.',
            fix: 'Bind to 0.0.0.0. Verify with ss/netstat in the container.'
          },
        ],
      },
      {
        fault: 'Network wiring',
        icon: 'warning',
        causes: [
          {
            cause: 'Containers not on same network',
            detail: 'Routing + DNS need shared network attachment.',
            fix: 'In Compose, ensure both services are on the same network. Otherwise attach explicitly via networks:'
          },
          {
            cause: 'Firewall / VPN / corporate network oddities',
            detail: 'Host networking can be blocked even if container networking is fine (or vice versa).',
            fix: 'Test host→container and container→container separately. If container→container works but host→container fails, check host firewall/VPN rules.'
          },
        ],
      },
      {
        fault: 'Upstream service not ready',
        icon: 'warning',
        causes: [
          {
            cause: 'Depends-on isn’t readiness',
            detail: 'Compose can start containers in order, but that doesn’t mean the DB is accepting connections yet.',
            fix: 'Add retries/backoff in the app, or use a healthcheck + wait-for-it style gate for local dev.'
          },
        ],
      },
    ],
  },
},

{
  id: 'ft-03',
  title: 'Out of Space',
  type: 'faulttree',
  why: '“Disk full” can mean the host disk, Docker’s VM disk image (Desktop), build cache, image layers, volumes, or logs. This tree narrows it fast.',
  pitfalls: [
    'Pruning blindly and deleting volumes that contain your data.',
    'Assuming host free space means Docker has free space (Desktop disk image can be capped).',
    'Ignoring logs as a storage source (json-file can grow forever).',
  ],
  content: {
    root: 'Docker reports no space left (build fails / container errors / pulls fail)',
    branches: [
      {
        fault: 'Debug ladder (what is full?)',
        icon: 'info',
        causes: [
          {
            cause: '1) Measure Docker storage',
            detail: 'Start with what Docker thinks is consuming space.',
            fix: 'docker system df  (and: docker builder du if available)'
          },
          {
            cause: '2) Identify category',
            detail: 'Images, build cache, volumes, containers, or logs.',
            fix: 'Images: docker image ls. Volumes: docker volume ls. Containers: docker ps -a.'
          },
          {
            cause: '3) Clean safely',
            detail: 'Prefer removing build cache and dangling images before touching volumes.',
            fix: 'docker builder prune  → docker image prune  → only then consider docker volume prune (risk!).'
          },
        ],
      },
      {
        fault: 'Docker Desktop disk image is full',
        icon: 'error',
        causes: [
          {
            cause: 'VM disk cap hit',
            detail: 'Docker Desktop stores data inside a virtual disk that can fill even when the host disk has room.',
            fix: 'Docker Desktop settings: increase disk image size and/or prune images/build cache. Restart Docker Desktop after changes.'
          },
        ],
      },
      {
        fault: 'Build cache / layers exploded',
        icon: 'warning',
        causes: [
          {
            cause: 'Layer cache growth',
            detail: 'Repeated builds create lots of cached layers.',
            fix: 'docker builder prune  (optionally: --all). Then improve caching: order Dockerfile steps and use .dockerignore.'
          },
          {
            cause: 'Copying too much into the image',
            detail: 'Large build context or accidental COPY of node_modules, .git, or artifacts.',
            fix: 'Add .dockerignore. Inspect: docker history <img> to see where size comes from.'
          },
        ],
      },
      {
        fault: 'Volumes growing silently',
        icon: 'warning',
        causes: [
          {
            cause: 'Database / app data growth',
            detail: 'Named volumes persist and can grow without you noticing.',
            fix: 'List volumes: docker volume ls. Inspect mounts: docker inspect <ctr>. Decide retention and add cleanup/rotation where appropriate.'
          },
        ],
      },
      {
        fault: 'Logs ballooning',
        icon: 'warning',
        causes: [
          {
            cause: 'Container logs unbounded',
            detail: 'Default json-file logging can grow indefinitely.',
            fix: 'Configure log rotation (max-size/max-file) in Docker daemon settings or compose logging options. Also reduce noisy logging in dev.'
          },
        ],
      },
    ],
  },
},
    ],
  },
};
