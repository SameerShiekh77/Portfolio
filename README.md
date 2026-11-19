# Muhammad Sameer: Portfolio

A scroll-driven, 3D storytelling portfolio for Muhammad Sameer, Software Engineering Manager (DevOps and full-stack). A rigged 3D avatar guides the page: a face close-up in the hero, full body in the story, then it walks away and the content takes over.

Built with Nuxt 4, Vue 3, Tailwind CSS 4, TresJS (Three.js), GSAP and Lenis.

## Highlights

- **3D avatar guide.** A rigged GLB model that follows the cursor, breathes, and changes mood (pose, posture, light colour) as you scroll. It exists only in the first two sections.
- **Network background.** A second, lightweight canvas draws a node network that grows as you scroll.
- **Sections.** Hero, Story, Journey (timeline and roles), Work (filterable project grid with case studies), Skills, Leadership, Voices, Writing, Contact.
- **Dark and light themes.** Dark is the default. The toggle cross-fades the whole page and the choice is remembered.
- **Smooth interactions.** Filters, the roles accordion, skill tabs, testimonials, the contact form and the case-study dialog all animate in and out.
- **Accessible.** Skip link, visible focus, ARIA tabs, a native `<dialog>` for case studies, and full `prefers-reduced-motion` support (the 3D scene is skipped entirely).
- **SEO.** `@nuxtjs/seo` for meta, sitemap, Open Graph and schema.org data.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Nuxt 4, Vue 3, TypeScript |
| Styling | Tailwind CSS 4 with design tokens in `app/assets/css/main.css` |
| 3D | TresJS (`@tresjs/core`) on Three.js, GLTF with Meshopt compression |
| Motion | GSAP and ScrollTrigger, Lenis smooth scrolling, Vue `<Transition>` |
| Icons | `@lucide/vue` |
| Images | `@nuxt/image` |
| Fonts | Clash Display and Satoshi, self-hosted in `public/fonts` |

## Getting started

Requires Node 20.19 or newer.

```bash
yarn install
yarn dev          # http://localhost:3000
```

Use one package manager. The repo is set up for **yarn**; a stray `package-lock.json` can make different machines install different versions.

On WSL, keep the project inside the Linux filesystem (for example `~/projects`) rather than `/mnt/d`. Installs and hot reload are many times faster there. If you must stay on `/mnt/d`, use `yarn dev:wsl`, which enables file polling.

## Scripts

| Command | What it does |
|---|---|
| `yarn dev` | Development server |
| `yarn build` | Production build |
| `yarn generate` | Static build (what Netlify runs), output in `.output/public` |
| `yarn preview` | Preview a production build |

## Project structure

```
app/
  app.vue                      Page shell, SEO, scroll progress
  plugins/lenis.client.ts      Lenis + GSAP ScrollTrigger setup
  assets/css/main.css          Design tokens, themes, shared components
components/
  layout/                      SiteNav, SiteFooter
  sections/                    One file per page section, plus ProjectDialog
  three/
    AvatarCanvas.client.vue    Canvas for the avatar
    AvatarModel.vue            Model loading, scroll choreography, moods, head tracking
    SceneCanvas.client.vue     Canvas for the network background
    SceneContent.vue           The node network
  ui/                          DynamicIcon, SocialIcon
composables/                   useTheme, useScene (shared scroll/pointer state), useReducedMotion
data/                          All site content (see below)
public/
  models/avatar-opt.glb        The avatar
  fonts/                       Self-hosted fonts
```

## Editing content

Everything on the page comes from `data/`:

| File | Content |
|---|---|
| `profile.ts` | Name, contact details, story chapters, socials, availability |
| `site.ts` | Hero text and stats, nav links, leadership principles, blog placeholders |
| `experience.ts` | Roles and the career timeline |
| `projects.ts` | Case studies, metrics and screenshots |
| `skills.ts` | Skill groups and levels |
| `testimonials.ts` | Testimonials |

Anything that still needs your own words is marked `[PLACEHOLDER: ...]`, mostly in `data/site.ts` (leadership proof, team rituals, blog posts). Search the repo for `PLACEHOLDER` to find them all.

### Project screenshots

Put images in `public/images/screenshots/` and list their paths in a project's `screenshots` array. Projects without one show their icon instead.

## The 3D avatar

- **Model:** `public/models/avatar-opt.glb`. It needs a Mixamo-style skeleton (`Head`, `Neck`, `Spine2`, `LeftArm`, `LeftForeArm` and so on). An Avaturn export works as is.
- **Where it appears:** `stops` in `AvatarModel.vue` define its position, scale and mood at each scroll position. The last stop moves it off screen; nothing is drawn after that.
- **Moods:** `MOODS` in the same file holds the two poses (`confident` for the hero, `thoughtful` for the story). Add a mood there and a stop that uses it to add a new pose.
- **Limits:** the model has no eye bones or face blendshapes, so the face follows the cursor by turning the head and neck, and mood comes from posture and lighting rather than expression.
- **Fallback:** with reduced motion or no WebGL, the avatar and network are skipped and the static gradient backdrop is used.

## Deployment

The site is a static build on Netlify.

- **Build command:** `yarn generate` (or `npm run generate`)
- **Publish directory:** `dist`

Notes:

- `experimental.payloadExtraction` is turned off in `nuxt.config.ts`. With it on, `nuxt generate` builds the cache key `/` for the home page, which `unstorage` 1.17.x rejects with `Invalid key: "/"`, failing the build. This is a single-page site, so the page data is inlined in the HTML instead.
- `nitro.prerender.ignore` skips `/.netlify`, which only exists at runtime.
- `site.url` in `nuxt.config.ts` drives canonical URLs, the sitemap and social-card links. Point it at the real production domain.

## Contact form

The form posts to [Web3Forms](https://web3forms.com). The access key in `ContactSection.vue` is public by design: it only routes messages to your inbox. Replace it with your own key if you change the destination address.

## Related notes

`PRIVATE_PROJECTS_GUIDE.md` describes an older version of the project gallery and may be out of date.
