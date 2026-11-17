# Nkube

**Kubernetes for .NET developers.**

> Build, deploy, test, and debug .NET applications on Kubernetes from one native developer-focused CLI.

Nkube is an early-stage open-source project exploring a simpler development workflow between a .NET project and a Kubernetes cluster.

The goal is not to replace every feature of `kubectl`.

Nkube keeps the familiar Kubernetes command model where it is useful, then adds developer workflows for the places where the gap between local development and Kubernetes becomes painful.

```bash
nkube get pods
nkube logs my-api
nkube deploy
nkube debug
```

The project is currently in active development. APIs, commands, behavior, and architecture may change before `1.0`.

---

## Why Nkube?

Moving a .NET application from a developer machine into Kubernetes usually involves several separate tools and workflows:

```text
source code
   ↓
dotnet build
   ↓
container image
   ↓
Kubernetes manifests
   ↓
deploy
   ↓
logs / exec / port-forward
   ↓
debugging and diagnostics
```

Nkube aims to make this feel like one developer workflow:

```text
                 Nkube
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Deploy        Test        Debug
       │           │           │
       └───────────┼───────────┘
                   ▼
              Kubernetes
```

The long-term goal is simple:

```bash
cd MyApi
nkube deploy
nkube test
nkube debug
```

---

## What is different?

### Familiar Kubernetes commands

Nkube generates its command structure from the upstream `kubectl` command tree instead of maintaining a separate CLI definition by hand.

Nkube knows more commands than it intends to implement. Unsupported commands stay recognizable so scripts or users coming from `kubectl` can receive a clear explanation instead of an unknown-command error.

Help and completion only promote the supported Nkube surface.

### Developer-first workflows

Nkube is not only a Kubernetes resource CLI.

The project is designed around developer workflows such as:

```text
.NET project
    ↓
build
    ↓
container
    ↓
manifest
    ↓
deploy
    ↓
test / logs / debug
```

The intention is to reduce the distance between local .NET development and the real Kubernetes environment.

### Native and portable

Nkube is being designed as a Native AOT application with one executable and multiple runtime roles.

The same product can eventually be delivered as:

- a native executable;
- a .NET tool;
- an OCI image.

The architecture also allows the same `nkube` executable to later run as a Kubernetes-side agent or tunnel component when required by development and debugging workflows.

---

## Project principles

Nkube follows a few simple rules:

- **Developer experience first.** Implement the Kubernetes features developers use most, not every possible command.
- **One binary, multiple roles.** Avoid unnecessary products and runtime components.
- **Native AOT from the start.** AOT compatibility is an architectural constraint, not a final optimization step.
- **Generate what can be generated.** Track the upstream Kubernetes CLI structure instead of copying it manually.
- **Protocol and transport are separate.** Local IPC, TCP, tunnels, and future transports should not define application semantics.
- **Explicit compatibility.** Unsupported behavior and intentional differences from `kubectl` are documented and handled clearly.
- **Architecture ahead, implementation close.** Design for the future, but only build what the next useful vertical slice needs.

---

# 90-day roadmap

The first 90 days focus on proving one product idea:

> **A .NET developer should be able to install Nkube, work with the Kubernetes resources they use every day, deploy an ASP.NET Core application, inspect it, and start a useful debugging workflow without assembling many unrelated tools by hand.**

The roadmap is intentionally narrow. Many larger ideas already have prototypes or architectural work, but they are not required for the first useful preview.

## Days 1-30 — Foundation and daily Kubernetes use

**Goal:** produce a reliable, installable Nkube preview and validate the generated CLI against real `kubectl` usage.

Focus:

- stabilize the generated System.CommandLine surface;
- use real-world `kubectl` usage data to choose the first command families;
- keep unsupported commands recognizable but hidden from normal help and completion;
- complete Native AOT build and smoke validation;
- use the local disposable Kubernetes test cluster for E2E validation;
- provide `nkube version` and environment diagnostics;
- implement the highest-value daily Kubernetes workflows.

Expected early command families include:

```text
get
logs
describe
apply
delete
exec
port-forward
rollout status
```

The exact implementation order is driven by observed developer usage, not by an attempt to reach full `kubectl` parity.

## Days 31-60 — From .NET project to Kubernetes

**Goal:** make Nkube useful even when the developer is no longer thinking in individual Kubernetes resources.

Focus on the first opinionated deployment workflow:

```bash
cd MyApi
nkube deploy --plan
nkube deploy
```

The first supported golden path is intentionally small:

- ASP.NET Core;
- Linux containers;
- a development Kubernetes namespace;
- Deployment and Service generation;
- application configuration;
- readiness and rollout feedback;
- direct access to logs and workload information.

The objective is not a universal deployment engine. It is a smooth path from a normal .NET project to a working development deployment.

## Days 61-90 — Debug vertical slice

**Goal:** prove the feature that should make Nkube more than another Kubernetes CLI.

The first debug workflow will stay deliberately simple:

```bash
nkube debug my-api --remote
```

The initial implementation should cover:

- workload and container discovery;
- debug-session lifecycle;
- connectivity using existing Kubernetes primitives where possible;
- clear setup and failure diagnostics;
- cleanup when the session ends;
- a documented path to attaching a normal .NET debugger.

The milestone is reached when a developer can deploy an ASP.NET Core application to the test cluster and hit a breakpoint through the Nkube workflow.

---

## After the first 90 days

Several ideas are already being researched, but they are intentionally outside the first preview milestone:

- on-the-fly temporary debug workloads;
- the Nkube agent running from the same OCI image;
- Unix Domain Socket based sidecar composition;
- an Nkube-native tunnel and external tunnel providers;
- dynamic CRD workflows;
- developer workspace onboarding (`nkube seat`);
- development add-ons such as MongoDB;
- Helm chart generation from the same project model;
- composable diagnostics and security sidecars.

These are directions, not promises for the first release.

---

## Current status

**Nkube is experimental and under active development.**

The command generator, build system, Native AOT path, local E2E Kubernetes environment, command support policies, overrides, and several architecture proofs of concept are already being developed and tested.

The current priority is to turn those foundations into a small vertical product that another .NET developer can install and use successfully.

Expect breaking changes before `1.0`.

---

## The target experience

The project succeeds if the everyday experience becomes this simple:

```bash
nkube get pods
nkube deploy
nkube logs my-api
nkube debug my-api
```

**One native CLI. One developer workflow. From .NET code to Kubernetes.**
