---
title: "Replace Datadog with self-hosted observability"
slug: replace-datadog
description: "Unified monitoring, logging, and tracing platform that replaces Datadog's $23/host/month pricing model."
category: analytics
replaces: Datadog
annual_cost: 8280
reward: 8000
status: claimed
difficulty: hard
posted_by: "bountymon"
posted_date: "2025-12-01"
claimed_by: "signoz-team"
claimed_date: "2026-01-15"
hunter_url: "https://github.com/SigNoz/signoz"
hunter_contact: "https://github.com/SigNoz"
seats: 30
tags: ["observability", "monitoring", "devops"]
milestones:
  - label: "Core metrics collection"
    done: true
    date: "2026-01-20"
  - label: "Log aggregation pipeline"
    done: true
    date: "2026-02-01"
  - label: "Distributed tracing"
    done: true
    date: "2026-02-15"
  - label: "Dashboard builder"
    done: false
  - label: "Alerting system"
    done: false
requirements:
  - Metrics, logs, and traces in one platform
  - Dashboard builder with alerting
  - APM with distributed tracing
  - Infrastructure monitoring
  - Docker and Kubernetes native
  - Reasonable resource footprint
---

Datadog bills per host, per metric, per log GB, per trace. The bill grows faster than your infrastructure. SigNoz has claimed this bounty with a full-featured open-source observability platform built on ClickHouse.
