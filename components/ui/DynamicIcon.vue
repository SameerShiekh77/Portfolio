<template>
  <component :is="icon" v-if="icon" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  CloudCog, ServerCog, LayoutPanelLeft, BrainCircuit, ShieldCheck, UsersRound,
  Cloud, Container, Boxes, GitBranch, Terminal, Server, Activity, Clock,
  Code, LayoutTemplate, Zap, FlaskConical, Plug, Network, Database, ZapOff,
  Component, FileCode, Palette, GitMerge, Send, TestTube,
  Sparkles, Bot, MessageSquareCode, AppWindow, Workflow,
  Lock, GitFork, Siren,
  Users, GraduationCap, Handshake, GitPullRequest, MessageCircle, Target,
  Monitor, Shield, Gauge,
  School, CreditCard, Mail, Wallet, Gift, Link, Building2,
  Briefcase, Rocket,
} from '@lucide/vue'

const props = defineProps<{ name: string }>()

const registry: Record<string, unknown> = {
  'cloud-cog': CloudCog, 'server-cog': ServerCog, 'layout-panel-left': LayoutPanelLeft,
  'brain-circuit': BrainCircuit, 'shield-check': ShieldCheck, 'users-round': UsersRound,
  cloud: Cloud, container: Container, boxes: Boxes, 'git-branch': GitBranch, terminal: Terminal,
  server: Server, activity: Activity, clock: Clock,
  code: Code, 'layout-template': LayoutTemplate, zap: Zap, 'flask-conical': FlaskConical,
  plug: Plug, network: Network, database: Database, 'zap-off': ZapOff,
  component: Component, 'file-code': FileCode, palette: Palette, 'git-merge': GitMerge,
  send: Send, 'test-tube': TestTube,
  sparkles: Sparkles, bot: Bot, 'message-square-code': MessageSquareCode, 'app-window': AppWindow, workflow: Workflow,
  lock: Lock, 'git-fork': GitFork, siren: Siren,
  users: Users, 'graduation-cap': GraduationCap, handshake: Handshake,
  'git-pull-request': GitPullRequest, 'message-circle': MessageCircle, target: Target,
  monitor: Monitor, shield: Shield, gauge: Gauge,
  school: School, 'credit-card': CreditCard, mail: Mail, wallet: Wallet, gift: Gift, link: Link, 'building-2': Building2,
  briefcase: Briefcase, rocket: Rocket,
}

const icon = computed(() => registry[props.name] ?? null)
</script>
