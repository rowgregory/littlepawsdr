import WhoWeAre from '../components/assets/who-we-are-2.jpeg';
import OurPurpose from '../components/assets/our-purpose-3.jpeg';
import TheGoal from '../components/assets/the-goal-2.jpeg';

const missionStatementData = () => {
  return [
    {
      title: 'Who we are',
      text: 'LITTLE PAWS DACHSHUND RESCUE is an east coast based 501(c)3 exempt nonprofit dedicated to the rescue and re-homing of our favorite short legged breed.',
      image: WhoWeAre,
    },
    {
      title: `Our purpose`,
      text: `We specialize in finding permanent homes for dachshund and dachshund mixes. It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs and oversee their treatment and wellbeing while working to find loving owners for those in our care.`,
      image: OurPurpose,
    },
    {
      title: 'The goal',
      text: 'We strive to make the lives of all dogs better through action, advocacy, awareness and education. If you are looking for a new family member take a look at our available dachshund and dachshund mixes.',
      image: TheGoal,
    },
  ];
};

const mockNewsData = () => [
  {
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis est neque, sed sodales justo fermentum vitae. Cras pretium elementum.',
    article: '',
    author: '',
    date: 'October 6, 2021',
  },
  {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie porta libero sed imperdiet. Integer..',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend lacus eu eros consectetur tempus. Vivamus ut ipsum dui. Duis convallis, est ac dictum interdum, eros eros mollis libero, ut blandit arcu arcu ac quam. Donec nunc diam, imperdiet vitae lectus sit amet, interdum fringilla enim. Praesent dignissim odio nunc, iaculis lacinia purus gravida et',
    article: '',
    author: '',
    date: 'September 26, 2021',
  },
];

export { missionStatementData, mockNewsData };
