export const dachshundDetailsGridData = (data: any) => [
  {
    title: 'Name',
    textKey: data?.name,
  },
  {
    title: 'Age',
    textKey: data?.ageString,
  },
  {
    title: 'Location',
    textKey: data?.location,
  },
  {
    title: 'Gender',
    textKey: data?.sex,
  },
  {
    title: 'Size',
    textKey: data?.sizeGroup,
  },
  {
    title: 'Primary Color',
    textKey: data?.colorDetails,
  },
  {
    title: 'Grooming Needs',
    textKey: data?.groomingNeeds,
  },
  {
    title: 'Ok with kids',
    textKey: data?.isKidsOk ? 'Yes' : 'No',
  },
  {
    title: 'Housetrained',
    textKey: data?.isHousetrained ? 'Yes' : 'No',
  },
  {
    title: 'New People Reaction',
    textKey: data?.newPeopleReaction,
  },
  {
    title: 'Vocal Level',
    textKey: data?.vocalLevel,
  },
  {
    title: 'Ok with dogs',
    textKey: data?.isDogsOk ? 'Yes' : 'No',
  },
  {
    title: 'Okay with cats',
    textKey: data?.isCatsOk ? 'Yes' : 'No',
  },
];
