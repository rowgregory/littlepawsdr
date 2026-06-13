import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SqyshMascot } from '../components/SqyshMascot';

const APP = {
  name: 'lpdr',
  enterLabel: 'lpdr',
  bubble: 'hi — i built little paws.',
  log: [
    'wiring authentication + sessions ..... OK',
    'building the auction engine .......... OK',
    'assembling admin dashboard ........... OK',
    'syncing dogs from rescuegroups api ... OK',
  ],
};

// One timeline, explicit delays — the log must type sequentially like a real terminal.
const CMD = 0.9;
const CMD_DUR = 0.8;
const LINE_DUR = 0.4;
const LINE_GAP = 0.45;
const LINES = APP.log.map((_, i) => CMD + CMD_DUR + 0.2 + i * LINE_GAP);

const T = {
  mascot: 0,
  bubble: 0.3,
  wordmark: 0.55,
  cmd: CMD,
  cmdDur: CMD_DUR,
  lineDur: LINE_DUR,
  lines: LINES,
  badge: LINES[LINES.length - 1] + LINE_DUR + 0.1,
  ctas: LINES[LINES.length - 1] + LINE_DUR + 0.35,
};

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, easing: 'easeOut' },
});

const pop = (delay) => ({
  initial: { opacity: 0, scale: 0.92, y: 6 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.35, delay, easing: 'easeOut' },
});

// Left-to-right width reveal — with a mono font this reads as typing.
function TypedLine({ children, delay, duration, className }) {
  return (
    <p className={`flex ${className}`}>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration, delay, ease: 'linear' }}
        className='inline-block overflow-hidden whitespace-nowrap'
      >
        {children}
      </motion.span>
    </p>
  );
}

export default function SqyshSplash() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark px-4 py-10'>
      <div className='w-full max-w-xl'>
        {/* sqysh, front and center */}
        <motion.div {...fadeUp(T.mascot)} className='flex justify-center'>
          <SqyshMascot />
        </motion.div>

        {/* speech bubble */}
        <motion.div {...pop(T.bubble)} className='mt-2 flex justify-center'>
          <div className='relative border border-border-light dark:border-border-dark px-5 py-3'>
            <span
              aria-hidden
              className='absolute -top-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark'
            />
            <p className='font-mono text-sm text-text-light dark:text-text-dark'>{APP.bubble}</p>
          </div>
        </motion.div>

        {/* wordmark + tagline */}
        <motion.div {...fadeUp(T.wordmark)} className='mt-6 text-center'>
          <p className='font-mono text-xl font-bold text-text-light dark:text-text-dark'>sqysh</p>
          <p className='mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-[#0f766e] dark:text-[#37E1C2]'>
            we build software that powers you
          </p>
        </motion.div>

        {/* build log — types line by line */}
        <div className='mx-auto mt-8 w-fit'>
          <TypedLine
            delay={T.cmd}
            duration={T.cmdDur}
            className='font-mono text-sm text-text-light dark:text-text-dark'
          >
            <span className='mr-2 text-primary-light dark:text-primary-dark'>$</span>
            sqysh build {APP.name} --full-stack
          </TypedLine>

          <div className='mt-3 space-y-1.5'>
            {APP.log.map((l, i) => {
              const label = l.slice(0, l.lastIndexOf(' '));
              const status = l.slice(l.lastIndexOf(' ') + 1);
              return (
                <TypedLine
                  key={l}
                  delay={T.lines[i]}
                  duration={T.lineDur}
                  className='font-mono text-xs text-muted-light dark:text-muted-dark'
                >
                  {'> '}
                  {label}{' '}
                  <span className='font-bold text-primary-light dark:text-primary-dark'>
                    {status}
                  </span>
                </TypedLine>
              );
            })}
          </div>

          <motion.div {...fadeUp(T.badge)} className='mt-4 flex items-center gap-3'>
            <span className='inline-flex items-center gap-1.5 bg-primary-light dark:bg-primary-dark px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.15em] uppercase text-bg-light dark:text-bg-dark'>
              ✓ build complete
            </span>
            <span className='font-mono text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark'>
              deployed to production
            </span>
          </motion.div>
        </div>

        {/* command-row CTAs */}
        <motion.div {...fadeUp(T.ctas)} className='mt-10 space-y-2'>
          <Link
            to='/'
            className='flex items-center justify-between border px-4 py-3 font-mono text-sm transition-colors duration-150 border-primary-light text-primary-light hover:bg-primary-light hover:text-white dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-bg-dark'
          >
            <span>
              <span className='mr-2' aria-hidden='true'>
                $
              </span>
              {APP.enterLabel}
            </span>
            <span aria-hidden='true'>↵</span>
          </Link>
          <Link
            to='https://sqysh.io'
            className='flex items-center justify-between border border-border-light dark:border-border-dark px-4 py-3 font-mono text-sm text-muted-light dark:text-muted-dark transition-colors duration-150 hover:border-secondary-light hover:text-secondary-light dark:hover:border-secondary-dark dark:hover:text-secondary-dark'
          >
            <span>
              <span className='mr-2'>$</span>sqysh visit sqysh.io
            </span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
