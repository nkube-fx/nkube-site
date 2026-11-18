## hero

# Nkube

Kubernetes for .NET developers.

One native CLI to bring your .NET projects closer to Kubernetes. Build, deploy, test, and debug without losing your flow.

## introduction

### From your project to your cluster.

Kubernetes is powerful. Getting your application there shouldn't mean stitching together a dozen different workflows. Nkube is being built to make the journey feel like one.

## deploy

### /deploy

Go from an ASP.NET Core project to a development deployment with a workflow built for .NET.

`Build` `Containerize` `Deploy`

## inspect

### /inspect

Use the Kubernetes commands you know to find resources, follow logs, and understand what's running.

`Get` `Logs` `Describe`

## debug

### /debug

Bring debugging closer to your cluster with a path to attaching your familiar .NET debugger.

`Connect` `Diagnose` `Debug`

## kubectl

### Familiar commands. Native execution.

Nkube's command-line interface is generated from the upstream kubectl Go code, keeping the command structure and options aligned with kubectl.

Core Kubernetes commands are supported natively through a generic workflow. The generated interface covers the wider command tree, while commands not yet implemented remain recognizable and report their support status clearly.

## workflow

### Less between you and your code.

Nkube keeps the familiar Kubernetes command model where it helps, then adds developer-first workflows where local development and the cluster meet.

The goal: one executable, multiple roles, and a shorter path from an idea to a running application.

## example

```bash
cd MyApi
nkube deploy
nkube test
nkube debug
```

## roadmap-intro

### Small steps. Big picture.

The first 90 days are about making one useful developer workflow real. Here's where we're headed.

## foundation

### Foundation

An installable preview, Native AOT validation, and the Kubernetes commands developers use every day.

## project-to-cluster

### Project to cluster

An opinionated path from an ASP.NET Core project to a working development deployment.

## debug-slice

### Debug vertical slice

Connect to a workload and hit a breakpoint with a normal .NET debugger.

## closing

### Built in the open. Just getting started.

Nkube is experimental and under active development. Commands, behavior, and architecture may change before 1.0.
