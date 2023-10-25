export const dachshundDetailsGridData = (info: any) => [
  {
    title: 'Name',
    textKey: info?.attributes?.name,
  },
  {
    title: 'Age',
    textKey: info?.attributes?.ageString,
  },
  {
    title: 'Gender',
    textKey: info?.attributes?.sex,
  },
  {
    title: 'Size',
    textKey: info?.attributes?.sizeGroup,
  },
  {
    title: 'Primary Color',
    textKey: info?.attributes?.colorDetails,
  },
  {
    title: 'Grooming Needs',
    textKey: info?.attributes?.groomingNeeds,
  },
  {
    title: 'Ok with kids',
    textKey: info?.attributes?.isKidsOk ? 'YES' : 'NO',
  },
  {
    title: 'Housetrained',
    textKey: info?.attributes?.isHousetrained ? 'YES' : 'NO',
  },
  {
    title: 'New People Reaction',
    textKey: info?.attributes?.newPeopleReaction,
  },
  {
    title: 'Vocal Level',
    textKey: info?.attributes?.vocalLevel,
  },
  {
    title: 'Ok with dogs',
    textKey: info?.attributes?.isDogsOk ? 'YES' : 'NO',
  },
  {
    title: 'Okay with cats',
    textKey: info?.attributes?.isCatsOk ? 'YES' : 'NO',
  },
];
