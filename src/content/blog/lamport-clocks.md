---
title: "Lamport clocks: ordering events without a global clock"
description: "The happened-before relation, logical clocks and a Java implementation, with the limits that vector clocks solve."
date: 2026-11-03
kind: paper
category: distributed systems
tags: [distributed, java]
summary: "In a distributed system, no physical clock is reliable enough to order events. This article introduces the happened-before relation, builds Lamport's logical clocks step by step and offers a tested Java implementation."
draft: true
---

<!-- DEMO ARTICLE written to test the article page layout (draft: visible in dev only). Rewrite it in your own words before setting draft: false. -->

## 1. The problem

Two processes exchange messages without a shared clock. How do we decide that an event *a* happened before an event *b*? Physical clocks drift: we need a logical order.

$$
a \to b \implies C(a) < C(b)
$$

## 2. Happened-before

Lamport defines the *happened-before* relation, written →[^1]: if *a* and *b* are in the same process and *a* comes first, then *a → b*. If *a* sends a message and *b* receives it, then *a → b*. The relation is transitive.

## 3. Logical clocks

Each process keeps a counter. It increments it on every local event, attaches it to every message it sends, and on reception takes the maximum of its own value and the received one, plus one.

## 4. Implementation

```java title="LamportClock.java"
public final class LamportClock {
    private long time = 0;

    // local event or message send
    public synchronized long tick() { return ++time; }

    // reception: max(local, received) + 1
    public synchronized long receive(long remote) {
        time = Math.max(time, remote) + 1;
        return time;
    }
}
```

## 5. Limits

The implication only goes one way: *C(a) < C(b)* does not mean *a → b*. Detecting concurrent events requires vector clocks.

[^1]: L. Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System", *Communications of the ACM*, 1978.
