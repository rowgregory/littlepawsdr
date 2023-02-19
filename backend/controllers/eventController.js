import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import Error from '../models/errorModel.js';
import { getEventStatus } from '../utils/getEventStatus.js';

//@desc   Create an event
//@route  POST api/events
//@access Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image,
    startDate,
    endDate,
    background,
    color,
    externalLink,
  } = req.body;

  try {
    const updatedStatus = getEventStatus(startDate, endDate);
    const event = new Event({
      user: req.user._id,
      avatar: req.user.avatar,
      title,
      description,
      startDate,
      endDate,
      image,
      background,
      color,
      externalLink,
      status: updatedStatus,
    });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_AN_EVENT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EVENT_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get event by id
// @route   GET /api/event/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_EVENT_DETAILS_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();

    res.status(500).json({ message: err.message });
  }
});

// @desc    Delete an event
// @route   DELETE /api/event/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    await event.remove();
    res.json({ message: 'Event removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_EVENT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

//@desc   Update an event
//@route  PUT api/events/:id
//@access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      startDate,
      endDate,
      background,
      color,
      externalLink,
    } = req.body;

    const event = await Event.findById(req.params.id);

    const updatedStatus = getEventStatus(startDate, endDate);

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.image = image ?? event.image;
    event.startDate = startDate ?? event.startDate;
    event.endDate = endDate ?? event.endDate;
    event.background = background ?? event.background;
    event.color = color ?? event.color;
    event.status = updatedStatus;
    event.externalLink = externalLink ?? event.externalLink;

    const updatedEvent = await event.save();

    res.json(updatedEvent);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_EVENT_ADMIN',
      detail: err.message,
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export { createEvent, getEvents, getEventById, deleteEvent, updateEvent };
