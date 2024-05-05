export const dachshundDetailsGridData = (data: any) => [
  {
    title: 'Name',
    textKey: data[0]?.attributes?.name,
  },
  {
    title: 'Age',
    textKey: data[0]?.attributes?.ageString,
  },
  {
    title: 'Gender',
    textKey: data[0]?.attributes?.sex,
  },
  {
    title: 'Size',
    textKey: data[0]?.attributes?.sizeGroup,
  },
  {
    title: 'Primary Color',
    textKey: data[0]?.attributes?.colorDetails,
  },
  {
    title: 'Grooming Needs',
    textKey: data[0]?.attributes?.groomingNeeds,
  },
  {
    title: 'Ok with kids',
    textKey: data[0]?.attributes?.isKidsOk ? 'Yes' : 'No',
  },
  {
    title: 'Housetrained',
    textKey: data[0]?.attributes?.isHousetrained ? 'Yes' : 'No',
  },
  {
    title: 'New People Reaction',
    textKey: data[0]?.attributes?.newPeopleReaction,
  },
  {
    title: 'Vocal Level',
    textKey: data[0]?.attributes?.vocalLevel,
  },
  {
    title: 'Ok with dogs',
    textKey: data[0]?.attributes?.isDogsOk ? 'Yes' : 'No',
  },
  {
    title: 'Okay with cats',
    textKey: data[0]?.attributes?.isCatsOk ? 'Yes' : 'No',
  },
];
