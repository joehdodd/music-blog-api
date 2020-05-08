import models from "../models";

export default async () => {
  await models.Post.bulkCreate(
    [
      {
        title: "Sh'Diah - Bon Iver",
        description: 'Shittiest Day in American History.'
      },
      {
        title: 'Maybe - As Cities Burn',
        description: 'The best!'
      },
      {
        title: 'i,i - Bon Iver',
        description: 'An amazing album.'
      },
      {
        title: 'Aimless Arrow - Converge',
        description: 'Heavy.'
      },
    ]
  )
};
