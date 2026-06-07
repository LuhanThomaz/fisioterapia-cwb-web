'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

type Target = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
  lifespan: number;
};

type GameState = 'idle' | 'countdown' | 'playing' | 'finished';

type Burst = { id: number; x: number; y: number };
type FlyScore = { id: number; x: number; y: number };

const COLORS = ['#0d9488', '#6366f1', '#ec4899', '#f59e0b', '#06b6d4', '#10b981', '#8b5cf6'];
const DURATION = 30;

function accuracy(hits: number, misses: number) {
  const total = hits + misses;
  return total > 0 ? Math.round((hits / total) * 100) : 0;
}

function getResult(acc: number) {
  if (acc >= 85) return { label: 'Reflexos Excelentes!', desc: 'Sua coordenação motora está ótima! Manter-se ativo é fundamental.', emoji: '🏆', color: '#10b981' };
  if (acc >= 65) return { label: 'Boa Coordenação!', desc: 'Com acompanhamento fisioterapêutico você pode ir ainda mais longe.', emoji: '💪', color: '#0d9488' };
  if (acc >= 40) return { label: 'Coordenação Razoável', desc: 'A fisioterapia neuromotora pode trazer melhorias significativas.', emoji: '🎯', color: '#6366f1' };
  return { label: 'Há Espaço para Evoluir', desc: 'Uma avaliação fisioterapêutica é o primeiro passo para melhorar!', emoji: '🌱', color: '#f59e0b' };
}

const whatsappLink =
  'https://wa.me/5541987178565?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20minha%20avalia%C3%A7%C3%A3o%20de%20fisioterapia.';

