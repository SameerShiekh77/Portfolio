<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="wrap">
      <p class="chip">
        <span class="dot" aria-hidden="true" />
        {{ profile.availability }}
      </p>
      <h2 id="contact-title" class="contact-title">
        Have a system that needs to stay up, or a team that needs to ship?
      </h2>
      <p class="mt-6 max-w-[52ch] text-lg text-ink-2">{{ profile.availabilityNote }}</p>

      <div class="mt-16 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <ul class="methods">
          <li v-for="item in contactItems" :key="item.label">
            <component
              :is="item.href ? 'a' : 'div'"
              :href="item.href ?? undefined"
              :target="item.href?.startsWith('http') ? '_blank' : undefined"
              :rel="item.href?.startsWith('http') ? 'noopener noreferrer' : undefined"
              class="method"
            >
              <SocialIcon :name="item.icon" class="w-5 h-5 text-ember-ink shrink-0" />
              <span>
                <span class="block text-sm text-ink-3">{{ item.label }}</span>
                <span class="block font-semibold break-all">{{ item.value }}</span>
              </span>
            </component>
          </li>
        </ul>

        <div class="panel p-6 sm:p-9">
          <form v-if="status !== 'sent'" class="grid gap-5" @submit.prevent="submit">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="grid gap-2 text-sm font-semibold">
                Name
                <input v-model="form.name" class="field" name="name" autocomplete="name" required placeholder="Your name" />
              </label>
              <label class="grid gap-2 text-sm font-semibold">
                Email
                <input v-model="form.email" class="field" type="email" name="email" autocomplete="email" required placeholder="you@company.com" />
              </label>
            </div>
            <label class="grid gap-2 text-sm font-semibold">
              What do you need help with?
              <input v-model="form.subject" class="field" name="subject" required placeholder="e.g. Engineering manager role, infrastructure review" />
            </label>
            <label class="grid gap-2 text-sm font-semibold">
              Details
              <textarea v-model="form.message" class="field" name="message" rows="5" required placeholder="A few lines of context is plenty." />
            </label>
            <p v-if="status === 'error'" role="alert" class="text-sm font-semibold text-rose">
              Message didn't send. Check your connection and try again, or email {{ profile.email }} directly.
            </p>
            <button type="submit" class="btn btn-primary w-fit" :disabled="status === 'sending'">
              <Loader2 v-if="status === 'sending'" class="w-4 h-4 animate-spin" aria-hidden="true" />
              <Send v-else class="w-4 h-4" aria-hidden="true" />
              {{ status === 'sending' ? 'Sending' : 'Send message' }}
            </button>
          </form>

          <div v-else class="py-10" role="status">
            <span class="inline-grid place-items-center w-14 h-14 rounded-full bg-mint text-on-ember mb-5">
              <Check class="w-7 h-7" aria-hidden="true" />
            </span>
            <h3 class="font-display text-3xl font-semibold">Message sent</h3>
            <p class="mt-2 text-ink-2">Thanks, {{ form.name }}. I'll reply within two working days.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, Loader2, Send } from '@lucide/vue'
import SocialIcon from '../ui/SocialIcon.vue'
import { contactItems, profile } from '../../data/profile'

type Status = 'idle' | 'sending' | 'sent' | 'error'
const status = ref<Status>('idle')
const form = ref({ name: '', email: '', subject: '', message: '' })

const submit = async () => {
  status.value = 'sending'
  try {
    const data = new FormData()
    // Web3Forms access keys are public by design; they only route mail to the owner's inbox.
    data.append('access_key', '2dda2782-f7fe-45fe-918c-6fc64f4b6f93')
    for (const [k, v] of Object.entries(form.value)) data.append(k, v)
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    status.value = res.ok ? 'sent' : 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<style scoped>
.contact {
  z-index: 1;
}
.contact-title {
  margin-top: 1.5rem;
  font-size: clamp(2.5rem, 1.2rem + 5vw, 6.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.04em;
  max-width: 17ch;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem 0.45rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--c-line-2);
  background: var(--c-surface);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-ink-2);
}
.dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--c-mint);
}
.methods {
  border-top: 1px solid var(--c-line-2);
  align-self: start;
}
.method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--c-line);
  transition: padding-left 0.35s var(--ease-out);
}
a.method:hover {
  padding-left: 0.6rem;
}
button:disabled {
  opacity: 0.7;
  cursor: progress;
}
</style>
