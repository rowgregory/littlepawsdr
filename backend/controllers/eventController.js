import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import Error from '../models/errorModel.js';
import { getEventStatus } from '../utils/getEventStatus.js';
import { cloudImages } from '../data/cloudImages.js';

//@desc   Create an event
//@route  POST api/events
//@access Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    user: req.user._id,
    avatar: req.user.avatar,
    title: 'Sample title',
    description: 'Sample description',
    startDate: '',
    endDate: '',
    status: '',
    image: cloudImages().upload,
    background: 'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
    color: '#36363c',
    publicId: '',
  });

  const createdEvent = await event.save();

  res.status(201).json(createdEvent);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Private/Admin
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    if (!events) return res.status(404).json({ message: 'Events not found' });

    res.json(events);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EVENT_LIST',
      detail: err.message,
    });

    await createdError.save();

    res.status(500).json({ message: err.message });
  }
});

// @desc    Get event by id
// @route   GET /api/event/:id
// @access  Private/Admin
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EVENT_DETAILS',
      detail: err.message,
    });

    await createdError.save();

    res.status(500).json({ message: err.message });
  }
});

// @desc    Delete an event
// @route   DELETE /api/event/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not removed');
  }
});

//@desc   Update an event
//@route  PUT api/events/:id
//@access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image,
    startDate,
    endDate,
    background,
    color,
    avatar,
    publicId,
  } = req.body;

  const event = await Event.findById(req.params.id);

  const updatedStatus = getEventStatus(startDate, endDate);

  if (event) {
    event.title = title || event.title;
    event.description = description || event.description;
    event.image = image || event.image;
    event.startDate = startDate || event.startDate;
    event.endDate = endDate || event.endDate;
    event.user = req.user._id;
    event.background = background || event.background;
    event.color = color || event.color;
    event.status = updatedStatus;
    event.avatar = avatar || event.avatar;
    event.publicId = publicId || event.publicId;

    const updatedEvent = await event.save();

    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error('Event not updated');
  }
});

export { createEvent, getEvents, getEventById, deleteEvent, updateEvent };
