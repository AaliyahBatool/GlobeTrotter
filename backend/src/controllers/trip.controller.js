import prisma from "../prisma.js";

/**
 * Create a new trip
 */
export const createTrip = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, startDate, endDate, isPublic } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isPublic: isPublic || false,
        userId
      }
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create trip" });
  }
};

/**
 * Get all trips of logged-in user
 */
export const getMyTrips = async (req, res) => {
  try {
    const userId = req.userId;

    const trips = await prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json({ trips });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};

/**
 * Get single trip (owner only)
 */
export const getTripById = async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = Number(req.params.id);

    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId
      },
      include: {
        stops: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ trip });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trip" });
  }
};

/**
 * Update trip
 */
export const updateTrip = async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = Number(req.params.id);

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: req.body
    });

    res.json({
      message: "Trip updated",
      trip: updatedTrip
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update trip" });
  }
};

/**
 * Delete trip
 */
export const deleteTrip = async (req, res) => {
  try {
    const userId = req.userId;
    const tripId = Number(req.params.id);

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    await prisma.trip.delete({
      where: { id: tripId }
    });

    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete trip" });
  }
};

/**
 * Get public trips (Explore / Share)
 */
export const getPublicTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({ trips });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public trips" });
  }
};