export default function CoordinationGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [targets, setTargets] = useState<Target[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [flyScores, setFlyScores] = useState<FlyScore[]>([]);

  const areaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const spawnTarget = useCallback((): Target | null => {
    const el = areaRef.current;
    if (!el) return null;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const size = 38 + Math.random() * 28;
    if (w < size * 2 || h < size * 2) return null;
    return {
      id: nextId.current++,
      x: Math.random() * (w - size - 20) + 10,
      y: Math.random() * (h - size - 20) + 10,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      createdAt: Date.now(),
      lifespan: 1600 + Math.random() * 1200,
    };
  }, []);

  const reset = () => {
    setScore(0);
    setMissed(0);
    setTimeLeft(DURATION);
    setTargets([]);
    setBursts([]);
    setFlyScores([]);
    nextId.current = 0;
    setCountdown(3);
    setGameState('countdown');
  };

  // Countdown
  useEffect(() => {
    if (gameState !== 'countdown') return;
    if (countdown <= 0) { setGameState('playing'); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, countdown]);

  // Game loops
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnId = setInterval(() => {
      const t = spawnTarget();
      if (t) setTargets((ts) => [...ts, t]);
    }, 700);

    const cleanId = setInterval(() => {
      const now = Date.now();
      setTargets((ts) => {
        const expired = ts.filter((t) => now - t.createdAt >= t.lifespan);
        if (expired.length) setMissed((m) => m + expired.length);
        return ts.filter((t) => now - t.createdAt < t.lifespan);
      });
    }, 150);

    const timerId = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setGameState('finished'); setTargets([]); return 0; }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnId);
      clearInterval(cleanId);
      clearInterval(timerId);
    };
  }, [gameState, spawnTarget]);

  const hitTarget = (e: React.MouseEvent, target: Target) => {
    e.stopPropagation();
    setScore((s) => s + 1);
    setTargets((ts) => ts.filter((t) => t.id !== target.id));

    const rect = areaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, x, y }]);
      setFlyScores((f) => [...f, { id: id + 1, x, y }]);
      setTimeout(() => setBursts((b) => b.filter((b2) => b2.id !== id)), 600);
      setTimeout(() => setFlyScores((f) => f.filter((f2) => f2.id !== id + 1)), 800);
    }
  };

  const acc = accuracy(score, missed);
  const result = getResult(acc);
  const timerPct = (timeLeft / DURATION) * 100;
  const timerColor = timeLeft > 15 ? '#0d9488' : timeLeft > 8 ? '#f59e0b' : '#ef4444';

  return (
    <section className="game-section section-block" id="jogo" data-reveal>
      <div className="game-header-text">
        <span className="kicker">Interativo &amp; Educativo</span>
        <h2>
          Teste sua{' '}
          <span className="gradient-text">Coordenação Motora</span>
        </h2>
        <p className="game-desc">
          A coordenação neuromotora é um indicador chave da saúde física. Clique
          nos alvos antes que desapareçam e descubra como está a sua!
        </p>
      </div>

      <div className="game-ui">
        <div className="game-scoreboard">
          <div className="score-item">
            <span className="score-num">{score}</span>
            <span className="score-lbl">Acertos</span>
          </div>

          <div className="score-timer-wrap">
            <svg className="timer-ring" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" className="timer-ring-bg" />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="timer-ring-fill"
                style={{
                  strokeDashoffset: `${176 - (176 * timerPct) / 100}`,
                  stroke: timerColor,
                }}
              />
            </svg>
            <span className="timer-num" style={{ color: timerColor }}>
              {timeLeft}
            </span>
          </div>

          <div className="score-item">
            <span className="score-num score-missed">{missed}</span>
            <span className="score-lbl">Perdidos</span>
          </div>
        </div>

        <div ref={areaRef} className={`game-area state-${gameState}`}>
          {/* Idle */}
          {gameState === 'idle' && (
            <div className="game-overlay">
              <div className="game-intro-card">
                <div className="game-icon-big">🎯</div>
                <h3>Pronto para o Desafio?</h3>
                <p>
                  Clique nos alvos coloridos antes que desapareçam.
                  <br />
                  Você tem <strong>30 segundos</strong>!
                </p>
                <button className="button button-primary btn-game-start" onClick={reset}>
                  Iniciar Jogo
                </button>
              </div>
            </div>
          )}

          {/* Countdown */}
          {gameState === 'countdown' && (
            <div className="game-overlay">
              <div className="countdown-display">
                <span className="countdown-num" key={countdown}>
                  {countdown}
                </span>
              </div>
            </div>
          )}

          {/* Result */}
          {gameState === 'finished' && (
            <div className="game-overlay">
              <div className="result-card">
                <span className="result-emoji">{result.emoji}</span>
                <h3 style={{ color: result.color }}>{result.label}</h3>
                <div className="result-metrics">
                  <div className="result-metric">
                    <span>{score}</span>
                    <small>acertos</small>
                  </div>
                  <div className="result-metric highlight" style={{ '--highlight-color': result.color } as React.CSSProperties}>
                    <span>{acc}%</span>
                    <small>precisão</small>
                  </div>
                  <div className="result-metric">
                    <span>{missed}</span>
                    <small>perdidos</small>
                  </div>
                </div>
                <p>{result.desc}</p>
                <div className="result-actions">
                  <button className="button btn-replay" onClick={reset}>
                    Jogar Novamente
                  </button>
                  <a
                    className="button button-primary"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar Avaliação
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Targets */}
          {gameState === 'playing' &&
            targets.map((target) => (
              <button
                key={target.id}
                className="game-target"
                style={
                  {
                    left: target.x,
                    top: target.y,
                    width: target.size,
                    height: target.size,
                    '--tc': target.color,
                    '--lifespan': `${target.lifespan}ms`,
                  } as React.CSSProperties
                }
                onClick={(e) => hitTarget(e, target)}
                aria-label="Clique no alvo"
              />
            ))}

          {/* Click bursts */}
          {bursts.map((b) => (
            <div key={b.id} className="click-burst" style={{ left: b.x, top: b.y }} />
          ))}

          {/* +1 fly */}
          {flyScores.map((f) => (
            <div key={f.id} className="fly-score" style={{ left: f.x, top: f.y }}>
              +1
            </div>
          ))}
        </div>
      </div>

      <div className="game-footer-note">
        <span>💡</span>
        <p>
          A fisioterapia neuromotora melhora reflexos, coordenação e equilíbrio
          em todas as idades.
        </p>
      </div>
    </section>
  );
}
