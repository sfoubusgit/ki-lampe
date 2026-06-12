---
title: "How to Run n8n Locally on Windows (For Dummies)"
description: "A true beginner-friendly, step-by-step guide to running n8n locally on Windows using Docker. No Linux, no domain, no server knowledge required."
topic: "Automation"
level: "BEGINNER"
readTime: "10 MIN"
image: "/images/n8n_run_locally_windows_tutorial_image.webp"
date: 2026-01-22
---

# How to Run n8n Locally on Windows (For Dummies)

This guide is written for **absolute beginners**.

It assumes:
- You are using **Windows 10 or Windows 11**
- You have **no prior experience** with n8n, Docker, or servers
- You simply want n8n **running locally** so you can see it and start learning

No Linux.  
No domain.  
No cloud setup.

---

## What is n8n (in plain English)?

**n8n** is a tool that allows you to **connect apps and automate workflows** using a visual interface.

You can think of it like Zapier, but:
- It runs **on your own computer**
- It is **free for personal use**
- You have **full control** over your data and automation logic

### Examples of things you can automate later

- When a form is submitted → send yourself an email  
- Every day → pull data from an API → save it to a spreadsheet  
- When a webhook is called → run logic → return a response  

For now, the goal is simple: **get n8n running**.

---

## The easiest way on Windows (recommended)

We will use **Docker Desktop**.

Why this method:
- No coding required
- Works reliably on Windows
- Easy to reset or remove if something goes wrong
- The most common setup for beginners

---

## Requirements

- **Operating System**: Windows 10 or Windows 11  
- **Internet connection**: required for the initial install  
- **Administrator rights**: needed to install Docker  

Nothing else is required.

---

## Part 1 — Install Docker Desktop (one time only)

### Step 1: Download Docker Desktop

1. Open your browser
2. Go to:  
   https://www.docker.com/products/docker-desktop/
3. Click **Download for Windows**
4. Run the installer

During installation:
- Leave all default options enabled
- Allow WSL if Windows asks
- Restart your computer when prompted

---

### Step 2: Verify Docker is running

After the restart:
1. Open **Docker Desktop**
2. Wait until it shows **Running**
3. The Docker icon should be visible

Once Docker is running, you are ready to continue.

---

## Part 2 — Run n8n locally

This is the main step. You only need **one command**.

### Step 3: Open PowerShell

1. Press the **Windows key**
2. Type `powershell`
3. Press **Enter**

A blue or black terminal window will open. This is normal.

---

### Step 4: Run the n8n command

Copy the command below exactly:

`docker run -it --rm -p 5678:5678 n8nio/n8n`

Paste it into PowerShell and press **Enter**.

#### What happens next

- Docker downloads n8n (first run only)
- n8n starts automatically
- Text scrolls in the terminal window

Do **not** close this window.

---

## Part 3 — Open n8n in your browser

### Step 5: Open the n8n interface

1. Open your browser (Chrome, Edge, Firefox, etc.)
2. Go to:

`http://localhost:5678`

You should now see the n8n setup screen.

---

## First-time setup

The initial setup is short.

n8n will ask you to:

- Create an email address and password
- Optionally skip personalization
- Choose **Community / Free**

After this, you will be inside the n8n dashboard.

---

## How to know it worked

You should see:

- A clean dashboard
- A button labeled **Create Workflow**
- An empty canvas where nodes can be added

If you see this, the setup was successful.

---

## Important beginner notes

### Do I need a domain?

No.  
`localhost:5678` is perfectly fine for learning and local testing.

### Do I need Linux?

No.  
Docker handles everything in the background.

### Is this accessible from the internet?

No.  
This n8n instance is only accessible on your own computer.

### What happens if I close PowerShell?

n8n stops running.

Nothing breaks. You can start it again at any time.

---

## How to stop n8n safely

1. Go to the PowerShell window
2. Press **CTRL + C**

n8n shuts down safely.

---

## How to start n8n again later

1. Open PowerShell
2. Run the same command again:

`docker run -it --rm -p 5678:5678 n8nio/n8n`

Then open in your browser:

`http://localhost:5678`

---

## Recommended next steps

Once n8n is running locally:

1. Learn what a **Trigger** is
2. Understand what **Nodes** do
3. Build your first simple workflow
4. Explore webhooks later