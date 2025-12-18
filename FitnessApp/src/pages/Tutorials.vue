<template>
  <section class="grid" style="gap:20px">
    <div class="card">
      <h2 style="margin:0 0 16px">Exercise Tutorials</h2>
      <p class="small" style="margin-bottom: 20px">Learn the proper technique for your workouts.</p>
      
      <div class="grid grid-2">
        <div v-for="video in tutorials" :key="video.id" class="card tutorial-item">
          <a :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank" class="video-link">
            <div class="thumbnail-wrap">
              <img 
                :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`" 
                :alt="video.title"
                class="thumbnail"
              />
              <div class="play-overlay">▶</div>
            </div>
            <h3 class="small" style="margin: 10px 0 0; color: var(--text); font-weight: 700;">
              {{ video.title }}
            </h3>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tutorials = [
  { id: 'xJmrHrhBwqY', title: 'Smith Machine Lunges' },
  { id: 'RSs0uy5RpyQ', title: 'Smith Machine Close Grip Bench Press' },
  { id: 'UPy5MWbznmA', title: 'Smith Machine Bench Press' },
  { id: 'Jmu13BjwFUU', title: 'Chest Press Machine' },
  { id: 'GwB9DDjDr4g', title: 'Incline Smith Machine Bench Press' },
  { id: 'Attvr2JTXlU', title: 'Seated Cable Row' },
  { id: 'oSOcscPNNOc', title: 'Hack Squat' },
  { id: 'lRWzXTohBLo', title: 'Cable Crossover' },
  { id: 'W4t8lC1eUqQ', title: 'Tricep Dips' },
  { id: 'g2S5V7L6zzg', title: 'Classic Pull-Ups' },
  { id: 'x8sLSSjrwwc', title: 'Incline Cable Fly' }
]
</script>

<style scoped>
.tutorial-item {
  transition: transform 0.2s ease;
  padding: 10px;
  background: var(--surface-2);
}
.tutorial-item:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}
.video-link {
  text-decoration: none;
}
.thumbnail-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
}
.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.play-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: grid;
  place-items: center;
  font-size: 2rem;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}
.thumbnail-wrap:hover .play-overlay {
  opacity: 1;
}
</style>