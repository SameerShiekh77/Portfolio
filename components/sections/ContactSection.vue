<template>
  <section id="contact" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="contact-heading">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-[0.1]" style="background: radial-gradient(circle, var(--color-accent-clay), transparent)" />
    </div>

    <div class="container mx-auto px-6 lg:px-12 relative">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <RevealText id="contact-heading" as="h2" split-by="words" class="font-display font-bold leading-[1.03] text-[var(--color-text-primary)] mb-4" style="font-size: var(--text-h1)">
          Let's build something <span class="text-gradient">extraordinary</span> together.
        </RevealText>
        <p class="text-[var(--color-text-secondary)] text-lg">
          Open to DevOps Manager, Sr. Software Engineer, and senior architect roles - plus fractional engineering-leadership engagements.
        </p>
      </div>

      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <a
            v-for="item in contactItems"
            :key="item.label"
            :href="item.href ?? undefined"
            :target="item.href?.startsWith('http') ? '_blank' : undefined"
            :rel="item.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="flex items-center gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-5 transition-all duration-300 hover:border-[var(--color-border-hover)]"
            :class="item.href ? '' : 'cursor-default'"
          >
            <span class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[var(--color-accent-clay)]/10 border border-[var(--color-accent-clay)]/20">
              <SocialIcon :name="item.icon" class="w-5 h-5 text-[var(--color-accent-clay-ink)]" />
            </span>
            <span>
              <span class="block text-xs font-semibold text-[var(--color-text-muted)] mb-0.5">{{ item.label }}</span>
              <span class="block text-sm font-medium text-[var(--color-text-primary)]">{{ item.value }}</span>
            </span>
          </a>

          <div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-emerald-400 font-bold text-sm">{{ profile.availability }}</span>
            </div>
            <p class="text-[var(--color-text-muted)] text-xs leading-relaxed">{{ profile.availabilityNote }}</p>
          </div>
        </div>

        <div class="lg:col-span-3 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-8">
          <form v-if="!formSent" action="https://api.web3forms.com/submit" method="POST" class="space-y-5" @submit.prevent="submitForm">
            <input type="hidden" name="access_key" value="2dda2782-f7fe-45fe-918c-6fc64f4b6f93" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="contact-name" class="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-[var(--color-accent-clay)] bg-[var(--color-surface-1)] border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                />
              </div>
              <div>
                <label for="contact-email" class="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-[var(--color-accent-clay)] bg-[var(--color-surface-1)] border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
                />
              </div>
            </div>
            <div>
              <label for="contact-subject" class="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Subject</label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                name="subject"
                placeholder="Opportunity / Project / Consulting"
                required
                class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-[var(--color-accent-clay)] bg-[var(--color-surface-1)] border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
              />
            </div>
            <div>
              <label for="contact-message" class="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                placeholder="Tell me about your project or role…"
                required
                class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-[var(--color-accent-clay)] bg-[var(--color-surface-1)] border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] resize-none"
              />
            </div>
            <button
              type="submit"
              :disabled="sending"
              class="w-full py-4 rounded-xl font-bold text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              style="background: var(--gradient-primary)"
            >
              <Loader2 v-if="sending" class="w-4 h-4 animate-spin" />
              {{ sending ? 'Sending…' : 'Send Message' }}
              <Send v-if="!sending" class="w-4 h-4" />
            </button>
          </form>

          <div v-else class="flex flex-col items-center justify-center py-16 text-center">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-emerald-500/15 border border-emerald-500/30">
              <Check class="w-8 h-8 text-emerald-400" />
            </div>
            <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-2">Message sent!</h3>
            <p class="text-[var(--color-text-secondary)] text-sm">I'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loader2, Send, Check } from '@lucide/vue'
import RevealText from '../ui/RevealText.vue'
import SocialIcon from '../ui/SocialIcon.vue'
import { profile, contactItems } from '../../data/profile'

const formSent = ref(false)
const sending = ref(false)
const form = ref({ name: '', email: '', subject: '', message: '' })

const submitForm = async () => {
  sending.value = true
  try {
    const data = new FormData()
    data.append('access_key', '2dda2782-f7fe-45fe-918c-6fc64f4b6f93')
    data.append('name', form.value.name)
    data.append('email', form.value.email)
    data.append('subject', form.value.subject)
    data.append('message', form.value.message)
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    formSent.value = true
  } catch (e) {
    console.error(e)
  } finally {
    sending.value = false
  }
}
</script>
