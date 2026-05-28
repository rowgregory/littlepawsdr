import BottomInfo from '../../components/dachshund/BottomInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { NoImgDog } from '../../components/assets';
import { Link } from 'react-router-dom';
import { useGetDachshundByIdQuery } from '../../redux/services/rescueGroupsApi';
import useSingleItemCarousel from '../../hooks/useSingleItemCarousel';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import SingleItemCarousel from '../../components/common/SingleItemCarousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Decode HTML entities (&#39; &amp; &nbsp; etc.)
const decode = (str) => {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
};

function parseDescription(raw) {
  const decoded = decode(raw);
  const lines = decoded
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && l !== '\u00A0'); // drop empty + nbsp-only lines

  const quickFacts = [] as any;
  const sections = [] as any;
  let current = null as any;

  const headers = ['Overview', 'Environment', 'Pets & People', 'Health', 'Location'];

  lines.forEach((line) => {
    if (line.startsWith('●')) {
      const [label, ...rest] = line.replace('●', '').split(':');
      quickFacts.push({ label: label.trim(), value: rest.join(':').trim() });
    } else if (headers.includes(line)) {
      current = { title: line, body: [] };
      sections.push(current);
    } else if (current) {
      current.body.push(line);
    }
  });

  return { quickFacts, sections };
}

const DachshundDetails = () => {
  const { id } = useParams() as any;
  const navigate = useNavigate();

  const { isLoading } = useGetDachshundByIdQuery(id, { refetchOnMountOrArgChange: true });
  const { dachshund, dogStatusId } = useAppSelector((state: RootState) => state.dachshund);

  const { next, previous, currentIndex, totalItems, setCurrentIndex } = useSingleItemCarousel(
    dachshund?.attributes.photos || [],
  );

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='dot-spinner'></div>
      </div>
    );
  }

  const { quickFacts, sections } = parseDescription(
    dachshund?.attributes?.descriptionHtml || dachshund?.attributes?.descriptionText,
  );

  const overview = sections.find((s) => s.title === 'Overview');
  const restSections = sections.filter((s) => s.title !== 'Overview');

  return (
    <div className='min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark'>
      {/* HERO — full-bleed photo with name overlay */}
      <section className='relative w-full h-[70vh] min-h-[420px] overflow-hidden group'>
        <SingleItemCarousel
          items={dachshund?.attributes.photos || [NoImgDog]}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          totalItems={totalItems}
        />

        {/* gradient scrim */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30' />

        {/* back button, top-left over hero */}
        <button
          onClick={() => navigate(-1)}
          className='absolute z-20 top-6 left-6 flex items-center gap-x-2 py-2 px-4 bg-white/85 hover:bg-white text-text-light transition-colors'
        >
          <ChevronLeft className='w-4 h-4' />
          Back to all pups
        </button>

        {/* name + meta + adopt overlay */}
        <div className='absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-10 pb-10 pt-20'>
          <div className='max-w-screen-md mx-auto w-full flex items-end justify-between gap-4'>
            <div>
              <h1 className='text-5xl sm:text-6xl font-bold text-white drop-shadow-sm mb-2'>
                {dachshund?.attributes?.name}
              </h1>
              <p className='text-lg text-white/90 capitalize'>
                {dachshund?.attributes?.ageGroup} · {dachshund?.attributes?.sex} ·{' '}
                {dachshund?.attributes?.breedString}
              </p>
            </div>
            {dogStatusId === '1' && (
              <Link
                to='/adopt'
                className='shrink-0 font-bold py-3 px-7 cursor-pointer transition-transform hover:scale-105 bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark shadow-lg'
              >
                Adopt me ♥
              </Link>
            )}
          </div>
        </div>

        {/* carousel arrows */}
        <button
          onClick={previous}
          aria-label='Previous'
          className='absolute z-20 left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-white/80 hover:bg-white text-primary-light transition-colors opacity-0 group-hover:opacity-100'
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          aria-label='Next'
          className='absolute z-20 right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 bg-white/80 hover:bg-white text-primary-light transition-colors opacity-0 group-hover:opacity-100'
        >
          <ChevronRight />
        </button>
      </section>

      {/* CONTENT */}
      <div className='max-w-screen-md mx-auto w-full px-6 py-16'>
        {/* STORY FIRST */}
        {overview && (
          <section className='mb-10'>
            <p className='text-xl sm:text-2xl leading-relaxed'>{overview.body.join(' ')}</p>
          </section>
        )}

        {/* QUICK-FACT CHIPS */}
        <section className='flex flex-wrap gap-3 mb-14'>
          {quickFacts.map((f, i) => (
            <div
              key={i}
              className='flex items-center gap-2 py-2 px-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'
            >
              <span className='text-xs font-bold uppercase tracking-wide text-primary-light dark:text-primary-dark'>
                {f.label}
              </span>
              <span className='text-sm capitalize'>{f.value}</span>
            </div>
          ))}
        </section>

        {/* REMAINING SECTIONS */}
        <div className='space-y-10'>
          {restSections.map((s, i) => (
            <section key={i} className='relative pl-5'>
              <span className='absolute left-0 top-1 bottom-1 w-1 bg-secondary-light dark:bg-secondary-dark' />
              <h3 className='text-xl font-bold mb-3 text-secondary-light dark:text-secondary-dark'>
                {s.title}
              </h3>
              {s.body.map((p, j) => (
                <p key={j} className='leading-relaxed mb-3'>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* ADOPTION INFO */}
        <section className='mt-16 p-6 sm:p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark'>
          <h2 className='font-bold text-2xl mb-5'>
            Adoption Fees, Transportation &amp; Health Certificate Costs
          </h2>
          <BottomInfo />
        </section>
      </div>
    </div>
  );
};

export default DachshundDetails;
