import HttpError from '@wasp/core/HttpError.js'

export const getUserPlants = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Plant.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getWateringDaysLeft = async ({ plantId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const plant = await context.entities.Plant.findUnique({
    where: { id: plantId, userId: context.user.id },
  });

  if (!plant) throw new HttpError(404, 'No plant with id ' + plantId + ' found for user ' + context.user.id);

  const currentDate = new Date();
  const lastWateredAt = new Date(plant.lastWateredAt);
  const wateringFrequency = plant.wateringFrequency;

  const timeDiff = currentDate.getTime() - lastWateredAt.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return wateringFrequency - daysDiff;
}