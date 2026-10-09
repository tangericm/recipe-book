import { amount, clock } from '../lib/format';

type Timer = { label: string; total: number; end?: number; left: number; running: boolean };
type State = {
  yield?: number;
  ing: string[];
  done: number[];
  at: number;
  timers: Record<string, Timer>;
};
type Data = { slug: string; steps: { phase: string; timer: number }[] };

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(sel),
];

export function initRecipe() {
  const data: Data = JSON.parse($('#recipe-data')!.textContent!);
  const sheet = $('.sheet')!;
  const base = Number(sheet.dataset.base);
  const yieldStep = Number(sheet.dataset.step);
  const KEY = `homecooking:recipe:${data.slug}`;
  const last = data.steps.length + 1; // panels: 0 mise, 1..n steps, n+1 done

  const fresh = (): State => ({ ing: [], done: [], at: 0, timers: {} });
  let state: State = fresh();
  try {
    state = { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    /* unreadable storage: start clean */
  }
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* private mode: progress lasts this visit */
    }
  };

  /* ---------- Scaling ---------- */
  const yieldOut = $<HTMLOutputElement>('#yield-n');
  function applyScale() {
    const y = state.yield ?? base;
    const scale = y / base;
    if (yieldOut) yieldOut.value = String(y);
    $$('.q[data-qty]').forEach((el) => {
      el.textContent = amount(Number(el.dataset.qty), el.dataset.unit, scale);
    });
  }
  $$<HTMLButtonElement>('[data-yield]').forEach((b) =>
    b.addEventListener('click', () => {
      const dir = Number(b.dataset.yield);
      const y = state.yield ?? base;
      const next = Math.max(yieldStep, y + dir * yieldStep);
      state.yield = next === base ? undefined : next;
      save();
      applyScale();
    }),
  );

  /* ---------- Ingredient ticks (card and mise en place share state) ---------- */
  const ingBoxes = $$<HTMLInputElement>('input[data-ing]');
  function applyTicks() {
    ingBoxes.forEach((b) => (b.checked = state.ing.includes(b.dataset.ing!)));
  }
  ingBoxes.forEach((b) =>
    b.addEventListener('change', () => {
      const id = b.dataset.ing!;
      state.ing = b.checked ? [...new Set([...state.ing, id])] : state.ing.filter((x) => x !== id);
      save();
      applyTicks();
    }),
  );

  /* ---------- Timers ---------- */
  let tick: number | undefined;
  let audio: AudioContext | undefined;

  const remaining = (t: Timer) => (t.running && t.end ? (t.end - Date.now()) / 1000 : t.left);

  function chime() {
    try {
      audio ??= new AudioContext();
      const now = audio.currentTime;
      [0, 0.32, 0.64].forEach((at) => {
        const o = audio!.createOscillator();
        const g = audio!.createGain();
        o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, now + at);
        g.gain.exponentialRampToValueAtTime(0.35, now + at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.26);
        o.connect(g).connect(audio!.destination);
        o.start(now + at);
        o.stop(now + at + 0.3);
      });
    } catch {
      /* no audio available */
    }
    navigator.vibrate?.([220, 120, 220, 120, 220]);
  }

  function startTimer(index: number, total: number) {
    audio ??= new AudioContext(); // unlock audio inside the user gesture
    const existing = state.timers[index];
    if (existing && !existing.running && existing.left > 0) {
      existing.running = true;
      existing.end = Date.now() + existing.left * 1000;
    } else {
      state.timers[index] = {
        label: `Step ${index}`,
        total,
        left: total,
        running: true,
        end: Date.now() + total * 1000,
      };
    }
    save();
    render();
    loop();
  }
  function pauseTimer(index: number) {
    const t = state.timers[index];
    if (!t) return;
    t.left = remaining(t);
    t.running = false;
    t.end = undefined;
    save();
    render();
  }
  function clearTimer(index: number) {
    delete state.timers[index];
    save();
    render();
  }

  const fired = new Set<string>();
  function loop() {
    if (tick) return;
    tick = window.setInterval(() => {
      const anyRunning = Object.values(state.timers).some((t) => t.running);
      Object.entries(state.timers).forEach(([k, t]) => {
        if (t.running && remaining(t) <= 0 && !fired.has(k)) {
          fired.add(k);
          chime();
        }
      });
      render();
      if (!anyRunning) {
        window.clearInterval(tick);
        tick = undefined;
      }
    }, 250);
  }

  function chip(index: string, t: Timer) {
    const left = remaining(t);
    const el = document.createElement('div');
    el.className = 'chip';
    el.dataset.state = left <= 0 ? 'over' : t.running ? 'running' : 'paused';
    const go = document.createElement('button');
    go.type = 'button';
    go.textContent = `${t.label}  ${left <= 0 ? `Done ${clock(left)}` : clock(left)}`;
    go.setAttribute('aria-label', `${t.label} timer, ${left <= 0 ? 'finished' : `${clock(left)} left`}. Go to step`);
    go.addEventListener('click', () => openCook(Number(index)));
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = left <= 0 ? 'OK' : t.running ? 'Pause' : 'Go';
    x.addEventListener('click', () => {
      if (left <= 0) clearTimer(Number(index));
      else if (t.running) pauseTimer(Number(index));
      else startTimer(Number(index), t.total);
    });
    el.append(go, x);
    return el;
  }

  function render() {
    const entries = Object.entries(state.timers);
    const trays = [$('#tray-page')!, $('#tray-cook')!];
    trays.forEach((tray) => tray.replaceChildren(...entries.map(([k, t]) => chip(k, t))));
    // Big clocks inside the cook panels
    $$('[data-clock]').forEach((c) => {
      const index = c.dataset.clock!;
      const total = Number(c.dataset.seconds);
      const t = state.timers[index];
      const face = $('.clock__face', c)!;
      const go = $<HTMLButtonElement>('.clock__go', c)!;
      const reset = $<HTMLButtonElement>('.clock__reset', c)!;
      const label = $('span', go)!;
      if (!t) {
        c.dataset.state = 'idle';
        face.textContent = clock(total);
        label.textContent = 'Start timer';
        reset.hidden = true;
        return;
      }
      const left = remaining(t);
      c.dataset.state = left <= 0 ? 'over' : t.running ? 'running' : 'paused';
      face.textContent = clock(left);
      label.textContent = left <= 0 ? 'Timer done' : t.running ? 'Pause' : 'Resume';
      reset.hidden = false;
    });
    // Timer chips on the card mirror their state too.
    $$<HTMLButtonElement>('.timer-chip').forEach((b) => {
      const t = state.timers[b.dataset.timer!];
      b.dataset.state = !t ? 'idle' : remaining(t) <= 0 ? 'over' : t.running ? 'running' : 'paused';
    });
  }

  $$<HTMLButtonElement>('[data-timer]').forEach((b) =>
    b.addEventListener('click', () => {
      const index = Number(b.dataset.timer);
      const t = state.timers[index];
      if (t && t.running && remaining(t) > 0) pauseTimer(index);
      else if (t && remaining(t) <= 0) clearTimer(index);
      else startTimer(index, Number(b.dataset.seconds));
    }),
  );
  $$<HTMLButtonElement>('[data-reset]').forEach((b) =>
    b.addEventListener('click', () => clearTimer(Number(b.dataset.reset))),
  );

  /* ---------- Guided cook mode ---------- */
  const dialog = $<HTMLDialogElement>('#cook')!;
  const panels = $$('.panel', dialog);
  const trackBtns = $$<HTMLButtonElement>('[data-go]', dialog);
  const where = $('#cook-where')!;
  const nextBtn = $<HTMLButtonElement>('#next')!;
  const nextLabel = $('#next-label')!;
  const prevBtn = $<HTMLButtonElement>('#prev')!;

  function stampStep(i: number) {
    const btn = trackBtns.find((b) => Number(b.dataset.go) === i);
    if (btn) btn.dataset.done = '';
    $(`.step[data-index="${i}"]`)?.setAttribute('data-done', '');
  }
  function applyDone() {
    trackBtns.forEach((b) => {
      const i = Number(b.dataset.go);
      if (state.done.includes(i)) b.dataset.done = '';
      else delete b.dataset.done;
    });
    $$('.step').forEach((s) => {
      if (state.done.includes(Number(s.dataset.index))) s.setAttribute('data-done', '');
      else s.removeAttribute('data-done');
    });
  }

  function show(i: number, dir: 1 | -1 | 0 = 0) {
    i = Math.max(0, Math.min(last, i));
    state.at = i;
    save();
    panels.forEach((p) => {
      const on = Number(p.dataset.panel) === i;
      p.hidden = !on;
      p.classList.remove('is-entering', 'is-entering-back');
      if (on && dir) {
        void p.offsetWidth;
        p.classList.add(dir > 0 ? 'is-entering' : 'is-entering-back');
      }
    });
    trackBtns.forEach((b) => {
      if (Number(b.dataset.go) === i) {
        b.setAttribute('aria-current', 'step');
        b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      } else b.removeAttribute('aria-current');
    });
    const n = data.steps.length;
    if (i === 0) where.textContent = 'Get everything out';
    else if (i === last) where.textContent = 'Finished';
    else where.textContent = `Step ${i} of ${n}${data.steps[i - 1].phase ? `  ·  ${data.steps[i - 1].phase}` : ''}`;
    prevBtn.disabled = i === 0;
    nextBtn.hidden = i === last;
    nextLabel.textContent = i === 0 ? 'Start cooking' : i === n ? 'Done, finish' : 'Done, next step';
    $('#stage')!.scrollTop = 0;
    const focusTarget = $<HTMLElement>('[tabindex="-1"]', panels.find((p) => !p.hidden)!);
    focusTarget?.focus({ preventScroll: true });
    updateOpenLabel();
  }

  /* Wake lock: keep the screen on while the cook view is open. */
  let lock: WakeLockSentinel | null = null;
  let wantAwake = true;
  const awakeBtn = $<HTMLButtonElement>('#awake')!;
  const supportsLock = 'wakeLock' in navigator;
  awakeBtn.hidden = !supportsLock;
  async function holdAwake() {
    if (!supportsLock || !wantAwake || !dialog.open || document.visibilityState !== 'visible') return;
    try {
      lock = await navigator.wakeLock.request('screen');
      awakeBtn.setAttribute('aria-pressed', 'true');
      lock.addEventListener('release', () => {
        lock = null;
        awakeBtn.setAttribute('aria-pressed', 'false');
      });
    } catch {
      awakeBtn.setAttribute('aria-pressed', 'false');
    }
  }
  awakeBtn.addEventListener('click', async () => {
    wantAwake = !lock;
    if (lock) await lock.release();
    else await holdAwake();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      holdAwake();
      render();
    }
  });

  function openCook(at = state.at) {
    if (!dialog.open) dialog.showModal();
    holdAwake();
    show(at);
  }
  function closeCook() {
    dialog.close();
  }
  dialog.addEventListener('close', () => {
    lock?.release();
    updateOpenLabel();
  });

  nextBtn.addEventListener('click', () => {
    const i = state.at;
    if (i > 0 && !state.done.includes(i)) {
      state.done.push(i);
      stampStep(i);
      const btn = trackBtns.find((b) => Number(b.dataset.go) === i);
      btn?.animate(
        [
          { transform: 'scale(1.35)', opacity: 0.4 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        { duration: 240, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    }
    show(i + 1, 1);
  });
  prevBtn.addEventListener('click', () => show(state.at - 1, -1));
  trackBtns.forEach((b) =>
    b.addEventListener('click', () => {
      const i = Number(b.dataset.go);
      show(i, i > state.at ? 1 : -1);
    }),
  );
  $('#cook-close')!.addEventListener('click', closeCook);
  $('#cook-finish')!.addEventListener('click', () => {
    closeCook();
    $('.method')?.scrollIntoView({ behavior: 'smooth' });
  });
  dialog.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    if (t.matches('input, textarea')) return;
    if (e.key === 'ArrowRight' && state.at < last) nextBtn.click();
    if (e.key === 'ArrowLeft' && state.at > 0) prevBtn.click();
  });

  const openBtn = $<HTMLButtonElement>('#cook-open')!;
  const openLabel = $('#cook-open-label')!;
  const restartBtn = $<HTMLButtonElement>('#cook-restart')!;
  function updateOpenLabel() {
    const n = data.steps.length;
    const inProgress = state.at > 0 && state.at <= n;
    openLabel.textContent = inProgress ? `Resume at step ${state.at} of ${n}` : 'Cook this, step by step';
    restartBtn.hidden = !(inProgress || state.done.length || state.ing.length);
  }
  openBtn.addEventListener('click', () => openCook(state.at === last ? 0 : state.at));
  restartBtn.addEventListener('click', () => {
    const keepYield = state.yield;
    state = { ...fresh(), yield: keepYield };
    save();
    applyTicks();
    applyDone();
    render();
    updateOpenLabel();
    openCook(0);
  });
  $('#print-page')!.addEventListener('click', () => window.print());

  // Timer chips on the card render into the floating tray; a finished timer
  // that was left behind still chimes when the page comes back.
  applyScale();
  applyTicks();
  applyDone();
  render();
  updateOpenLabel();
  if (Object.values(state.timers).some((t) => t.running)) loop();
  if (location.hash === '#cook') openCook();
}
