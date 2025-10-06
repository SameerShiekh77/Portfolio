import { onMounted, onUnmounted } from 'vue'

export const useScrollAnimation = () => {
  const observeElements = (selector, animationClass = 'animate-fadeInUp') => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass)
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'none'
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    onMounted(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => observer.observe(el))
    })

    onUnmounted(() => {
      observer.disconnect()
    })

    return observer
  }

  return {
    observeElements
  }
}