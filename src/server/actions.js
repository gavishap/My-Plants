import HttpError from '@wasp/core/HttpError.js'

export const createPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const plant = await context.entities.Plant.create({
    data: {
      name: args.name,
      wateringFrequency: args.wateringFrequency,
      lastWateredAt: new Date(),
      userId: context.user.id
    }
  });

  return plant;
}

export const waterPlant = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const plant = await context.entities.Plant.findUnique({
    where: { id: args.plantId }
  });

  if (plant.userId !== context.user.id) { throw new HttpError(403) }

  const updatedPlant = await context.entities.Plant.update({
    where: { id: args.plantId },
    data: { lastWateredAt: new Date() }
  });

  return updatedPlant;
}