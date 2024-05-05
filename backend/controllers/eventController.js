import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import Error from '../models/errorModel.js';
import { getEventStatus } from '../utils/getEventStatus.js';

/**
 @desc    Get all events
 @route   GET /api/events
 @access  Public
 */
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();

    res.json({ events });
  } catch (err) {
    await Error.create({
      functionName: 'GET_EVENT_LIST_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error fetching events',
      sliceName: 'eventApi',
    });
  }
});

/**
 @desc    Get event by id
 @route   GET /api/event/:id
 @access  Public
*/
const getEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({ event });
  } catch (err) {
    await Error.create({
      functionName: 'GET_EVENT_DETAILS_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({ message: `Error fetching event`, sliceName: 'eventApi' });
  }
});

/**
 @desc   Create an event
 @route  POST api/events
 @access Private/Admin
*/
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
    await Event.create({
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

    res.status(201).json({ message: 'Event created', sliceName: 'eventApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_AN_EVENT_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating event',
      sliceName: 'eventApi',
    });
  }
});

/**
 @desc   Update an event
 @route  PUT api/events/:id
 @access Private/Admin
*/
const updateEvent = asyncHandler(async (req, res) => {
  try {
    await Event.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    res.status(200).json({ message: 'Event updated', sliceName: 'eventApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_EVENT_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating event',
      sliceName: 'eventApi',
    });
  }
});

/**
 @desc    Delete an event
 @route   DELETE /api/event/:id
 @access  Private/Admin
*/
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted', sliceName: 'eventApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_EVENT_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting event',
      sliceName: 'eventApi',
    });
  }
});

export { createEvent, getEvents, getEventById, deleteEvent, updateEvent };
