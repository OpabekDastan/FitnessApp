<template>
  <div class="card timer-container">
    <div class="row" style="justify-content: space-between; margin-bottom: 12px;">
      <strong class="small">Rest Timer ⏱️</strong>
      <span v-if="isActive" class="badge active-badge">Running</span>
    </div>

    <div class="timer-display" :class="{ 'is-finished': timeLeft === 0 && !isActive }">
      {{ formatTime(timeLeft) }}
    </div>

    <div class="grid" style="gap: 12px;">
      <div class="field">
        <label class="small">Set seconds:</label>
        <div class="row" style="gap: 8px;">
          <input 
            type="number" 
            v-model.number="customSeconds" 
            class="input" 
            placeholder="Sec..."
            min="1"
          />
          <button class="btn ghost" @click="setCustomTime">Set</button>
        </div>
      </div>

      <div class="row" style="gap: 8px; justify-content: center;">
        <button v-for="s in [30, 60, 90]" :key="s" 
          class="btn ghost timer-btn-sm" 
          @click="setTime(s)">
          {{ s }}s
        </button>
      </div>

      <div class="row" style="gap: 8px;">
        <button v-if="!isActive" class="btn" style="flex: 2" @click="start" :disabled="timeLeft <= 0">
          {{ timeLeft === 0 ? 'Restart' : 'Start' }}
        </button>
        <button v-else class="btn" style="flex: 2; background: var(--warning); color: #000" @click="pause">
          Pause
        </button>
        <button class="btn ghost" style="flex: 1" @click="reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const timeLeft = ref(60)
const customSeconds = ref(60)
const isActive = ref(false)
let interval = null

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function setCustomTime() {
  if (customSeconds.value > 0) {
    pause() // Останавливаем текущий ход, если он был
    timeLeft.value = customSeconds.value
  }
}

function setTime(s) {
  pause() // Останавливаем текущий ход
  timeLeft.value = s // Просто обновляем цифры на табло
}

function start() {
  if (isActive.value) return
  if (timeLeft.value <= 0) return
  
  isActive.value = true
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      complete()
    }
  }, 1000)
}

function pause() {
  isActive.value = false
  clearInterval(interval)
}

function reset() {
  pause()
  timeLeft.value = 60
}

function complete() {
  pause()
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 440
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1)
    osc.stop(ctx.currentTime + 1)
  } catch (e) { console.log('Audio not supported') }
}

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.timer-container { border: 1px solid var(--border); background: var(--surface-2); }
.timer-display { font-size: 3rem; font-weight: 800; text-align: center; color: var(--accent); margin: 10px 0; }
.timer-btn-sm { padding: 4px 12px; font-size: 0.8rem; min-width: 60px; flex: 1; }
.active-badge { color: var(--accent); border-color: var(--accent); }
.is-finished { color: var(--danger); animation: pulse 1s infinite; }
@keyframes pulse { 50% { opacity: 0.5; } }
</style>